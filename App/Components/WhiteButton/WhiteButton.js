import { Spinner, Text } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../Theme'
import Style from './WhiteButtonStyle'

const WhiteButton = ({ style, textStyle,onPress, title, disabled = false, loading=false, selected=false, children=[], customSelectedStyle={}, customSelectedTextStyle={}}) => {
	let textStyleNode = selected ? { ...Style.text, ...textStyle, ...Style.selectedText, ...customSelectedTextStyle} : { ...Style.text, ...textStyle};
	let buttonStyleNode = selected ? { ...Style.button, ...style, ...Style.selectedButton, ...customSelectedStyle } : { ...Style.button, ...style };
	let textNode = (<Text style={textStyleNode}>{title}</Text>);
	textNode = title ? textNode : [];

	return (
	  <TouchableOpacity disabled={disabled} block rounded style={buttonStyleNode}  onPress={onPress}>
	   {!loading ? children : []}
	   {loading ? (<Spinner color={Colors.primary} />) : textNode}
	  </TouchableOpacity>
	)
}

export default WhiteButton
