import React from 'react'
import { Text, View } from 'react-native'
import Style from './ProductCardStyles'




const AvailableStock = ({stock}) => (
    <View style={Style.priceContainer}>
    		<Text style={Style.availableStock}>{`${stock} available in stock`}</Text>    		
  	</View>
)

export default AvailableStock
