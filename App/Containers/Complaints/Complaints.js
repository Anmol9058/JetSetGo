import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import NavigationService from 'App/Services/NavigationService'

import SelectionButton from 'App/Components/SelectionButton';
import { ApplicationStyles, Colors } from 'App/Theme';
import GenericIcon from 'App/Components/GenericIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class Complaints extends Component {


    render() {


        return (

            <ScrollView style={Styles.paddingTop}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <SelectionButton
                        title="Pending(1)"
                        style={{ backgroundColor: '#dc143c', height: hp('13.4%'), marginVertical: hp('0%'),width:wp('35%') }}
                        textStyle={{ color: Colors.white, alignItems: 'center', }}

                    />

                    <SelectionButton
                        title="Resolved(1)"
                        style={{ backgroundColor: '#008000', height: hp('13.4%'), marginVertical: hp('0%'),width:wp('35%') }}
                        textStyle={{ color: Colors.white, alignItems: 'center', }}

                    />


                </View>
                <View style={{ marginTop: '50%' }}>
                    <TouchableOpacity
                        style={Styles.plusIcon}
                        onPress={() => NavigationService.navigate('NewComplaintsScreen')}
                    >
                        <GenericIcon
                            name={'add-circle-outline'}
                            style={{ color: Colors.white, fontSize: wp('14%'), alignSelf: 'center' }}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>


        );
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Complaints)


const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        top: 0,
    },
    plusIcon: {
        borderRadius: 50,
        bottom: 25,
        position: 'absolute',
        right: 25,
        borderRadius: 50,
        height: 55,
        width: 55,
        backgroundColor: Colors.button,
        flexDirection: 'row',

    },
   

  

    paddingTop: { paddingHorizontal: 15, paddingVertical: 15, top:25 },
});