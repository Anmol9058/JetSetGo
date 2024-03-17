import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../Theme';

const Separator = () => (
  <View style={Styles.view}></View>
)

export default Separator;

const Styles = StyleSheet.create({
	view: {
		width: '100%', 
		borderBottomWidth: .5,
		borderBottomColor: Colors.user,
		marginVertical: hp('1.5%')
	}
});
