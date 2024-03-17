import React from 'react'
import { Text, View } from 'react-native'
import { HelperService } from '../../Services/Utils/HelperService'
import Style from './ProductCardStyles'




const Price = ({price, discountPrice}) => (
    <View style={Style.priceContainer}>
    	{discountPrice ? <Text style={Style.price}>{HelperService.currencyValue(discountPrice)}</Text> : [] }


    	{price ? <Text style={Style.discountedPrice}>{price}</Text> : [] }


   		{discountPrice && price ? <Text style={Style.discountedPriceOff}>{Math.floor(100 - (discountPrice/price)*100) + '% off'}</Text> : [] }
  	</View>
)

export default Price
