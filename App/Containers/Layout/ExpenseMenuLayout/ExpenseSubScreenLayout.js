import BlueButton from 'App/Components/BlueButton';
import GenericIcon from 'App/Components/GenericIcon';
import { HelperService } from 'App/Services/Utils/HelperService';
import { ApplicationStyles, Colors } from 'App/Theme';
import moment from 'moment';
import { Header, Icon, Text,Left,Body,Title, Footer } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import NavigationService from '../../../Services/NavigationService';
import ExpenseActions from '../../../Stores/ExpenseItem/Actions';
import BackArrowButton from 'App/Components/BackArrowButton'
import DatePickerStyles from 'App/Components/DatePicker/DatePickerStyles'

export default class ExpenseSubScreenLayout extends React.Component {
    render(){
        return(
            <View>
                <Header style={Styles.header}>
                <Left>
                    <BackArrowButton />
                </Left>
                </Header>
            </View>

        )
    }
}


const Styles = StyleSheet.create({
    header: {
	
        backgroundColor: Colors.white,
        borderBottomWidth: 0,
        justifyContent:'flex-start'
		

	},

   
  });
  