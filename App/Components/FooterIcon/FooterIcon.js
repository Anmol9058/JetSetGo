import React from 'react'
import { Container, Header, Content, Footer, FooterTab, Button,  Text } from 'native-base';
import Style from './FooterIconStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const FooterIcon = ({ icon, iconText, active=false, disabled = false, onPress,show=''}) => (
  	<Button 
  		vertical={true}
  		disabled={disabled}
  		active={active}
  		onPress={onPress}
  		style={active ? {...Style.iconButton, ...Style.iconActiveButton} : {...Style.iconButton}}
  	>
	{show ? 	<MaterialIcon 
        name={`${icon}`}
        style={active ? {...Style.icon, ...Style.iconActive} : {...Style.icon}}
      />:	<Icon 
        name={`${icon}`}
        style={active ? {...Style.icon, ...Style.iconActive} : {...Style.icon}}
      />}
		<Text style={active ? {...Style.iconText, ...Style.iconActive} : {...Style.iconText}}>{iconText} </Text>
	</Button>
)

export default FooterIcon
