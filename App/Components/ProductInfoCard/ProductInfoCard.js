import React from 'react'
import { Text, View } from 'react-native'
import Style from './ProductInfoStyles'




const ProductInfoCard = ({data}) => (
    <View style={Style.box}>
        <View style={Style.tuple}>
          <View style={Style.userDtl}>
            <Text style={Style.title}>{data.product_name__c}</Text>
           <Text style={Style.desc}>{data.description__c}</Text>
          </View>
        </View>
        
        
        <View style={Style.btmBox}>
        	<View style={Style.strip}>
	           	<Text style={Style.detail}>{data.item_code__c}</Text>
	            <Text style={Style.ttl}>
	            	
	            	{'Item Code'}
	            </Text>
          	</View>
          	<View style={Style.strip}>
	            <Text style={Style.detail}>{data.business__c}</Text>
	            <Text style={Style.ttl}>
	            	{'Business'}
	            </Text>
          	</View>
        </View>
         
    </View>
)

export default ProductInfoCard
