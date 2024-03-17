//Screen Number 6
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, Image, Picker } from 'react-native';
import NavigationService from './../../Services/NavigationService'
import Select from '../../Components/Select/Select'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import { Button } from 'react-native';


const Addtocart = () => {

    return (
        <View style={{ height: hp('100%'), backgroundColor: '#F4F4F4E8' }}>
            <View style={Styles.view1}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity>
                        <Image source={require('../../Assets/Images/arrow_left.png')} style={Styles.img}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.btn}>
                        <Text style={Styles.btn1_text}>BOOK ORDER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.btn2}>
                        <Text style={Styles.btn2_text}>VIEW CART</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}>NEW</Text>
                    <Text style={{ fontWeight: 'bold' }}>PRODUCT</Text>
                    <Text style={{ fontWeight: 'bold' }}>BRAND</Text>
                    <Text style={{ fontWeight: 'bold' }}>GSM</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft:50, }}>
                    <TouchableOpacity style={Styles.btn2}  onPress={() => NavigationService.navigate('Selectproduct')}>
                        <Text style={{ textAlign: 'center', color: '#0720C4', top: 3 }}>Select</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.btn2} onPress={() => NavigationService.navigate('Selectbrand')}>
                        <Text style={{ textAlign: 'center', color: '#0720C4', top: 3 }}>None</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.btn2} onPress={() => NavigationService.navigate('Selectgsm')}>
                        <Text style={{ textAlign: 'center', color: '#0720C4', top: 3 }}>None</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                <View style={{ height: 260, backgroundColor: '#FFFFFF', marginTop: 40, elevation: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={require('./../../Assets/Images/user.png')} style={{ height: 150, width: 100, margin: 20 }} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: '#0720C4', fontSize: 14, fontWeight: 'bold' }}>JK EASY DRAW 068 GSM</Text>
                            <Text>Packaging : BDL</Text>
                            <Text>Size :GD1</Text>
                            <Text>Price :$64203</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View>
                                    <Text>Width</Text>
                                    <View style={{ height: 25, width: 40, borderRadius: 5, borderWidth: 0.5, top: 3, }}>
                                        <Text style={{ color: '#0720C4', fontWeight: 'bold', textAlign: 'center', top: 2 }}>30</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 30 }}>
                                    <Text>Length</Text>
                                    <View style={{ height: 25, width: 40, borderRadius: 5, borderWidth: 0.5, top: 3 }}>
                                        <Text style={{ color: '#0720C4', fontWeight: 'bold', textAlign: 'center', top: 2 }}>30</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ marginTop: 10 }}>Quantity</Text>
                                <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 0.5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: 10, marginLeft: 25 }}>
                                    <Text style={{ textAlign: 'center' }}>-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 0.5, marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 0.5, borderTopRightRadius: 5, borderBottomRightRadius: 5, marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ height: 35, top: 8, width: 290, backgroundColor: '#2FDFD2', alignSelf: 'center', borderRadius: 8 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, top: 5 }}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ height: 260, backgroundColor: '#FFFFFF', marginTop: 30, elevation: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={require('./../../Assets/Images/user.png')} style={{ height: 150, width: 100, margin: 20 }} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ color: '#0720C4', fontSize: 14, fontWeight: 'bold' }}>JK EASY DRAW 068 GSM</Text>
                            <Text>Packaging : BDL</Text>
                            <Text>Size :GD1</Text>
                            <Text>Price :$64203</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <View>
                                    <Text>Width</Text>
                                    <View style={{ height: 25, width: 40, borderRadius: 5, borderWidth: 0.5, top: 3 }}>
                                        <Text style={{ color: '#0720C4', fontWeight: 'bold', textAlign: 'center', top: 2 }}>30</Text>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 30 }}>
                                    <Text>Length</Text>
                                    <View style={{ height: 25, width: 40, borderRadius: 5, borderWidth: 0.5, top: 3 }}>
                                        <Text style={{ color: '#0720C4', fontWeight: 'bold', textAlign: 'center', top: 2 }}>30</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ marginTop: 10 }}>Quantity</Text>
                                <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 0.5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: 10, marginLeft: 25 }}>
                                    <Text style={{ textAlign: 'center' }}>-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 0.5, marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 0.5, borderTopRightRadius: 5, borderBottomRightRadius: 5, marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ height: 35, top: 8, width: 290, backgroundColor: '#2FDFD2', alignSelf: 'center', borderRadius: 8 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, top: 5 }}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default Addtocart

const Styles = StyleSheet.create({

    img: {
        height: 20, marginLeft: 10, margin: 10, width: 20, tintColor: '#0720C4', marginTop: 20
    },
    view1: {
        height: hp('20%'),
        backgroundColor: '#FFFFFF',
        elevation: 5

    },
    btn: { height: 28, width: 100, backgroundColor: '#2FDFD2', borderRadius: 5, marginTop: 20, right: 40 },
    btn2: { height: 28, width: 100, backgroundColor: '#FFFFFF', borderRadius: 5, marginTop: 20, elevation: 5 },
    btn1_text: {
        color: '#FFFFFF', top: 5, fontSize: 13, textAlign: 'center'
    },
    btn2_text: {
        color: '#0720C4', top: 5, fontSize: 13, textAlign: 'center'
    },




})