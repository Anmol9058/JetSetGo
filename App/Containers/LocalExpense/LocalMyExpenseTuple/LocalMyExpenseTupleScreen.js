import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './LocalMyExpenseTupleStyle';
import StatusLabelScreen from '../../../Components/StatusLabel/StatusLabelScreen';
import { HelperService } from 'App/Services/Utils/HelperService';

const LocalMyExpenseTupleScreen = ({ onPress, data, remarks }) => {
    console.log(data, "TUPLE DATA");
    return (<TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception_case__c ? Style.customBox : Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Expense Id'}</Text>
                    <Text style={Style.detail}>{data.name}</Text>
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
                    <Text style={Style.detail}>{HelperService.currencyValue(data.total_amount__c || '0')}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Status'}</Text>
                    <StatusLabelScreen status={data.expense_status__c} />
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback >)
}

export default LocalMyExpenseTupleScreen
