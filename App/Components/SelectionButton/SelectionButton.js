import GenericIcon from 'App/Components/GenericIcon';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors } from '../../Theme';

const SelectionButton = ({ style={}, textStyle={}, onPress, title, icon,disabled = false, loading=false, selected=false, children=[]}) => {
	return (
	 	<TouchableOpacity style={{...Styles.button, ...style}} onPress={onPress}>
{	icon ? 		<View style={Styles.iconContainer}>
         <GenericIcon
            style={Styles.menuIcon}
            name={icon}
            />
	 		</View> :[]}
	 		<View style={Styles.textContainer}>
	 			<Text style={{...Styles.text,...textStyle}}>{title}</Text>
	 		</View>
	 	</TouchableOpacity>
	);
}

export default SelectionButton


const Styles = StyleSheet.create({
  button: {
    width: wp('80%%'),
    marginHorizontal: wp('2%'),
    marginVertical: hp('1.4%'),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: hp('15.0%'),
    borderRadius: wp('1.8%'),
    shadowColor: "#000",
    flexDirection: 'column',
	  shadowOffset: {
		  width: 0
	},
	  shadowOpacity: 0.3,
	  shadowRadius: 4,
	  elevation: 10
  },
  menuIcon: {
    color: Colors.primary,
    fontSize: wp('13%'),
    marginBottom:  hp('1%')
  },
  text: {
  	color: Colors.firozi,
    fontFamily: ApplicationStyles.textMsgFont,
    fontWeight:'bold',
  	fontSize:  wp('3.8%'),
  	textTransform: 'uppercase',
    alignSelf: 'center',
    flexWrap: 'wrap'
  },
  iconContainer: {
    marginBottom: hp('1%')
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('2%')
  }
});
