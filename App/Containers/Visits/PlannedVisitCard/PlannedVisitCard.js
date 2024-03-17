import React from 'react'
import { Text, View ,TouchableWithoutFeedback} from 'react-native'
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
import SitesPlannedVisitCard from './SitesPlannedVisitCard'
import InfluencerPlannedVisitCard from './InfluencerPlannedVisitCard'


const PlannedVisitCard = ({ data, categoryRatingMapping, added, onAddClick, areas, onEditClick, onRemoveClick, type , show,onPress}) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
		<View style={Style.box}>
			<View style={Style.tuple}>
				<View>
					<Text style={Style.title}>{data.name}</Text>
					<Address style={{ color: Colors.grey, fontWeight:'800',  }} value={`${data.billingstreet || ''} ${data.billingcity ? ', ' + data.billingcity  :  ''} ${data.billingpostalcode || ''}`} />
				</View>
			</View>
			
			 {data.last_order_date__c?<GenericDisplayCardStrip label={'Last Order Date'} key={data.sfid+ 'Last Order Date'} value={HelperService.dateReadableFormat(data.last_order_date__c || '')} />:[]}
			{data.last_order_value__c?<GenericDisplayCardStrip label={'Last Order Value'} key={data.sfid+ 'Last Order Value'} value={HelperService.FixedcurrencyValue(data.last_order_value__c)} />:[]}
			{data.last_visit_date__c?<GenericDisplayCardStrip label={'Last Visit Date'} key={data.sfid+ 'Last Visit Date'} value={HelperService.dateReadableFormat(data.last_visit_date__c)} />:[] }
			<View style={Style.actionContainer}>
			
	{	show? 	[]	:<BlueButton
					selected={false}
					title={!added ? 'ADD' : ''}
					disabled={false}
					loading={false}
					onPress={() => {added  ? onRemoveClick() : onAddClick()}}
					style={Style.addActionButton}
					textStyle={Style.addActionButtonText}
				>
					{added ? <GenericIcon name="check" style={Style.addActionButtonIcon} /> : []}
				</BlueButton>}
			</View>
		</View>
		</TouchableWithoutFeedback>
	)
}

export default PlannedVisitCard
