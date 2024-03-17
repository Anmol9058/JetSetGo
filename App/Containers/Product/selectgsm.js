//Screen Number 6
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';

const Selectgsm = () => {
    return (
        <View style={{}}>

            <Image source={require('../../Assets/Images/arrow_left.png')}
                style={Styles.img}></Image>

            <View style={Styles.title}>
                <Text style={Styles.title_text}>SELECT GSM</Text>
            </View>
            <TextInput placeholder="Search.." style={Styles.search} />
            <View style={Styles.card_view}>
                <TouchableOpacity style={Styles.card}>
                    <Text style={Styles.card_text}>GSM1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.card}>
                    <Text style={Styles.card_text}>GSM2</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
export default Selectgsm

const Styles = StyleSheet.create({

    img: {
        height: 20, marginLeft: 10, margin: 10, width: 20, tintColor: '#0720C4'
    },
    title_text: {
        textAlign: 'center', fontSize: 20, top: 10
    },
    title: {
        height: hp('6%')
    },
    search: {
        height: 40, elevation: 5, paddingLeft: 20, backgroundColor: 'white', width: wp('80%'), alignSelf: 'center', borderRadius: 10
    },
    card_view: {
        flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30
    },
    card: {
        height: 93, width: 125, backgroundColor: 'white', elevation: 5, borderRadius: 5
    },
    card_text: {
        fontSize: 15, margin: 10, textAlign: 'center', top: 15
    },



})