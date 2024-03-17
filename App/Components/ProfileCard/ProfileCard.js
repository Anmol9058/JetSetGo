import { Icon } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import { Colors } from '../../Theme'
import Style from './ProfileCardStyles'


const ProfileCard = ({data}) => (
	<View style={Style.box}>
	    <View style={Style.tuple}>
	        <View style={Style.userCircle}>
	            <Icon 
	              name={'ios-person'}
	              ios={'ios-person'}
	              android={'md-person'}
	              style={{color: Colors.button}}
	            />
	        </View>
	        <View style={Style.userDtl}>
	            <Text style={Style.title}>{data.team_member_name}</Text>
	        </View>
	    </View>
    </View>
);

export default ProfileCard
