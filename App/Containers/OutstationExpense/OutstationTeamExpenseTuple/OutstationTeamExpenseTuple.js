import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import WhiteButton from '../../../Components/WhiteButton';
import Style from './OutstationTeamExpenseTupleStyle';
import StatusLabelScreen from '../../../Components/StatusLabel';

const OutstationTeamExpenseTuple = ({ onPress, data, handleApprove, handleReject }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={Style.box}>
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
                {/* <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Month'}</Text>
                    <Text style={Style.detail}>{data.month__c}</Text>
                </View> */}
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>{data.total_amount__c}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Status'}</Text>
                    <StatusLabelScreen status={data.expense_status__c} />
                </View>
            </View>
            <View style={Style.actionContainer}>
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
            </View>
        </View>
    </TouchableWithoutFeedback >
)

export default OutstationTeamExpenseTuple
