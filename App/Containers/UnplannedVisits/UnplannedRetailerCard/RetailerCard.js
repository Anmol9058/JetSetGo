import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Name from 'App/Components/Name'
import Address from 'App/Components/Address'
import WhiteButton from 'App/Components/WhiteButton'
import GenericIcon from 'App/Components/GenericIcon'
import Style from './RetailerCardStyles'
import { Colors, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'

const RetailerCard = ({data, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.darkCard}>
      <View>
        <Name style={{ color: Colors.primary }} value={data.name} />
        <Address style={{ color: Colors.primary }} value={`${data.billingstreet || ''} ${data.billingcity ? ', ' + data.billingcity  :  ''} ${data.billingpostalcode || ''}`} />
      </View>
      	<View style={ApplicationStyles.actionContainer}>
			<WhiteButton
				selected={false}
				title={'Call'}
				disabled={false}
				onPress={() => HelperService.callNumber(data.mobile_contact__c)}
				style={ApplicationStyles.callActionButton}
				textStyle={ApplicationStyles.callActionButtonText}
			>
				<GenericIcon
					name="call"
					style={ApplicationStyles.callButtonIcon}
				/>
			</WhiteButton>
			<WhiteButton
				selected={false}
				title={'Direction'}
				disabled={false}
				onPress={() => HelperService.showDirectionInGoogleMaps(data.location__latitude__s, data.location__longitude__s, 'Retailer Direction')}
				style={ApplicationStyles.directionActionButton}
				textStyle={ApplicationStyles.directionActionButtonText}
			>
				<GenericIcon
					name="locate"
					style={ApplicationStyles.directionActionButtonIcon}
				/>
			</WhiteButton>
			
		</View>
			<GenericDisplayCardStrip label={'Last Order Date'} key={data.sfid+ 'Last Order Date'} value={HelperService.dateReadableFormat(data.last_order_date__c || '')} dark={false}/>

			<GenericDisplayCardStrip label={'Total Order Value'} key={data.sfid+ 'Total Order Value'} value={HelperService.currencyValue(data.total_order_value__c || '')} dark={false}/>

			<GenericDisplayCardStrip label={'Last Visit Date'} key={data.sfid+ 'Last Visit Date'} value={data.last_visit_date__c?data.last_visit_date__c:''} dark={false}/>
    </View>
  </TouchableWithoutFeedback>
)

export default RetailerCard
