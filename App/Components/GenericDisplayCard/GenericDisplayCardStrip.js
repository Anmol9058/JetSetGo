import React from 'react';
import { Text, View } from 'react-native';
import Style from './GenericDisplayCardStyles';

const GenericDisplayCardStrip = ({
  label,
  value,
  dark,
  labelStyle,
  valueStyle
}) => (
    <View style={Style.strip}>
      	<Text style={dark ? Style.darkTtl : {...Style.ttl,  ...labelStyle}}>{label}</Text>
      	<Text style={dark ? Style.darkDetail :{... Style.detail, ...valueStyle}}>{value}</Text>
    </View>
);

export default GenericDisplayCardStrip
