import React from 'react'
import { View } from 'react-native'
import { Item, Input, InputGroup, Icon, Label} from 'native-base'
import Style from './InputStyles'

const InputPassword = ({ placeholder = '', onChange = ()=>{}, styles={}, value='',error=false, label=''}) => (
	<>
		{label ? <Label style={{...Style.label}}>{label}</Label> : []}
	 	<Item style={{...Style.item}}>
	        <Input value={String(value || '')} placeholder={placeholder} style={error ? {...Style.input, ...Style.inputError ,...styles} : {...Style.input, ...styles}} onChangeText={(event) => onChange(event)}  secureTextEntry={true} placeholderTextColor={Style.placeholder.color}/>
	    </Item>
    </>
)

export default InputPassword
