import GenericIcon from 'App/Components/GenericIcon';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import NavigationService from '../../Services/NavigationService';
import Style from './BackArrowButtonStyles';

const BackArrowButton = ({ icon, show, onPress}) => (
	<TouchableOpacity transparent>
		<GenericIcon
	  		name={'arrow-back'}
	  		onPress={show? onPress:NavigationService.goback}
	    	style={Style.button}
		/>
	</TouchableOpacity>
)

export default BackArrowButton
