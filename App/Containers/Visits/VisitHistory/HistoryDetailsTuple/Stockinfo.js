import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback, Touchable, TouchableOpacity ,StyleSheet} from 'react-native'
import Style from './HistoryDetailsTupleStyle'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import { ScrollView } from 'react-navigation'


const Stockinfo = ({ id,item, data, areas, competitors, showdata  }) => (
    
  <View style={{flexDirection: 'row'}}>
  <Text style={{margin:'2%',marginLeft:'15%',}}>{data.name}</Text>
  <Text style={{margin:'2%',marginLeft:'15%'}}>{data.quantity__c}</Text>
  </View>
        //  </TouchableOpacity>
        //  </HistoryRemark>
)

export default Stockinfo

const Styles = StyleSheet.create({  
  backArrow: {
      color: Colors.button,
      paddingLeft: 5,
      fontSize:30,
      marginTop:'3%'
    },
    textContainer:{
      width: '85%',
      backgroundColor: Colors.lightGrey,
      borderColor: Colors.primary,
      padding: 15,
      marginLeft:'10%',
      elevation:10,
      // alignItems: 'center',
      // justifyContent: 'center',
      borderRadius: 5,
      marginTop: 7,
    }
  }); 