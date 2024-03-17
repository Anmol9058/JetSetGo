import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './LocalExpenseTupleStyle';
import CheckBoxContainer from '../../../Components/Checkox/Checkbox';


const LocalExpenseItemTuple = ({ onPress, data, handleChecked }) => {

    return (<TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception__c ? Style.customBox : Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{HelperService.dateReadableFormat(data.date__c)}</Text>
                    <Text style={Style.detail}>{data.visit_retailer_dealer_name}</Text>
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
                <View>
                    <CheckBoxContainer
                        label={'*Move to Outstation Expense'}
                        handleClick={handleChecked}
                    />
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>)
}

export default LocalExpenseItemTuple
