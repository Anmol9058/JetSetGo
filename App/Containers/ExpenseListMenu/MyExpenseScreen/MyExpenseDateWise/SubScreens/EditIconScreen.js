import Colors from 'App/Theme/Colors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationStyles } from 'App/Theme'
import { Text, View,TouchableWithoutFeedback,StyleSheet, FlatList } from 'react-native';
import BlueButton from 'App/Components/BlueButton';
import InputText from '../../../../../Components/FormInput/InputText'
import NavigationService from 'App/Services/NavigationService';

class EditIconScreen extends Component {
    state = {
        FoodInput:'',
        TollParkingInput:''
    };
    render(){
        return(
            <View>
                <Text style={Style.title}>Update Travel</Text>
                <Text style={Style.textHead}>FOOD</Text>
                <InputText style={Style.inputText}
                    placeholder='Food*'
                    value={this.state.FoodInput}
                    onChange={(text)=>{this.setState({FoodInput:text})}}
                />
                <Text style={Style.textHead}>TOLL PARKING</Text>
                <InputText style={Style.inputText}
                    placeholder='Toll Parking*'
                    value={this.state.TollParkingInput}
                    onChange={(text)=>{this.setState({TollParkingInput:text})}}
                />
                <View style={{ alignItems:'stretch',margin:'18%'}}>
                    <BlueButton
                        style={Style.button}
                        textStyle={Style.text}
                        title={'Save'}
                        onPress={NavigationService.goback}
                    />
                </View>
            </View>

        )
    }
}

let Style=StyleSheet.create({
    title: {
        color: Colors.button,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 25,
        alignSelf:'center',
        paddingBottom:'10%'
    },
    textHead: {
        color: Colors.button,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 16,
        marginLeft:'1%'
    },
    inputText:{
        margin:'1%'
    },
    button: {
        padding:'30%',
    },

})

export default EditIconScreen
