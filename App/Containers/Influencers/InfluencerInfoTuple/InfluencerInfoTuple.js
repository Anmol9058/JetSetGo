import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './InfluencerInfoTupleStyle';

const InfluencerInfoTuple = ({ onPress, data, id }) => (
    <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UpdateInfluencer', { id: id })}>
        <View style={Style.box} onPress={onPress}>
            <View style={Style.userCircle}>
                <Icon
                    name={'ios-person'}
                    ios={'ios-person'}
                    android={'md-person'}
                    style={{ color: Colors.button }}
                />
            </View>
            <View style={Style.userDtl}>
                <Text style={Style.title}>{(data.title ? data.title + ' ' : '') + (data.firstname || '') + ' ' + (data.lastname || '')}</Text>
                {data.phone ? <Text style={Style.desc}>{`${data.phone}`}</Text> : []}
                {data.email ? <Text style={Style.desc}>{`${data.email}`}</Text> : []}
            </View>
            <GenericIcon
                name={'create'}
                onPress={() => NavigationService.navigate('UpdateInfluencer', { id: id })}
                style={{ color: Colors.button, fontSize: 32, alignSelf: 'center', position: 'absolute', right: 10, zIndex: 2, top: 15 }}
            />
        </View>
    </TouchableWithoutFeedback>
)

export default InfluencerInfoTuple
