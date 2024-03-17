import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import Style from './ConvenienceTupleStyle';

const ConvenienceTuple = ({ data, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception__c ? Style.customBox : Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Date'}</Text>
                    <Text style={Style.detail}>{HelperService.dateReadableFormat(data.date__c)}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Mode'}</Text>
                    <Text style={Style.detail}>{data.mode__c}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Toll Parking charges'}</Text>
                    <Text style={Style.detail}>{HelperService.currencyValue(data.toll_parking_charges__c || '0')}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>{HelperService.currencyValue(data.amount__c || '0')}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback >
)

export default ConvenienceTuple
