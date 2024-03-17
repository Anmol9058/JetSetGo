import React from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../../Theme';
import Style from './HotelTupleStyle';
import { Icon } from 'native-base';
import { HelperService } from '../../../../../Services/Utils/HelperService';

const HotelTuple = ({ onPress, data, remarks, cityList }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception__c ? Style.customBox : Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Arrival Date'}</Text>
                    <Text style={Style.detail}>{HelperService.dateReadableFormat(data.arrival_date__c)}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Departure Date'}</Text>
                    <Text style={Style.detail}>{HelperService.dateReadableFormat(data.departure_date__c)}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'City'}</Text>
                    <Text style={Style.detail}>{HelperService.getNameFromSFID(cityList, data.city__c)}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>{HelperService.currencyValue(data.amount__c)}</Text>
                </View>
                {/* <View style={[Style.strip, { justifyContent: 'flex-end' }]}>
                    <TouchableOpacity onPress={onPress} style={{ padding: 2 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Icon
                                type="FontAwesome"
                                name="trash"
                                style={{ fontSize: 20, color: Colors.button }}
                            />
                            <Text style={{ marginLeft: 8, color: Colors.button, fontSize: 16 }}>Remove</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    </TouchableWithoutFeedback >
)

export default HotelTuple
