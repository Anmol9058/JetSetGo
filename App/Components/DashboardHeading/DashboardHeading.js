import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from 'native-base'
import Style from './DashboardHeadingStyles'

const DashboardHeading = ({heading, value, style={}}) => (
  	<View style={{flexDirection: 'column'}}>
	  	<View>
	   		<Text style={Style.heading} >{heading}</Text>
	   	</View>
  	</View>
);

export default DashboardHeading

