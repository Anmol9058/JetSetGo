import BlueButton from 'App/Components/BlueButton'
import EditQuantity from 'App/Components/EditQuantity'
import InputNumber from 'App/Components/FormInput/InputNumber'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'
import GenericIcon from 'App/Components/GenericIcon'
import WhiteButton from 'App/Components/WhiteButton'
import { Spinner } from 'native-base'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { HelperService } from '../../Services/Utils/HelperService'
import { Colors } from '../../Theme'
import Style from './ProductCartCardStyles'


const ProductCartCard = ({data, onRemoveClick, onChangeQuantity, quantity, name,weigthData,dealerDiscount, openDealerDiscountEdit, closeDealerDiscountEdit, changeDealerDiscount, editDealerDiscount,executeVisitData,selectedRetailer,editLoader,deleteLoader,show, editOrderLineId,submitForm, editOrderForm, showEdit }) => (
  <View style={{backgroundColor: Colors.lightGrey, marginBottom: '3%', paddingBottom: '3%', borderRadius: 10}}>
    <View style={Style.box}>
          <View style={{...Style.titleContainer, width:wp('30%')}}>
            <Text style={Style.title}>{name}</Text>
          </View>
		  {showEdit ?
		  <>
        <View style={Style.quantityContainer}>
	
             <EditQuantity  value={editOrderForm&&editOrderForm.quantity&&editOrderForm.order_line_id==data.pg_id__c?editOrderForm.quantity:quantity} onChange={(value) => onChangeQuantity(value)} key={quantity} />
       	</View>
       	 <View style={Style.removeContainer}>
			{ deleteLoader&&deleteLoader==data.pg_id__c||deleteLoader&&deleteLoader==data.sfid   	?	<Spinner color={Colors.white}/> : 		<WhiteButton 
	            selected={false} 
	            disabled={false}  
	            style={Style.actionButton}
	            onPress={onRemoveClick} 
	            textStyle={Style.actionButtonText}>
	              <GenericIcon 
	                name="trash-can" 
					style={Style.actionButtonIcon}
					show={true}
	              />
          	</WhiteButton>}
       	</View>
		   </>
        :[]}
    </View>
      <View style={{paddingHorizontal: wp('3%')}}>
{	data.total_price_inc_tax ? <GenericDisplayCardStrip label={'Price inc tax(Rs)'} value={HelperService.FixedcurrencyValue(data.total_price_inc_tax)}  /> :[]}
	 <GenericDisplayCardStrip label={'Price(Rs)'} value={HelperService.currencyValue(data.total_price__c)}  /> 
	 <View style={Style.strip}>
		      	<View style={{flexDirection: 'row'}}>
			      		<Text 
			      			style={{...Style.ttl, ...Style.labelStyle}}>{'Discount Per Unit'}
			      		</Text> 
						{ 
						 show	? []:	<TouchableOpacity 
			      			onPress={() => {editDealerDiscount ? closeDealerDiscountEdit() : openDealerDiscountEdit()}}>
							  <GenericIcon 
							  //show={true}
			      				name={editDealerDiscount ? 'save' : 'edit'} 
			      				style={Style.editIcon}
			      			/>
			      		</TouchableOpacity>
						  }
			      	</View>
			      	{
			      		editDealerDiscount ?
				            <View style={Style.editInputFieldContainer}>
				              <View style={Style.editInputFieldChildContainer}>
				              	<InputNumber
			                 		styles={Style.editInputField} 
			                 		value={dealerDiscount} 
			                 		onChange={(value) => changeDealerDiscount({additional_discount: value, sfid: data.product_item__c})}
				            	/>
				            	</View>
			      			</View>:
		      				<Text style={{...Style.detail, ...Style.valueStyle}}>{dealerDiscount ?HelperService.currencyValue(HelperService.numberWithCommas(dealerDiscount)):''}</Text>
		      		}
    		</View>
			{ 
			dealerDiscount? <GenericDisplayCardStrip label={' Total  Discount'} value={HelperService.currencyValue(HelperService.numberWithCommas(Number(dealerDiscount)*Number(quantity)))}  /> :[]
		}
	 { data.packaging||data.parameter_2__c? <GenericDisplayCardStrip label={'Packaging'} value={data.packaging||data.parameter_2__c}  /> :[]}
	 { data.size||data.parameter_1__c? <GenericDisplayCardStrip label={'Size'} value={data.size||data.parameter_1__c}  /> :[]}
	
	 { data.parameter_3__c? <GenericDisplayCardStrip label={'Size1(W)'} value={data.parameter_3__c}  /> :[]}
	 { data.parameter_4__c? <GenericDisplayCardStrip label={'Size2(L)'} value={data.parameter_4__c}  /> :[]}
	 <GenericDisplayCardStrip label={'Number of Reams / Box'} value={data.number_of_reams__c}  />
	 <GenericDisplayCardStrip label={'Number of  Sheets'} value={data.number_of_sheets||data.number_of_sheets__c}  />
	 <GenericDisplayCardStrip label={'Ream Weight(Kg)'} value={data.ream_weight__c}  />
	 { data.shipped_qty__c||data.shipped_qty__c==0? 	 <GenericDisplayCardStrip label={'Shipped Quantity'} value={data.shipped_qty__c||data.shipped_qty__c==0?data.shipped_qty__c:0}  />:[]}
	{ data.shipped_qty__c||data.shipped_qty__c==0? <GenericDisplayCardStrip label={'Remaining Quantity'} value={data.shipped_qty__c||data.shipped_qty__c==0?quantity-data.shipped_qty__c:quantity}  /> :[]}
	

	 { (editOrderLineId&&editOrderLineId==data.pg_id__c||editOrderLineId&&editOrderLineId==data.sfid)? <BlueButton 
			//title={'Save'} 
			style={Style.markLostButton} 
			textStyle={Style.markLostButtonText} 
			loading={editLoader&&editLoader==data.pg_id__c}
			disabled={editLoader&&editLoader==data.pg_id__c}
			onPress={() =>
				submitForm()
			}
			><GenericIcon name="floppy"  show={true} style={Style.markLostButtonIcon} />
			</BlueButton>:[] }

      </View>
    </View>
)

export default ProductCartCard
