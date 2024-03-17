import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback,Pressable  } from 'react-native'
import styles from './RetailerTupleStyle'
import moment from "moment";
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles,StyleSheet, } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';

const RetailerTuple = ({ onPress, id, item, areas, competitors,user_detail }) => {
  // console.log("itttttttemm",item);
  return(
    <TouchableWithoutFeedback onPress={onPress}>
  <View style={{...styles.surface , }}>
  
    <View style={styles.row}>
      <Text style={styles.head}>{item?.name}</Text>
    </View>
    
  
   {item.last_order_date__c? <View style={[styles.keyvalue]}>
      <Text style={styles.key}>Last Order Date</Text>
      <Text style={styles.value}>
         {item.last_order_date__c
          ? HelperService.dateReadableFormat(item.last_order_date__c)
          : "NA"} 
      </Text>
    </View>:[]}
   {item.last_order_value__c?<View style={[styles.keyvalue]}>
      <Text style={styles.key}>{user_detail}</Text>
      <Text style={styles.value}> {item.last_order_value__c
          ? HelperService.FixedcurrencyValue(item.last_order_value__c)
          : "NA"}
          </Text>
    </View>:[]}
   {item.last_visit_date__c?<View style={[styles.keyvalue]}>
      <Text style={styles.key}>Last Visit Date</Text>
      <Text style={styles.value}>
        {item.last_visit_date__c? HelperService.dateReadableFormat(item.last_visit_date__c)
          : "NA"}
      </Text>
    </View>:[]} 
 
</View>
</TouchableWithoutFeedback>
);};

export default RetailerTuple


