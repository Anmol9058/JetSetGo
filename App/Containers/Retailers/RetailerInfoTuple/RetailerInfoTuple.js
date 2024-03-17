import React from 'react'
import {View, Text, ScrollView, StyleSheet,TouchableOpacity} from 'react-native';
import { Icon } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import styles from './RetailerInfoTupleStyle'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import {HelperService} from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService'
import GenericIcon from 'App/Components/GenericIcon'
import moment from 'moment';

const RetailerInfoTuple = ({ onPress, areas, item, id, dealer, beat, businessChannel }) => (
  
  <ScrollView style={{...styles.card, flex:1}}>
      <View style={styles.row}>
     
      <View style={{width:'80%'}}>
      <Text style={styles.grey}>Owner Name</Text>
        <Text style={{fontWeight:'bold'}}>{item.first_name__c||item.last_name__c? `${item.first_name__c} ${item.last_name__c==null?[]:item.last_name__c}` : 'NA'}</Text>
        
      </View>
     
   


     
    
     
      
    </View>
    <View style={styles.row}>
     
     
  


    
   
    
     <View style={{width:'80%', marginLeft:'0%'}}>
     <Text style={styles.grey}>Email</Text>
       <Text style={{fontWeight:'bold'}}>{item.e_mail__c ? item.e_mail__c : 'NA'}</Text>
     </View>
   </View>
    <View style={styles.row}>
     
      <View style={styles.width33}>
        <Text style={styles.grey}>Mobile No.</Text>
        <Text style={{fontWeight:'bold'}}>{item.phone? item.phone : 'NA'}</Text>
      </View>
      <View style={{width:'30%', marginLeft:'0%'}}>

    <Text style={styles.grey}>{ (item.account_type__c=='Retailer'||item.account_type__c=='CRM Customer') ?'CRM Code':'SAP Code'}</Text>
    <Text style={{fontWeight:'bold'}}>{(item.account_type__c=='Retailer'||item.account_type__c=='CRM Customer') ?item.crm_code__c?item.crm_code__c:'NA':item.sap_code__c ? item.sap_code__c : 'NA'}</Text> 
   
  </View>
      <View style={{...styles.width33,marginRight:'2%'}}>
        <Text style={styles.grey}>Alternate Mobile</Text>
        <Text style={{fontWeight:'bold'}}>{item.mobile__c? item.mobile__c : 'NA'}</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View>
        <View style={{flexDirection:'row'}}>
        <Text style={{...styles.grey}}>Billing Address</Text>
        <TouchableOpacity 
                                   onPress={onPress}
                                     >
                                     <GenericIcon 
                                         name={'edit'} 
                                         //show={true}
                                         style={styles.editIcon}
                                     />
                                 </TouchableOpacity>
                                 </View>
        <Text style={{fontWeight:'bold'}}>{item.billingstreet ? item.billingstreet : 'NA'}</Text>
      </View>
     
    </View>
    <View style={styles.row}>
      <View>
       
        <Text style={{...styles.grey}}>Postal Code</Text>
       
        <Text style={{fontWeight:'bold'}}>{item.postal_code__c ? item.postal_code__c : 'NA'}</Text>
      </View>
     
    </View>

    
    <View style={styles.row}>
    { (item.account_type__c=='Retailer') ?    
    <View style={styles.width50}>
      <Text style={styles.grey}>Beat</Text>
        <Text style={{fontWeight:'bold'}}>
          {item.beat__c? HelperService.getNameFromSFID(beat, item.beat__c || 'None') : 'NA'}
        </Text>
       
      </View>  : 
       item.account_type__c=='CRM Customer' ?
      []
      :
      <View style={styles.width50}>
      <Text style={styles.grey}>Potential OffTake (No. of boxes)</Text>
        <Text style={{fontWeight:'bold'}}>
          {item.potential_value__c ? item.potential_value__c : 'NA'}
        </Text>
       
      </View>
      }
      <View style={ item.account_type__c=='CRM Customer' ?{...styles.width50, marginLeft:'0%'}:{...styles.width50, marginLeft:'15%'}}>
        <Text style={styles.grey}>Area</Text>
        <Text style={{fontWeight:'bold'}}>{item.area_name ?  item.area_name : 'NA'}</Text>
      </View>
      </View>
    
    <View style={styles.row}>
  
      <View style={styles.width33}>
        <Text style={styles.grey}>Last Visit Date</Text>
        <Text style={{fontWeight:'bold'}}>
          {item.last_visit_date__c?
             item.last_visit_date__c
            : 'NA'}
        </Text>
      </View>
      <View style={styles.width33}>
        <Text style={styles.grey}>Last Order Date</Text>
        <Text style={{fontWeight:'bold'}}>
          {moment(item.last_order_date__c).isValid()
            ? moment(item.last_order_date__c).format('DD/MM/YYYY')
            : 'NA'}
        </Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.width50}>
        <Text style={styles.grey}>GST IN</Text>
        <Text style={{fontWeight:'bold'}}>{ item.gst_in__c||'NA'}</Text>
      </View>
      
    
     
    </View>
   
   {  (item.account_type__c=='Retailer'||item.account_type__c=='CRM Customer'||item.account_type__c=='Customer') ?    
 <View style={styles.row}>
 <View style={styles.width33}>
   <Text style={styles.grey}>{businessChannel=='Wholesale'?'WholeSaler':'Distributor'}</Text>
   <Text style={{fontWeight:'bold'}}>{ item.parentid? HelperService.getNameFromSFID(dealer,item.parentid):'NA'}</Text>
 </View>
 
 <View style={styles.width33}>
   <Text style={styles.grey}>{businessChannel=='Wholesale'?'Reseller Type':'Retailer Type'}</Text>
   <Text style={{fontWeight:'bold'}}>{item.dealer_type__c?item.dealer_type__c:'NA'}</Text>
 </View>
 </View>
 :[] }

{  (item.account_type__c=='Retailer'||item.account_type__c=='CRM Customer') ?    
 <View style={styles.row}>
 <View style={{width:'70%'}}>
   <Text style={styles.grey}>{businessChannel=='Wholesale'? 'Potential OffTake(MT)':'Potential OffTake(No. of boxes)'} </Text>
   <Text style={{fontWeight:'bold'}}>{ item.potential_value__c? item.potential_value__c :'NA'}</Text>
 </View>
 
 
 </View>
 :[] }

 
  </ScrollView>

)

export default RetailerInfoTuple
