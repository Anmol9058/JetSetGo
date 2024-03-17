import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './SingleInfoStyle'

const SingleInfo = ({heading, value, style={}}) => (
  	<View style={{flexDirection: 'column'}}>
	  	<View>
	   		<Text style={Style.heading} >{heading}</Text>
	   	</View>
	   	{value != 'None' ? (<View><Text style={Style.value}>{value}</Text></View>) : []}
  	</View>
);

export default SingleInfo
