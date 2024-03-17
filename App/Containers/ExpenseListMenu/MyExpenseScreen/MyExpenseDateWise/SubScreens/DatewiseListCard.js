import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GenericIcon from 'App/Components/GenericIcon';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import KmEdit from './kmEditScreen'
const DatewiseListCard = () => {
    return(
            <TouchableWithoutFeedback >
                 <View style={Style.box}>
                     <View style={Style.btmBox}>
                            <View style={Style.strip}>
                                <Text style={Style.ttl}>{'Mode of Travel'}</Text>
                                <Text style={Style.detail}>{data.mode_of_travel__c}</Text>
                            </View>
                            <View style={Style.strip}>
                                <Text style={Style.ttl}>{'System calculated Km. Travelled'}</Text>
                                <Text style={Style.detail}>None</Text>
                            </View>
                            <View style={Style.strip}>
                                <View style={{flexDirection:'row',}}>
                                    <Text style={Style.ttl}>{'Km. Travelled  '}</Text>
                                    <KmEdit />
                                </View>
                                <Text style={Style.detail}>10</Text>
                            </View>
                            <View style={Style.strip}>
                                <Text style={Style.ttl}>{'System calculated Km. Amount'}</Text>
                                <Text style={Style.detail}>None</Text>
                            </View>
                            <View style={Style.strip}>
                                <Text style={Style.ttl}>{'Km Travelled Amount'}</Text>
                                <Text style={Style.detail}>$123</Text>
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
                 width: '55%'
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
         
         
         export default DatewiseListCard
         