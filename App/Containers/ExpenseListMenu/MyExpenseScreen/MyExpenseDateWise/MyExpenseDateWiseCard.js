import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BlueButton from 'App/Components/BlueButton';
import NavigationService from 'App/Services/NavigationService';
import GenericIcon from 'App/Components/GenericIcon';
import { HelperService } from 'App/Services/Utils/HelperService';

const MyExpenseDateWiseCard = ({expensedata}) => {
    return(
            
                 <View style={Style.box}>
                     <View style={Style.btmBox}>
                     <TouchableWithoutFeedback  onPress={() => {NavigationService.navigate('DatewiseListScreen')}}>
                         <View>
                        <View style={Style.strip}>
                            <Text style={Style.title}>{expensedata.date__c.substr(0,10)}</Text>
                            <GenericIcon
                                    name={'edit'}
                                    onPress={() => NavigationService.navigate('EditIconScreen')}
                                    style={{paddingTop:'1%'}}
                            />
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'Mode of Travel'}</Text>
                            <Text style={Style.detail}>{expensedata.mode_of_travel__c}</Text>
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'Food'}</Text>
                            <Text style={Style.detail}>{expensedata.food__c}</Text>
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'Toll'}</Text>
                            <Text style={Style.detail}>{expensedata.toll__c}</Text>
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'System calculated Km. Amount'}</Text>
                            <Text style={Style.detail}>₹{expensedata.kilometer_travelled__c*expensedata.allowed_rate_per_km__c}</Text>
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'Km. Travelled Amount'}</Text>
                            <Text style={Style.detail}>₹{expensedata.kilometer_travelled__c*expensedata.allowed_rate_per_km__c}</Text>
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'Today System Total Amount'}</Text>
                            <Text style={Style.detail}>₹{expensedata.kilometer_travelled__c*expensedata.allowed_rate_per_km__c}</Text>
                        </View>
                        <View style={Style.strip}>
                            <Text style={Style.ttl}>{'Today Total Amount'}</Text>
                            <Text style={Style.detail}>₹{expensedata.kilometer_travelled__c*expensedata.allowed_rate_per_km__c}</Text>
                        </View>
                        </View>
                        </TouchableWithoutFeedback>
                        <View style={Style.strip}>
                            <BlueButton
                                        style={Style.button}
                                        textStyle={Style.text}
                                        title={'Attach Bill'}
                                        onPress={() => {NavigationService.navigate('MyExpenseUpload')}}
                            />
                            <BlueButton
                                    style={Style.button}
                                    textStyle={Style.text}
                                    title={'View Bills'}
                                    onPress={() => {NavigationService.navigate('ViewBillsScreen')}}
                            />
                        </View>
                        </View>
                 </View>
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
                 width: '25%'
             },
             strip: {
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 marginBottom: '4%'
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
                 width: '50%'
             },
             button: {
                 width: wp('36%'),
                 height: hp('5%'),
                 alignSelf: 'flex-end',
             },
             text: {
                 color: Colors.white,
                 fontFamily: ApplicationStyles.textMsgFont,
                 fontSize: wp('3%'),
                 textTransform: 'uppercase',
                 textAlign: 'center'
             },
         })
         
         
         export default MyExpenseDateWiseCard
         