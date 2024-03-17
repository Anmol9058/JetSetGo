import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../../Theme';
import Style from './EventparticipantTupleStyle';
import { HelperService } from '../../../Services/Utils/HelperService';

const EventParticipantTuple = ({ data }) => (
    <TouchableWithoutFeedback>
        <View style={Style.box}>
            <View style={Style.tuple}>
                <View style={Style.userCircle}>
                    <Icon
                        name={'ios-person'}
                        ios={'ios-person'}
                        android={'md-person'}
                        style={{ color: Colors.button }}
                    />
                </View>
                <View style={Style.userDtl}>
                    <Text style={Style.title}>{data.participant_contact_name || ''}</Text>
                    <Text style={Style.desc}>{data.name || ''}</Text>
                    <Text style={Style.desc}>{HelperService.dateReadableFormat(data.createddate)}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default EventParticipantTuple;
