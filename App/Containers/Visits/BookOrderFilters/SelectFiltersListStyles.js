import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
	listItemText: {
		fontFamily: ApplicationStyles.textFont,
		fontSize: wp('3%'),
		color: Colors.button
	},
	selectedListItemText: {
		fontFamily: ApplicationStyles.textMsgFont,
		fontSize: wp('3.2%'),
		color: Colors.button
	},
	listItemIcon: {
		fontFamily: ApplicationStyles.textFont,
		fontSize: wp('3.1%'),
		color: Colors.button
	},
	selectedListItemIcon: {
		fontFamily: ApplicationStyles.textMsgFont,
		fontSize: 18,
		color: Colors.button
	},
	selectedListItemHeader: {
		fontSize: wp('3.7%'),
		paddingLeft: 10
	},
	listItem: {
		marginLeft: 0, 
		paddingLeft: 15
	},
	listItemHeader: {
		backgroundColor: Colors.white
	},
	listItemDivider: {
		backgroundColor: Colors.clrF1F9FF
	},
	filterActionButton: {
		alignSelf: 'center', 
		height: 40, 
		width: '40%'
	},
})
