import React from 'react';
import { Text, View } from 'react-native';
import HorizontalFileViewer from '../HorizontalFIleViewer';
import Style from './Style';

const AttachmentDetail = ({ style, label, value, highlight, imageList, loader }) => (
    <View style={{ ...Style.container }}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start', margin: 10, paddingLeft: 15 }}><Text style={{ ...Style.label }}>{label}</Text></View>
        <View style={{ width: '100%', justifyContent: 'flex-start', paddingLeft: 15 }}><HorizontalFileViewer imageList={value} loader={loader} /></View>
    </View >
)

export default AttachmentDetail