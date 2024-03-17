import BrandComponent from 'App/Components/BrandComponent'
import InputNumber from 'App/Components/FormInput/InputNumber'
import WhiteButton from 'App/Components/WhiteButton'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { HelperService } from '../../Services/Utils/HelperService'
import { Colors } from '../../Theme'
import Style from './ProductCardStyles'





const ProductCard = ({data, onPressInfo, quantityInCart, onChangeQuantity, onImageClick, productName,onRemoveClick,productSizeForm,changeSizeForm,	outerDaimeter,innerDaimeter,quantityValue, Quantity,setQuantity }) =>{
  // console.log("quantity",Quantity);
  return (
    
    <View style={Style.box}>
      <View style={{flexDirection: 'row'}}>
    
     <TouchableOpacity onPress={onImageClick}>
  {    data&&data.product_url__c ?  
  <Image
          style={Style.Img}
          source={{
            uri:
               data.product_url__c[0]
          }}
        />
        :
        <Image
                style={{ width: 115, height: 120, resizeMode: 'contain', borderRadius: 3 }}
                source={require('App/Assets/Images/no_image_available.png')}
              />}
      </TouchableOpacity> 
      
    
<View style={Style.tuple}>

<View style={Style.userDtl}>
<Text style={Style.title}>{data.gsm_name}</Text>
          
           <Text style={Style.desc}>{'Packaging: ' + (data.packaging? data.packaging : '')}</Text>
           <Text style={Style.desc}>{'Size: ' + (data.size? data.size : '')}</Text>
           <Text style={Style.desc}>{'Price: ' + ( data.exmill_value__c? HelperService.currencyValue(data.exmill_value__c):'')}</Text>
           
         
          
       
           <View style={{width: wp('35%'), marginTop:'2%' ,marginLeft:'5%'}}>
					<InputNumber
						styles={Style.brandInput}
            placeholder={'Enter Quantity'}
            labelStyles={{...Style.desc,marginLeft:'0%'}}
            value={data.sfid==Quantity.id&&data.size==Quantity.size&&data.packaging==Quantity.packaging?Quantity.quantity:''}
           editable={!quantityInCart}
						onChange={(value) => setQuantity({ 	quantity: value, size:data.size,packaging:data.packaging,

              id: data.sfid })}
					//	label={'Size1(W)'}
					/>
				</View>
   
           {
           // <EditQuantity  value={quantityInCart}  key={quantityInCart} onChange={(value) => onChangeQuantity(value)}edit={true} />
           }

          </View>

          
       
       {
         /* <Price price={data.basic_price__c} discountPrice={data.discounted_price__c} />
          {data.available_stock__c != null ? <AvailableStock stock={data.available_stock__c}/> : []} */

       }
        </View>
        </View>
        <View style={ data.packaging =='REL'?{flexDirection:'row', marginLeft:wp('1%'), marginTop:hp('2%')}:{flexDirection:'row', marginLeft:wp('29%'), marginTop:hp('2%'), justifyContent:'space-around'}}>
       
        {   data.packaging =='REL'?
        <>
        <BrandComponent 
					list={outerDaimeter}
        width={'38%'} 
        placeholerText={'Outer Diameter (cm)'}
         // label={'-'} 
					value={data.sfid==productSizeForm.id?productSizeForm.outer_diameter_cm__c:''} 
					changeForm={(value) =>  changeSizeForm({ edited_field: 'outer_diameter_cm__c', edited_field1:'id', edited_value: {value,length: data.length,width: data.width, id:data.sfid} })}
					//disabled={show&&!(searchFilters['CompEdit']==form.pg_id__c)||disable}
				/>

<BrandComponent 
					list={innerDaimeter} 
        width={'38%'} 
        placeholerText={'Core Diameter (cm)'}
        //  label={'-'} 
					value={data.sfid==productSizeForm.id?productSizeForm.core_diameter_cm__c:''} 
					changeForm={(value) =>  changeSizeForm({ edited_field: 'core_diameter_cm__c', edited_field1:'id', edited_value: {value,length: data.length,width: data.width, id:data.sfid} })}
				//	disabled={show&&!(searchFilters['CompEdit']==form.pg_id__c)||disable}
				/>
        </>
        :[]}
<View style={data.packaging =='REL'?{width: wp('20%'), marginTop:'-7%'}:{width: wp('20%'), marginTop:'-5%'}}>
					<InputNumber
						styles={Style.brandInput}
            placeholder={data.width}
            labelStyles={{...Style.desc,marginLeft:'0%'}}
            value={data.sfid==productSizeForm.id?productSizeForm.width:''}
           editable={data.width.slice(0, 2)=='>='||data.width.slice(0, 2)=='<='}
						onChange={(value) => changeSizeForm({ edited_field: 'width', edited_field1:'id', edited_value: {value,length: data.length,width: data.width, id:data.sfid} })}
						label={'Size1(W)'}
					/>
				</View>
     {   data.packaging !='REL'?
        <View style={{width: wp('20%'), marginLeft:wp('4%'),alignSelf:'center',justifyContent:"center",marginTop:'-4%'}}>
					<InputNumber
						styles={Style.brandInput}
            placeholder={data.length}
            labelStyles={{...Style.desc, marginLeft:'0%'}}
            editable={data.length.slice(0, 2)=='>='||data.length.slice(0, 2)=='<='}
						value={data.sfid==productSizeForm.id?productSizeForm.length:''}
						onChange={(value) => changeSizeForm({ edited_field: 'length',  edited_field1:'id',edited_value: {value,length: data.length, width: data.width,id:data.sfid  } })}
						label={'Size2(L)'}
					/>
				</View>:[]}
           </View> 
        
        
        <View style={{...Style.actionButtonContainer, marginTop:hp('1%')}}>
       {
            <WhiteButton 
            selected={false} 
            title={quantityInCart?'ADDED TO CART':'ADD TO CART'} 
            //disabled={quantityInCart}  
            style={quantityInCart? {...Style.actionButton,backgroundColor:Colors.error}:Style.actionButton} 
           onPress={quantityInCart?onRemoveClick:()=>onChangeQuantity()}
            textStyle={Style.actionButtonText}>
            
          </WhiteButton> 
    } 
          
          
        </View>
         
    </View>
)}

export default ProductCard
