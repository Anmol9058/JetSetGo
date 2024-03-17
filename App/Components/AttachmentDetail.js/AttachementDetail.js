import { Spinner } from 'native-base';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors } from '../../Theme';
import Style from './AttachmentStyles';

const AttachmentDetail = ({ label, value, onPress, loading }) => (
    <View style={{ ...Style.container }}>
        <View style={{ ...Style.textContainerLabel }}><Text style={{ ...Style.label }}>{label}</Text></View>
        {!loading ? value ? <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ ...Style.textContainerLabel }}>
                <Image
                    style={{ ...Style.imageStyle }}
                    source={{
                        uri: value,
                    }}
                />
            </View>
        </TouchableWithoutFeedback> :
            <View style={{ ...Style.textContainerValue }}><Text style={{ ...Style.value }}>{'None'}</Text></View> :
            <View style={{ ...Style.textContainerValue }}><Spinner color={Colors.button} size="small" /></View>}
    </View>
)

export default AttachmentDetail