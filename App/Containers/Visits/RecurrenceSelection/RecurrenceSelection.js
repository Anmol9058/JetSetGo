import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Style from './RecurrenceSelectionStyles'
import { Icon, Input, Button, ListItem, Radio, Left, Right } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import Ratings from 'App/Components/Ratings';
import WhiteButton from 'App/Components/WhiteButton'
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import DatePicker from 'App/Components/DatePicker'
import DatePickerStyles from 'App/Components/DatePicker/DatePickerStyles'



const RecurrenceSelection = ({plannedVisitData, editSelectedVisits, id, recurringMapping}) => {
	let datePickerNode = (
  		<Text style={Style.detail}>
       		{ `${HelperService.dateReadableFormat(plannedVisitData.till_date)}  `}
       		<GenericIcon 
        		name="create"
        		style={{...DatePickerStyles.icon, ...DatePickerStyles.iconActive, ...{color: Colors.button, fontSize: 20, marginBottom: 0}}} 
        	/>
        	<Text style={{color: Colors.button, fontSize: 13}}>{plannedVisitData.till_date ? 'Edit' : 'Add'}</Text>
       	</Text>
	);
	let recurringMappingNode = recurringMapping.map((obj) => {
		return (
			<ListItem 
				selected={plannedVisitData.recurring_on == obj.id} 
				selectedColor={Colors.button}
				key={obj.id} 
				onPress={() => {
	                	editSelectedVisits({id: id, edited_field: 'recurring_on', edited_value: obj.id})
	                	if (!plannedVisitData.till_date) {
	                		editSelectedVisits({id: id, edited_field: 'till_date', edited_value: HelperService.getNextNDayTimestamp(30, plannedVisitData.visit_date__c)})
	                	}

	                }}
				>
	            <Left>
	              {plannedVisitData.recurring_on == obj.id ? <Text style={{...{color: Colors.button, fontFamily: ApplicationStyles.textMsgFont, fontSize: 16}}}>{obj.name}</Text>: <Text style={{...{color: Colors.button, fontFamily: ApplicationStyles.textFont}}}>{obj.name}</Text>}
	            </Left>
	            <Right>
	              <Radio
	                selectedColor={Colors.button}
	                color= {Colors.button}
	                selected={plannedVisitData.recurring_on == obj.id}
	                style={{borderColor: Colors.button}}
	                onPress={() => {
	                	editSelectedVisits({id: id, edited_field: 'recurring_on', edited_value: obj.id})
	                	if (!plannedVisitData.till_date) {
	                		editSelectedVisits({id: id, edited_field: 'till_date', edited_value: HelperService.getNextNDayTimestamp(30, plannedVisitData.visit_date__c)})
	                	}

	                }}
	              />
	            </Right>
	        </ListItem>
	)});

	return (
	    <View style={{flex: 1}}>
	    	<View style={{flex: .9, marginBottom: 15, borderWidth: 1, borderColor: Colors.button, borderRadius: 10}}>
	    		<ScrollView>
		       		{recurringMappingNode}
		       	</ScrollView>
	    	</View>
	    	<View style={{flex: .1}}>
	    		<View style={Style.strip}>
	    			<Text style={Style.ttl}>
		            	<GenericIcon 
					      name={`calendar`}
					      style={{...Style.ttlIcon}}
			    		/>
	            	{'  Recurring Till date'}
	            	 </Text>
		           	<DatePicker
						allowRangeSelection={false}
						minDate={HelperService.getNextNDayTimestamp(1, plannedVisitData.visit_date__c)}
						selectedStartDate={plannedVisitData.till_date} 
						selectedEndDate={plannedVisitData.till_date}
						onDateChange={(params) => editSelectedVisits({id: id, edited_field: 'till_date', edited_value: params.selectedStartDate})}
						iconStyle={{marginBottom: 0}}>
						{datePickerNode}
					</DatePicker>
					
	           
	          </View>
	    	</View>
	    </View>
	)}

export default RecurrenceSelection
