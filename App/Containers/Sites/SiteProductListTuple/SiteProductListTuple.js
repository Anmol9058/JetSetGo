import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../../Theme';
import Style from './SiteProductListTupleStyle';
import { HelperService } from '../../../Services/Utils/HelperService';

const SiteProductListTuple = ({ data, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={Style.box}>
            <View style={Style.tuple}>
                <View style={Style.userCircle}>
                    <Icon
                        name={'ios-work'}
                        ios={'ios-work'}
                        android={'md-business'}
                        style={{ color: Colors.button }}
                    />
                </View>
                <View style={Style.userDtl}>
                    <Text style={Style.title}>{data.name || ''}</Text>
                    <Text style={Style.desc}>{HelperService.dateReadableFormat(data.createddate || '')}</Text>
                    <Text style={Style.desc}>{'Quantity :' + data.quantity__c}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default SiteProductListTuple;
