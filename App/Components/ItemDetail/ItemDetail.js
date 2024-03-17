import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from './ItemDetailStyles';

const ItemDetail = ({ style, label, value, highlight,showEdit,showDelete}) => (
	<View style={{...Style.container}}>
		<View style={{...Style.textContainerLabel}}><Text style={{...Style.label}}>{label}</Text></View>
		<View style={{...Style.textContainerValue}}><Text style={{...Style.value}}>{value}</Text></View>
		{showEdit ? <Icon name={'pencil'} style={{...Style.listItemIcon}} /> : []}
		{showDelete ? <Icon name={'delete'} style={{...Style.listItemIcon}} /> : []}
	</View>
)

export default ItemDetail