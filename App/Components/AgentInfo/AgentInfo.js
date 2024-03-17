import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './AgentInfoStyle'

const AgentInfo = ({heading, value, style={}}) => (
  	<View style={Style.container}>
	  	<View>
	   		<Text style={Style.heading} >{heading}</Text>
	   	</View>
	   	{value != 'None' ? (<View style={Style.textContainer}><Text style={Style.value}>{value}</Text></View>) : []}
  	</View>
);

export default AgentInfo
