import React from 'react'
import { View } from 'react-native'
import { Item, Input, Label } from 'native-base'
import Style from './InputStyles'

const InputNumber = ({ placeholder = '', onChange = () => { }, styles = {},  labelStyles={},value = '', error = false, label = '', editable = true,numberOfLines=2 }) => (
	<View>
		{label ? <Label style={{ ...Style.label, ...labelStyles }}>{label}</Label> : []}
		<Item style={{ ...Style.item }}>
			<Input value={String(value || '')} placeholder={placeholder} style={error ? { ...Style.input, ...Style.inputError, ...styles } : { ...Style.input, ...styles }} onChangeText={(event) => onChange(event)} keyboardType={'phone-pad'} placeholderTextColor={Style.placeholder.color} editable={editable} numberOfLines={numberOfLines}
		
			/>
		</Item>
	</View>
)

export default InputNumber
