//Screen Number 6
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Select from '../../Components/Select/Select'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import NavigationService from 'App/Services/NavigationService'

const Bookorder = () => {
    return (
        <View style={{ backgroundColor: '#F4F4F4E8' }}>

            <Image source={require('../../Assets/Images/arrow_left.png')}
                style={Styles.img}></Image>

            <View style={Styles.title}>
                <Text style={Styles.title_text}>Order Information</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 95 }}>
                <View style={Styles.view1}>
                    <View style={{ margin: 10, marginTop: 30 }}>
                        <Text style={{ color: '#0720C4' }}>Distribution Channel*</Text>
                        <Select style={Styles.dropdown} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#0720C4' }}>Plant*</Text>
                        <Select style={Styles.dropdown} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#0720C4' }}>Route*</Text>
                        <Select style={Styles.dropdown} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#0720C4' }}>Inco Terms*</Text>
                        <Select style={Styles.dropdown} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#0720C4' }}>Payment Term*</Text>
                        <Select style={Styles.dropdown} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#0720C4' }}>Insurance Type*</Text>
                        <Select style={Styles.dropdown} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <TouchableOpacity style={Styles.btn1}
                         
                        >
                            <Text style={Styles.btn_text1}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btn2}
                         onPress={() => NavigationService.navigate('Addtocart')}
                        
                        >
                            <Text style={Styles.btn_text2}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


        </View>
    );
}
export default Bookorder

const Styles = StyleSheet.create({
    view1: {
        height: hp('82%'),
        backgroundColor: 'white',
        marginTop: 50,
        borderWidth: 1
    },
    dropdown: {
        height: hp('6%'),
        width: ('100%'),
        borderRadius: 1,
        borderColor: '#707070',
        marginTop: 5
    },
    img: {
        height: 20, marginLeft: 10, margin: 10, width: 20, tintColor: '#0720C4'
    },
    title_text: {
        color: '#FFFFFF', textAlign: 'center', fontSize: 20, top: 10
    },
    title: {
        backgroundColor: '#0720C4', height: hp('6%')
    },
    btn1: {
        height: 39,
        width: 89,
        backgroundColor: '#D9D8D8',
        borderRadius: 5,
    },
    btn_text1: {
        fontSize: 20, color: '#000000', textAlign: 'center', top: 5
    },
    btn2: {
        height: 39,
        width: 89,
        backgroundColor: '#0720C4',
        borderRadius: 5,
    },
    btn_text2: {
        fontSize: 20, color: '#FFFFFF', textAlign: 'center', top: 5
    },


})