import React from 'react';
import { Text, View } from 'react-native';
import Style from './InfoDisplayStyles';

const InfoDisplay = ({ style, label, value, highlight }) => (
	<View style={{ ...Style.container }}>
		<View style={{ ...Style.textContainerLabel }}><Text style={{ ...Style.label }}>{label}</Text></View>
		<View style={{ ...Style.textContainerValue }}><Text style={{ ...Style.value }}>{value}</Text></View>
	</View>
)

export default InfoDisplay