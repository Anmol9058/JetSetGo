import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BlueButton from 'App/Components/BlueButton';
import NavigationService from 'App/Services/NavigationService';


const MyExpenseCard = ({expensedata}) => {
    return(
   <TouchableWithoutFeedback onPress={() => NavigationService.navigate('MyExpenseDateWise',{sfid:expensedata.sfid,date:expensedata.createddate})}>
    
        <View style={Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Expense Id'}</Text>
                    <Text style={Style.detail}>{expensedata.name}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Amount'}</Text>
                    <Text style={Style.detail}>{expensedata.total_amount__c}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Status'}</Text>
                    <BlueButton
                            style={Style.button}
                            textStyle={Style.text}
                            title={expensedata.expense_status__c}
                            small
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
    button: {
        width: wp('15%'),
        height: hp('3%'),
        alignSelf: 'flex-end',
        //padding:'1%',
    },
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: wp('2.1%'),
        textTransform: 'uppercase',
        textAlign: 'center'
    },
})


export default MyExpenseCard
