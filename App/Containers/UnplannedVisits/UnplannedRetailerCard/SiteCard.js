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

const SiteCard = ({data, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.darkCard}>
      <View>
        <Name style={{ color: Colors.primary }} value={data.name} />
        <Address style={{ color: Colors.primary }} value={`${data.address_line_1__c || ''} ${data.address_line_2__c ? ', ' + data.address_line_2__c  :  ''}`} />
      </View>
      	<View style={ApplicationStyles.actionContainer}>
			<WhiteButton
				selected={false}
				title={'Call'}
				disabled={false}
				onPress={() => HelperService.callNumber(data.phone)}
				style={ApplicationStyles.callActionButton}
				textStyle={ApplicationStyles.callActionButtonText}
			>
				<GenericIcon
					name="call"
					style={ApplicationStyles.callButtonIcon}
				/>
			</WhiteButton>
			
			
		</View>
			<GenericDisplayCardStrip label={'Type'} key={data.sfid+ 'Type'} value={data.project_type__c} />
			<GenericDisplayCardStrip label={'Lead Stage'} key={data.sfid+ 'Site Stage'} value={data.site_stages__c} />
    	</View>
  </TouchableWithoutFeedback>
)

export default SiteCard
