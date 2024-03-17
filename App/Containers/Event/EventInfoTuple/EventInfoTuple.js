import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './EventInfoTupleStyle';

const EventInfoTuple = ({ onPress, areas, data, id }) => (
    <TouchableWithoutFeedback onPress={data.status__c !== 'Completed' ?
        () => NavigationService.navigate('UpdateEvent', { id: id }) :
        () => {
            HelperService.showToast({
                message: 'Sorry! You cannot edit event now',
                duration: 2000,
                buttonText: ''
            })
        }}>
        <View style={Style.box} onPress={onPress}>
            <View style={Style.userCircle}>
                <Icon
                    name={'ios-calendar'}
                    ios={'ios-calendar'}
                    android={'md-calendar'}
                    style={{ color: Colors.button }}
                />
            </View>
            <View style={Style.userDtl}>
                <Text style={Style.title}>{data.name}</Text>
                <Text style={Style.desc}>{HelperService.getAreaName({ areas: areas, id: data.area__c })}</Text>
            </View>
            <GenericIcon
                name={'create'}
                onPress={data.status__c !== 'Completed' ?
                    () => NavigationService.navigate('UpdateEvent', { id: id }) :
                    () => {
                        HelperService.showToast({
                            message: 'Sorry! You cannot edit event now',
                            duration: 2000,
                            buttonText: ''
                        })
                    }}
                style={{ color: Colors.button, fontSize: 32, alignSelf: 'center', position: 'absolute', right: 10, zIndex: 2, top: 15 }}
            />
        </View>
    </TouchableWithoutFeedback>
)

export default EventInfoTuple
