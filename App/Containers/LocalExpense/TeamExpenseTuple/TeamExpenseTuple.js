import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import StatusLabelScreen from '../../../Components/StatusLabel';
import Style from './TeamExpenseTupleStyle';

const TeamExpenseTuple = ({ data, retailerList, dealerList, onPress }) => {
    let retailer = HelperService.getNameFromSFID(retailerList, data.customer__c);
    let dealer = HelperService.getNameFromSFID(dealerList, data.customer__c);
    return (<TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception__c ? Style.customBox : Style.box}>
            {data.expense_status__c && data.expense_status__c !== 'Draft' && <StatusLabelScreen status={data.expense_status__c} />}
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{HelperService.dateReadableFormat(data.createddate)}</Text>
                    <Text style={Style.detail}>{retailer ? retailer : dealer}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{`Mode - ${data.mode__c || 'None'}`}</Text>
                    <Text style={Style.detail}>{`Km. Travelled - ${Math.round(data.kilometers_travelled__c) || 0}km`}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{`Food - ${HelperService.currencyValue(data.food__c || '0')}`}</Text>
                    <Text style={Style.detail}>{`Toll Charges - ${HelperService.currencyValue(data.toll_parking_charges__c || '0')}`}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{`Amount - ${HelperService.currencyValue(data.amount__c || '0')} `}</Text>
                    <Text style={Style.detail}>{`Total Amount - ${HelperService.currencyValue(data.total_amount || '0')}`}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>)
}

export default TeamExpenseTuple
