import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../../Theme';
import Style from './ParticipantTupleStyle';
import CheckBoxContainer from '../../../Components/Checkox/Checkbox';

const ParticipantTuple = ({ onPress, list, data }) => (
    <TouchableWithoutFeedback>
        <View style={Style.box} onPress={onPress}>
            <View style={Style.tuple}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={Style.userCircle}>
                        <Icon
                            name={'ios-person'}
                            ios={'ios-person'}
                            android={'md-person'}
                            style={{ color: Colors.button }}
                        />
                    </View>
                    <View style={Style.userDtl}>
                        <Text style={Style.title}>{data.participant_contact_name}</Text>
                        <Text style={Style.desc}>{data.phone}</Text>
                        <Text style={Style.desc}>{data.email}</Text>
                    </View>
                </View>
                <CheckBoxContainer style={{ alignSelf: 'flex-end' }}
                    status={list[data.id].checked}
                    handleClick={onPress}
                />
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default ParticipantTuple;
