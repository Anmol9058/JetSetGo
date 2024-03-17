import React from 'react';
import Style from './OtherTupleStyle';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../../Theme';
import { Icon } from 'native-base';
import { HelperService } from '../../../../../Services/Utils/HelperService';


const OtherTuple = ({ onPress, data }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={data.exception__c ? Style.customBox : Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Place'}</Text>
                    <Text style={Style.detail}>{data.place__c}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>{HelperService.currencyValue(data.amount__c || '0')}</Text>
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

export default OtherTuple
