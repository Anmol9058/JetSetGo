import React from 'react'
import { Text, View, TouchableWithoutFeedback,TouchableOpacity,  } from 'react-native'
import Style from './VisitOrderCartCardStyles'
import {HelperService} from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService';
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import InputNumber from 'App/Components/FormInput/InputNumber'
import InputText from 'App/Components/FormInput/InputText'
import GenericIcon from 'App/Components/GenericIcon'
import DatePicker from 'App/Components/DatePicker'
import DatePickerStyles from 'App/Components/DatePicker/DatePickerStyles'


const VisitOrderCartCard = ({
  orderDate,
  customerName,
  quantity,
  items,
  orderValue,
  orderValueWithoutDis,
  totalTax,
  totalDiscount,
  remark, openRemarkEdit, closeRemarkEdit, changeRemark, editRemark,
  editCartOrder,
  deliveryDate,
  dark=false,
  show,
  selectedRetailer,
  executeVisitData,
  showeditIcon=true,
  showEdit=true
}) => {
console.log("selectedRetailer", totalTax);

  let datePickerNode = (
		<Text style={{...Style.detail1,color: Colors.white, }}>
		
{	 show|| showeditIcon	? []:<GenericIcon
				name="create"
				style={{ ...DatePickerStyles.icon, ...DatePickerStyles.iconActive, ...{ color: Colors.white, fontSize: 20, marginBottom: 0 } }}
			/>
}
      	{`${HelperService.dateReadableFormat(deliveryDate)} `}
		
		</Text>
	);
	return (
    <View style={dark ? Style.darkCard : Style.card}>
      <View>
        <Text style={dark ? Style.darkTitle : Style.title}>{customerName}</Text>
      </View>
      <View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Order date'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.dateReadableFormat(orderDate)}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Items'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{items}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Total Quantity'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{quantity}</Text>
        </View>

        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Total Tax'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(totalTax)}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Total Additional Discount'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{ totalDiscount?HelperService.FixedcurrencyValue(totalDiscount):0}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Order Value (Without discount)'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(orderValueWithoutDis)}</Text>
        </View>
       {
       // <View style={Style.strip}>
         // <Text style={dark ? Style.darkTtl : Style.ttl}>{'GST'}</Text>
          //<Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(totalTax)}</Text>
        //</View>

       }
        <View style={Style.strip}>
          <Text style={dark ? Style.darkTtl : Style.ttl}>{'Net Order Value'}</Text>
          <Text style={dark ? Style.darkDetail : Style.detail}>{HelperService.FixedcurrencyValue(orderValue+totalTax)}</Text>
        </View>
        <View style={Style.strip}>
        <Text style={Style.ttl}>
						
						
				{selectedRetailer==''?executeVisitData=='Retailer'?'Delivery Date':'Delivery Date*':selectedRetailer=='Retailer'?'Delivery Date*':'Delivery Date*'} 
					</Text>
         	<DatePicker
						allowRangeSelection={false}
            
            minDate={HelperService.getNextNDayTimestamp(0)}
						selectedStartDate={deliveryDate}
						selectedEndDate={deliveryDate}
            showEdit={showEdit}
					onDateChange={(params) => editCartOrder({edited_field: 'delivery_date__c',  edited_value: params.selectedStartDate })}
						iconStyle={{ marginBottom: 0 }}>
						{datePickerNode}
					</DatePicker>
          
         


			
				</View>
        <View style={Style.strip}>
		      	<View style={{flexDirection: 'row'}}>
			      		<Text 
			      			style={{...Style.ttl, ...Style.labelStyle}}>{selectedRetailer=='Retailer'?'Remark':'Remark'}
			      		</Text> 
						{ 
						 show	? []:	<TouchableOpacity 
			      			onPress={() => {editRemark ? closeRemarkEdit() : openRemarkEdit()}}>
							  <GenericIcon 
							  //show={true}
			      				name={editRemark ? 'save' : 'edit'} 
			      				style={Style.editIcon}
			      			/>
			      		</TouchableOpacity>
						  }
			      	</View>
			      	{
			      		editRemark ?
				            <View style={Style.editInputFieldContainer}>
				              <View style={Style.editInputFieldChildContainer}>
				              	<InputText
			                 		style={Style.editInputField} 
			                 		value={remark} 
			                 		onChange={(value) => changeRemark({remarks__c: value,})}
				            	/>
				            	</View>
			      			</View>:
		      				<Text style={{...Style.detail, ...Style.valueStyle}}>{remark  ?remark :''}</Text>
		      		}
    		</View>
      </View>
    </View>
)}

export default VisitOrderCartCard
