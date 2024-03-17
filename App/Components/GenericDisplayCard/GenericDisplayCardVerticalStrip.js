import React from 'react';
import { Text, View } from 'react-native';
import Style from './GenericDisplayCardStyles';

const GenericDisplayCardVerticalStrip = ({
  label,
  value,
  dark
}) => (
    <View style={Style.stripV}>
      	<Text style={dark ? Style.darkTtl : Style.ttl1}>{label}</Text>
      	<Text style={dark ? Style.darkDetail : Style.detail1}>{value}</Text>
    </View>
);

export default GenericDisplayCardVerticalStrip