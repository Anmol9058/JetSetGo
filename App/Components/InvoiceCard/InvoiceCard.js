
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { HelperService } from '../../Services/Utils/HelperService';
import Style from './InvoiceCardStyles';

const InvoiceCard = ({
  orderDate,
  orderredDate,
  orderValue,
  orderNumber,
  customerName,
  name,
  quantity,
  style = {},
  dark = false,
  onPress
}) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }}>
        {
          customerName ?
            (<View>
              <Text style={dark ? Style.darkTitle : Style.title}>{customerName}</Text>
            </View>) : []
        }
        <View>
          {name ? <GenericDisplayCardStrip label={'Item Name'} value={name} dark={dark} /> : []}
          {orderDate ? <GenericDisplayCardStrip label={'Invoice Date'} value={HelperService.dateReadableFormat(orderDate)} dark={dark} /> : []}

          {orderValue ? <GenericDisplayCardStrip label={'Amount'} value={HelperService.currencyValue(orderValue)} dark={dark} /> : []}
          {orderNumber ? <GenericDisplayCardStrip label={'LR No.'} value={orderNumber} dark={dark} /> : []}
          {quantity ? <GenericDisplayCardStrip label={'Quantity'} value={quantity} dark={dark} /> : []}
          {orderredDate ? <GenericDisplayCardStrip label={'Ordered Date'} value={HelperService.dateReadableFormat(orderredDate)} dark={dark} /> : []}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

export default InvoiceCard