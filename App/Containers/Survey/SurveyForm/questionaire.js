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
import WhiteButton from 'App/Components/WhiteButton'
import _ from 'lodash';
import Styles from './style';

class Questionaire extends Component {
	onSelect(val) {
		let {
			id,
			values,
			multiple,
			answer,
			onAnswer
		} = this.props;

		let is_selected = answer.indexOf(val) > -1


		if (is_selected) {
			answer = answer.filter(item => item !== val)
		}else {
			if (multiple) {
				answer.push(val)
			}else {
				answer = [val]
			}
		}

		answer = answer.join(',')
		onAnswer(answer)
	}

	render(){
		const {
			id,
			values,
			multiple,
			answer,
			onAnswer
		} = this.props;
		return (
			<View style={{flex: 1, alignItems: 'center'}}>
				{
					values.map((val) => {
						let is_selected = answer.indexOf(val) > -1
						return (
							<WhiteButton 
								title={val} 
								key={val} 
								style={is_selected ? Styles.questionaireSelected : Styles.questionaire} 
								textStyle={is_selected ? Styles.questionaireSelectedText : Styles.questionaireText}
								onPress={() =>  this.onSelect(val)} 
							/>
						)
					})
				}

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
)(Questionaire)