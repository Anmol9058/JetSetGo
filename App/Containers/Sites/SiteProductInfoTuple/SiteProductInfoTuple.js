import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './SiteProductInfoTupleStyle';
import { HelperService } from '../../../Services/Utils/HelperService';

const SiteProductInfoTuple = ({ onPress, areas, data, id }) => (
    <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UpdateSiteProduct', { id: id })}>
        <View style={Style.box} onPress={onPress}>
            <View style={Style.userCircle}>
                <Icon
                    name={'ios-business'}
                    ios={'ios-business'}
                    android={'md-business'}
                    style={{ color: Colors.button }}
                />
            </View>
            <View style={Style.userDtl}>
                <Text style={Style.title}>{data.name || ''}</Text>
                <Text style={Style.desc}>{HelperService.dateReadableFormat(data.createddate || '')}</Text>
                <Text style={Style.desc}>{'Quantity :' + data.quantity__c}</Text>
            </View>
            <GenericIcon
                name={'create'}
                onPress={() => NavigationService.navigate('UpdateSiteProduct', { id: id })}
                style={{ color: Colors.button, fontSize: 32, alignSelf: 'center', position: 'absolute', right: 10, zIndex: 2, top: 15 }}
            />
        </View>
    </TouchableWithoutFeedback>
)

export default SiteProductInfoTuple
