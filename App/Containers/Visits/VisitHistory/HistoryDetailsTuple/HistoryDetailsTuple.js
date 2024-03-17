import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback, Touchable, TouchableOpacity } from 'react-native'
import Style from './HistoryDetailsTupleStyle'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import { ScrollView } from 'react-navigation'


const HistoryDetailsTuple = ({ id,item, data, areas, competitors, showdata  }) => (
    
    <View style={ Style.box} >
    {/* {console.log('item',data)}         */}
    <View style={{...Style.card, flex:1}}>
    <View style={Style.row}>
     
      <View style={{width:'40%' ,marginLeft:'3%',marginTop:'10%'}}>
        <Text style={Style.grey}>Competitor Name</Text>
          <View style={Style.textContainer}>
          <Text style={{fontWeight:'bold'}}> {data.competitor_name__c || '' }</Text>
            {/* <Text style={{fontWeight:'bold'}}>{item.mobile__c? item.mobile__c : (item.phone?item.phone:'')}</Text> */}
          </View>
      </View>
      <View style={{width:'40%', marginLeft:'0%',marginTop:'10%'}}>

    <Text style={Style.grey}>Product Name</Text>
    <View style={Style.textContainer}>
          <Text style={{fontWeight:'bold'}}> {data.competitor_product__c  }</Text>
        </View>
  </View>
    
    </View>



<View style={Style.row}>
 
    <View  style={{width:'40%', marginLeft:'3%'}}>
        <Text style={{...Style.grey}}>Price(MOP Per Box)</Text>
         <View style={Style.textContainer}>
          <Text style={{fontWeight:'bold'}}>{data.price__c  }</Text>
        </View>
    </View>
    <View style={ {width:'40%', marginLeft:'0%'}}>
        <Text style={Style.grey}>Product(MT)</Text>
        <View style={Style.textContainer}>
        <Text style={{fontWeight:'bold'}}>{data.size__c}</Text>
      </View></View>
    </View>



<View style={Style.row}>
    <View  style={{width:'40%', marginLeft:'3%',marginBottom:'5%'}}>
        <Text style={{...Style.grey}}>Payment Term</Text>
         <View style={Style.textContainer}>
          <Text style={{fontWeight:'bold'}}>{data.payment_term__c}</Text>
        </View>
    </View>
    </View>
</View>         
         </View>
        //  </TouchableOpacity>
        //  </HistoryRemark>
)

export default HistoryDetailsTuple