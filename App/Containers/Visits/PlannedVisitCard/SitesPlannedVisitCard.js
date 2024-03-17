import React from 'react'
import { Text, View } from 'react-native'
import Style from './PlannedVisitCardStyles'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import Ratings from 'App/Components/Ratings';
import WhiteButton from 'App/Components/WhiteButton'
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import Address from 'App/Components/Address'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'




const SitesPlannedVisitCard = ({ data, categoryRatingMapping, added, onAddClick, areas, onEditClick, onRemoveClick }) => (
	<View style={Style.box}>
		<View style={Style.tuple}>
			<View>
				<Text style={Style.title}>{data.name}</Text>
				<Address style={{ color: Colors.primary }} value={`${data.address_line_1__c || ''} ${data.address_line_2__c ? ', ' + data.address_line_2__c  :  ''}`} />
			</View>
		</View>
		
		<GenericDisplayCardStrip label={'Type'} key={data.sfid+ 'Type'} value={data.project_type__c} />
		<GenericDisplayCardStrip label={'Lead Stage'} key={data.sfid+ 'Site Stage'} value={data.site_stages__c} />
		<View style={Style.actionContainer}>
			<WhiteButton
				selected={false}
				title={'Call'}
				disabled={false}
				onPress={() => HelperService.callNumber(data.phone)}
				style={Style.callActionButton}
				textStyle={Style.callActionButtonText}
			>
				<GenericIcon
					name="call"
					style={Style.callButtonIcon}
				/>
			</WhiteButton>
			
			<BlueButton
				selected={false}
				title={!added ? 'ADD' : ''}
				disabled={false}
				loading={false}
				onPress={() => {added  ? onRemoveClick() : onAddClick()}}
				style={Style.addActionButton}
				textStyle={Style.addActionButtonText}
			>
				{added ? <GenericIcon name="checkmark" style={Style.addActionButtonIcon} /> : []}
			</BlueButton>
		</View>
	</View>
)

export default SitesPlannedVisitCard
