import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './LegendStyles'

const Legend = ({heading, value, style={}, fillColor}) => (
  	<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
  		<View style={{backgroundColor: fillColor, width: 15, height: 15, borderRadius: 2}}>
	   	</View>
	  	<View>
	   		<Text style={Style.heading} >  {heading}</Text>
	   	</View>
  	</View>
);

export default Legend

