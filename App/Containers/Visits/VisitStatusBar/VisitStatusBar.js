import React from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Style from './VisitStatusBarStyles'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';



const VisitStatusBar = ({ status }) => {
	let customStyles = {};
	switch (status) {
		case 'Cancelled':
			customStyles = Style.cancelled
			break;
		case 'Completed':
			customStyles = Style.completed
			break;
		case 'Started':
			customStyles = Style.started
			break;
		default:
			customStyles = {};
	}
	return (
		<View style={{ ...Style.statusBar, ...customStyles }}>
			<Text style={Style.statusText}>{status}</Text>
		</View>
	);
}

export default VisitStatusBar
