import React from 'react'
import { View,Dimensions } from 'react-native'
import { Item, Input, Label } from 'native-base'
import Style from './InputStyles'
import {TextInputWithIndicator,indicateMode} from 'react-native-indicatortextinput';


const IndicatorInputText =({placeholder='',onChange = () => { },style = {},error = false,autoFocus=false, numberOfLines=4,value='',maxLength=260,multiline = false,label = '',editable = true})=>(
<>
{label ? <Label style={{ ...Style.label }}>{label}</Label> : []}
<View style={error?{ ...Style.indicatorView, ...Style.inputError, ...style }:{...Style.indicatorView,...style}}>
     <TextInputWithIndicator  
    maxLength={Number(maxLength)} 
    areaWidth={'100%'}
    //areaHeight={100}
    placeholder={placeholder}
    value={value} 
    numberOfLines ={numberOfLines}
    indicateMode={indicateMode.alreadyInputMode} multiline={multiline}
    onChangeText={(event) => onChange(event)} 
    autoFocus={autoFocus}  
    editable={editable}             
    />
    </View>
 {/* <View style={{width:width,height:1,backgroundColor:'black'}}/> */}





</>
)
export default IndicatorInputText