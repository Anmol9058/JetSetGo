import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import Style from './TourInfoTupleStyle'
import {HelperService} from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService'
import GenericIcon from 'App/Components/GenericIcon'

const TourInfoTuple = ({data, sfid, showEdit}) => (
  <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UpdateTourScreen')}>
    <View style={Style.box}>
        <View style={Style.userCircle}>
            <GenericIcon 
            	name={'person'}
                style={{color: Colors.button}}
            />
        </View>
        <View style={Style.userDtl}>
            <Text style={Style.title}>{data.member_team_member_name__c}</Text>
            <Text style={Style.desc}>{`Status: ${data.tour_status__c}`}</Text>
        </View>
        { showEdit ? 
	        (<GenericIcon 
	          name={'create'}
	          onPress={() => NavigationService.navigate('UpdateTourScreen')}
	          style={{color: Colors.button, fontSize: 32, alignSelf: 'center', position: 'absolute', right: 10, zIndex: 2, top: 15}}
	        />) : []
    	}
    </View>
  </TouchableWithoutFeedback>
)

export default TourInfoTuple
