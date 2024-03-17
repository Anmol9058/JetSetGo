import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeProvider } from 'react-native-paper';
import BlueButton from 'App/Components/BlueButton';


const TeamExpenseCard = () => {
    //data=this.props;
    return(
   <TouchableWithoutFeedback>
        <View style={Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Expense Id'}</Text>
                    <Text style={Style.detail}>expId-03</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'User'}</Text>
                    <Text style={Style.detail}>UserName</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>$123</Text>
                </View>
                <View style={Style.strip}>
                    <BlueButton
                                style={Style.button}
                                textStyle={Style.text}
                                title={'Approve'}
                                onPress={() => {}}
                    />
                    <BlueButton
                            style={Style.button}
                            textStyle={Style.text}
                            title={'Reject'}
                            onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)
}

let Style=StyleSheet.create({
    box: {
        alignSelf: 'center',
        backgroundColor: Colors.clrF1F9FF,
        width: Dimensions.get('window').width - 30,
        marginVertical: 5,
        padding: 15,
        borderRadius: 10,
        position: 'relative'
    },
    btmBox: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5
    },
    customBox: {
        alignSelf: 'center',
        backgroundColor: Colors.clrF1F9FF,
        borderColor: 'red',
        borderWidth: 1,
        width: Dimensions.get('window').width - 30,
        marginVertical: 5,
        padding: 12,
        borderRadius: 10,
        position: 'relative'
    },
    desc: {
        color: Colors.button,
        fontSize: 12,
        fontFamily: ApplicationStyles.textFont,
    },
    detail: {
        fontFamily: ApplicationStyles.textMsgFont,
        color: Colors.clr66,
        fontSize: 14,
        textTransform: 'capitalize',
        textAlign: 'right',
        width: '75%'
    },
    strip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    title: {
        color: Colors.button,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 16
    },
    ttl: {
        color: Colors.clr66,
        fontFamily: ApplicationStyles.textFont,
        fontSize: 14,
        width: '25%'
    },
    tuple: {
        borderBottomColor: Colors.button,
        flexDirection: 'row'
    },
    button: {
        width: wp('35%'),
        height: hp('5%'),
        alignSelf: 'flex-end',
        padding:'1%',
    },
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: wp('3%'),
        textTransform: 'uppercase',
        textAlign: 'center'
    },
})


export default TeamExpenseCard
