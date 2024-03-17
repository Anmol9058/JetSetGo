import GenericIcon from 'App/Components/GenericIcon';
import React from 'react';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../Theme';
import Style from './AddressStyles';

const Address = ({ style, value}) => (
	<View style={{flexDirection: 'row', width:'95%'}}>
		<GenericIcon name={"location-on"} style={{color: Colors.primary, fontSize: wp('5%'), ...style}}/>
		<Text style={{...Style.address, ...style}}>
			{`  ${value}`}
		</Text>
	</View>
)

export default Address