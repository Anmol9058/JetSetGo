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

const InfluencerCard = ({data, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.darkCard}>
      <View>
        <Name style={{ color: Colors.primary }} value={data.name} />
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
			<GenericDisplayCardStrip label={'Business So Far'} key={data.sfid+ 'Business So Far'} value={HelperService.currencyValue(data.business_so_far__c || '')} />
			<GenericDisplayCardStrip label={'Last Visit Date'} key={data.sfid+ 'Last Visit Date'} value={HelperService.dateReadableFormat(data.last_visit_date__c || '')} />
    </View>
  </TouchableWithoutFeedback>
)

export default InfluencerCard
