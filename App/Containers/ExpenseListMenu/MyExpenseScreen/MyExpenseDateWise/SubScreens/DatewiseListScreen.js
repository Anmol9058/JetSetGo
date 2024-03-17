import Colors from 'App/Theme/Colors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationStyles } from 'App/Theme'
import NoDataFound from 'App/Components/NoDataFound';
import { Text, View,TouchableWithoutFeedback,StyleSheet, FlatList } from 'react-native';
import DatewiseListCard from './DatewiseListCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class DatewiseListScreen extends Component {

    render(){
     
        return(
            <View style={Style.container}>
                           
            </View>
        )
    }
}
Style=StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        width: '100%',
        marginTop: 5
    }
})
export default DatewiseListScreen
