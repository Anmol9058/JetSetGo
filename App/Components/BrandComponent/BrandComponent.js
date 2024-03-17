import SearchableDropdown from 'App/Components/SearchableDropdown';
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Style from './Style';

const BrandComponent = ({ value, list, changeForm, label='', textStyle, placeholerText,error=false, disabled=false,width, styles={},labelStyle={}}) => (
	<View style={{width: (width || wp('40%')), flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: wp('4%'),marginTop:5, }}>
		<SearchableDropdown
	        dataSource={list}
			placeHolderTextStyle={{ ...Style.textStyle, ...textStyle}}
	        placeHolderText={ placeholerText||'Select'}
	        selectedValue={value}
	        onChange={(value) => changeForm(value)}
	        placeholder={'Type or Select '}
	        invalid={error}
	        labelStyles={{ ...Style.pickerLabel, ...labelStyle }}
	        customPickerStyles={{ ...Style.picker, ...styles }}
			label={label}
			disabled={disabled}
			key={value + _.uniqueId()}
	    />
	</View>
)

export default BrandComponent