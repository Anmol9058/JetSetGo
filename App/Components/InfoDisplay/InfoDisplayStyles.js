import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

export default StyleSheet.create({
	loader: {
		color: Colors.primary
	},
	label: {
		fontFamily: ApplicationStyles.textMediumFont,
		color: Colors.clr66,
		fontSize: wp('4%'),
		textAlign: 'left'
	},
	value: {
		fontFamily: ApplicationStyles.textFont,
		color: Colors.grey,
		fontSize: wp('4%'),
		textAlign: 'left',
	},
	container: {
		flexDirection: 'row',
		borderBottomWidth: .5,
		padding: 8,
		alignItems: 'center',
		borderColor: Colors.button,
		paddingLeft: 20,
		overflow: 'hidden',
		width: wp('100%')
	},
	textContainerLabel: {
		width: wp('30%'),
		paddingLeft: wp('1%'),
	},
	textContainerValue: {
		padding: 5,
		paddingLeft: wp('20%'),
		overflow: 'hidden',
		width: wp('50%')
	}
})
