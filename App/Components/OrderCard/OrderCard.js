import BlueButton from 'App/Components/BlueButton';
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import { ORDER_DATE, ORDER_VALUE } from 'App/Constants';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ApplicationStyles, Colors, Metrics } from '../../Theme';

const OrderCard = ({
  orderDate,
  orderValue,
  orderNumber,
  customerName,
  totalTax,
  psm,
  asm,
  retailerOrder,
  dealerOrder,
  dark = false,
  onPress,
  data,
  onClickRepeatOrder,
  repeatOrderLoading,
  showReorder,
  show,
}) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={dark ? Style.darkCard : Style.card}>
        {
          customerName ?
            (<View>
             
              <Text style={dark ? Style.darkTitle : Style.title}>{customerName}</Text>
            </View>) : []
        }
        <View>
          {asm ? <GenericDisplayCardStrip label={'Team Member Name'} value={psm || asm} dark={dark} /> : []}
          {orderDate ? <GenericDisplayCardStrip label={ORDER_DATE} value={ orderDate} dark={dark} /> : []}

          <GenericDisplayCardStrip label={ORDER_VALUE} value={orderValue} dark={dark} />
      <GenericDisplayCardStrip label={'Accepted'} value={data.order_accepted__c==false?'No':'Yes'} dark={dark} /> 
          {data.order_confirmation_status__c ? <GenericDisplayCardStrip label={'Status'} value={data.order_confirmation_status__c} dark={dark} /> : []}
        <GenericDisplayCardStrip label={'Shipped Quantity'} value={data.shipped_quantity__c?data.shipped_quantity__c:0} dark={dark} />
          <GenericDisplayCardStrip label={'Remaining Quantity'} value={data.shipped_quantity__c?data.total_quantity__c-data.shipped_quantity__c:data.total_quantity__c} dark={dark} /> 
          <GenericDisplayCardStrip label={'Created From'} value={data.created_from__c} dark={dark} /> 
         {
         // <GenericDisplayCardStrip label={'GST'} value={HelperService.FixedcurrencyValue(totalTax)} dark={dark} />
         }
        </View>
{
   
     // <GenericIcon
                   // name={'trash-can'}
                   // show={true}
		           //style={Style.trashButtonIcon}
		        // onPress={() => (searchFilters['CompEdit']==form.pg_id__c)?editForm({edited_field: 'CompEdit', edited_value: ''}):editForm({edited_field: 'CompEdit', edited_value: form.pg_id__c} ,)}
		       // />  
}
            
        {showReorder ? <BlueButton title={'Reorder'}  style={{alignSelf: 'center', width: '50%', marginTop: '5%'}} onPress={() => onClickRepeatOrder()} loading={repeatOrderLoading} /> : []}
      </View>
    </TouchableWithoutFeedback>
  )

export default OrderCard



const Style = StyleSheet.create({
  card: {
    ...Metrics.normalPadding,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    margin: 7,
    width: Dimensions.get('window').width - 30,
    elevation: 3,
    alignSelf: 'center'
  },
  darkCard: {
    ...Metrics.normalPadding,
    width: wp('92%'),
    backgroundColor: Colors.label,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
    alignSelf: 'center'
  },
  darkDetail: {
    fontSize: wp('3.5%'),
    color: Colors.clrF1F9FF,
    fontFamily: ApplicationStyles.textMsgFont
  },
  darkTitle: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.5%'),
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  trashButtonIcon: {
    color: Colors.error,
    fontSize: wp('6%'),
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 5,
    marginBottom:5,
  },

  darkTtl: {
    color: Colors.clrF1F9FF,
    fontSize: wp('3.5%'),
    fontFamily: ApplicationStyles.textFont
  },
  detail: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textMsgFont
  },
  strip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 18,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  ttl: {
    color: Colors.clr66,
    fontSize: 15,
    fontFamily: ApplicationStyles.textFont
  },
  countBadge: {
    backgroundColor: Colors.button,
    borderRadius: hp('3%'),
    padding: 0,
    height: hp('3%'),
    width: hp('2.8%'),
    position: 'absolute'
  },
  countBadgeText: {
     color: Colors.white,
     fontSize: hp('2%'),
  }
})