import React, {PureComponent} from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback} from 'react-native'
import Style from './style'
import { Icon, Input, Button } from 'native-base'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import GenericDisplayCard from 'App/Components/GenericDisplayCard/GenericDisplayCard'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import _ from 'lodash'


export default class SchemeCard extends PureComponent { 
  render() {
    const {
    	data,
    	onPress
    } = this.props;

    return (

	        		<GenericDisplayCard dark={false}
		              style={{ width: '88%', elevation: 0 }}
		              key={data.sfid}
		              heading={data.name}
		              onPress={onPress}
		              content={[
		                <GenericDisplayCardStrip 
		                	key={'Active From' + data.sfid} 
		                	label={'Active From'} 
		                	value={HelperService.dateReadableFormat(data.start_date__c)} 
		                />,
		                <GenericDisplayCardStrip 
		                	key={'Active Till' + data.sfid} 
		                	label={'Active Till'} 
		                	value={HelperService.dateReadableFormat(data.end_date__c)} 
		                />
		              ]}
		            />
    );
  }
}
