import React from 'react'
import { View } from 'react-native'
import { Item, Input, Label } from 'native-base'
import Style from './InputStyles'

const InputText = ({ placeholder = '', onChange = () => { }, style = {}, value = '', error = false, label = '', multiline = false, numberOfLines = 4, editable = true }) => (
	<>
		{label ? <Label style={{ ...Style.label }}>{label}</Label> : []}
		<Item style={{ ...Style.item }}>
			<Input value={String(value || '')} placeholder={placeholder} style={error ? { ...Style.input, ...Style.inputError, ...style } : { ...Style.input, ...style }} onChangeText={(event) => onChange(event)} placeholderTextColor={Style.placeholder.color} multiline={multiline} numberOfLines={numberOfLines} editable={editable} />
		</Item>
	</>
)

export default InputText
