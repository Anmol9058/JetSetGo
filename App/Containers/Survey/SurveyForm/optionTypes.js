import ProgressBar from 'App/Components/ProgressBar';
import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SurveyTuple from 'App/Containers/Survey/SurveyTuple'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import SurveyActions from 'App/Stores/Surveys/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import SitesActions from 'App/Stores/Sites/Actions';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import SitesTuple from 'App/Containers/Sites/SitesTuple';
import InfluencersTuple from 'App/Containers/Influencers/InfluencerTuple';
import BlueButton from 'App/Components/BlueButton'
import Questionaire from './questionaire'
import InputText from 'App/Components/FormInput/InputText'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import Checkbox from '../../../Components/Checkox/Checkbox';
import _ from 'lodash';
import Styles from './style';


class OptionTypes extends Component {
	render(){
		const {
			data,
			onAnswer
		} = this.props;
		
		let visible_node= [];
		if (data.input_type__c == "Questionnaire") {
			visible_node = (
				
				<Questionaire
					id={data.Id}
					values={data.input_values__c ? data.input_values__c.split(',') : []}
					multiple={data.is_multiple__c}
					answer={data.answer ? data.answer.split(',') : []}
					onAnswer={(value) => onAnswer({id: data.sfid, answer: value})}
				/>
				
			);
		}else if(data.input_type__c == "Text") {
			visible_node = (<InputText
						value={data.answer}
						onChange={(value) => onAnswer({id: data.sfid, answer: value})}
						label={''}
						placeholder={data.name}
						style={{borderRadius: 10}}

				/>
			)
		}else if(data.input_type__c == "Text_Area") {
			visible_node = (<InputText
						value={data.answer}
						onChange={(value) => onAnswer({id: data.sfid, answer: value})}
						label={''}
						placeholder={data.name}
						// numberOfLines={8}
						style={{borderRadius: 10,}}
				/>
			)
		}else if(data.Input_Type__c == "Picklist") {
			visible_node = (
				<SearchableDropdown
	                dataSource={HelperService.convertArrayToSearchableListFormat(data.Input_Values__c ? data.Input_Values__c.split(',') : [])}
	                placeHolderText={'Select...'}
	                selectedValue={data.answer}
	                onChange={(value) => onAnswer({id: data.sfid, answer: value})}
	                placeholder={'Select...'}
	                invalid={false}
	                key={'Picklist' + data.answer}
	                customPickerStyles={{width: '90%', alignSelf: 'center',padding:10}}
              	/>
			)
		}else if(data.input_type__c == "Check_Box") {
			visible_node = (
				<Questionaire
					id={data.Id}
					style={{height:50}}
					values={data.input_values__c ? data.input_values__c.split(',') : []}
					multiple={data.Is_Multiple__c}
					answer={data.answer ? data.answer.split(',') : []}
					onAnswer={(value) => onAnswer({id: data.sfid, answer: value})}
				/>
			)
		}
		return (
			<View>
			{visible_node}
			</View>
		)
	}
}


const mapStateToProps = (state) => ({
 
  
});

const mapDispatchToProps = (dispatch) => ({
  
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptionTypes)