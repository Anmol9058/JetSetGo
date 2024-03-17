import { AREA } from 'App/Constants';
import { HelperService } from 'App/Services/Utils/HelperService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './EventTupleStyle';
import StatusLabelScreen from '../../../Components/StatusLabel'

const EventTuple = ({ onPress, data, areas }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={Style.box} onPress={onPress}>
            <View style={Style.tuple}>
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
                    <Text style={Style.desc}>{HelperService.dateReadableFormat(data.event_date__c)}</Text>
                </View>
            </View>

            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Status'}</Text>
                    <StatusLabelScreen status={data.status__c || ''} />
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{AREA}</Text>
                    <Text style={Style.detail}>{HelperService.getAreaName({ areas: areas, id: data.area__c })}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Meeting Type'}</Text>
                    <Text style={Style.detail}>{data.type__c}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default EventTuple
