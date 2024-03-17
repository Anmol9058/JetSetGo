import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import WhiteButton from '../../../Components/WhiteButton';
import Style from './LocalTeamExpenseTupleStyle';
import { HelperService } from 'App/Services/Utils/HelperService';

const LocalTeamExpenseTuple = ({ list, onPress, data, handleApprove, handleReject }) => {
    return (<TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception__c ? Style.customBox : Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Expense Id'}</Text>
                    <Text style={Style.detail}>{data.name}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'User'}</Text>
                    <Text style={Style.detail}>{data.member_name}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Branch'}</Text>
                    <Text style={Style.detail}>{data.member_branch_name || 'None'}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>{HelperService.currencyValue(data.total_amount__c || '0')}</Text>
                </View>
            </View>
            {data.expense_status__c === 'Pending for Approval' && <View style={Style.actionContainer}>
                <WhiteButton
                    onPress={handleApprove}
                    title={'Approve'}
                    style={Style.actionButton}
                />
                <WhiteButton
                    onPress={handleReject}
                    title={'Reject'}
                    style={Style.actionButton}
                />
            </View>}
        </View>
    </TouchableWithoutFeedback >)
}

export default LocalTeamExpenseTuple
