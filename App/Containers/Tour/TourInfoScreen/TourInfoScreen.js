import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableHighlight, Alert } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './Styles'
import TourInfoTuple from './TourInfoTuple'
import NavigationService from 'App/Services/NavigationService'
import WhiteButton from 'App/Components/WhiteButton'
import { Colors, ApplicationStyles } from 'App/Theme'
import { HelperService } from 'App/Services/Utils/HelperService';
import InfoDisplay from 'App/Components/InfoDisplay'
import Loading from 'App/Components/Loading'

class TourInfoScreen extends Component {
  render() {
  	 const {
     local
    } = this.props.navigation.state.params;

    const {
      selectedMyTour,
	  selectTeamTour,
	  cityList,
    } = this.props;

    let data = local ? selectedMyTour : selectTeamTour
    if (!data) {
      return (
        <View style={Style.parentContainer}>
          <Loading />
        </View>
      );
    }

	//approvar_name: "CS0811111(ASM)"
	// approvar_team_member_name__c: "Harshita Sharma"
	// city_1__c: "a0L1m000000DZupEAG"
	// city_2__c: null
	// city_3__c: null
	// city_4__c: null
	// city_5__c: null
	// city_6__c: null
	// city_7__c: null
	// city_8__c: null
	// city_9__c: null
	// city_10__c: null
	// city_11__c: null
	// city_12__c: null
	// city_13__c: null
	// city_14__c: null
	// city_15__c: null
	// createddate: 1591861998000
	// member_team_member_name__c: "Harshita Sharma"
	// name: "a0o1m0000008syC"
	// pg_id__c: "4ee54585-5e69-47b1-9198-b0a93f50690a"
	// remark__c: null
	// sfid: "a0o1m0000008syCAAQ"
	// tour_approver__c: "a0H1m000001OgVQEA0"
	// tour_from__c: "2020-06-10T18:30:00.000Z"
	// tour_owner__c: "a0H1m000001Owv4EAC"
	// tour_purpose__c: "Hdns"
	// tour_status__c: "Draft"
	// tour_to__c: "2020-06-10T18:30:00.000Z"

    return (
      <View style={Style.parentContainer}>
        <TourInfoTuple id={data.sfid} data={data} showEdit={data.tour_status__c == 'Draft'} />
        	<ScrollView>
		          <InfoDisplay label={'Member Name'} value={data.member_team_member_name__c} />
		          <InfoDisplay label={'Approver Name'} value={data.approvar_team_member_name__c} />
		          <InfoDisplay label={'From'} value={data.tour_from__c ? data.tour_from__c.split('T')[0] : ''} />
		          <InfoDisplay label={'To'} value={data.tour_to__c ? data.tour_to__c.split('T')[0] : ''} />
		          <InfoDisplay label={'Purpose'} value={data.tour_purpose__c} />
		          {data.city_1__c  ? <InfoDisplay label={'City 1'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_1__c, 'name')} /> : []}
		          {data.city_2__c  ? <InfoDisplay label={'City 2'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_2__c, 'name')} /> : []}
		          {data.city_3__c  ? <InfoDisplay label={'City 3'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_3__c, 'name')} /> : []}
		          {data.city_4__c  ? <InfoDisplay label={'City 4'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_4__c, 'name')} /> : []}
		          {data.city_5__c  ? <InfoDisplay label={'City 5'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_5__c, 'name')} /> : []}
		          {data.city_6__c  ? <InfoDisplay label={'City 6'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_6__c, 'name')} /> : []}
		          {data.city_7__c  ? <InfoDisplay label={'City 7'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_7__c, 'name')} /> : []}
		          {data.city_8__c  ? <InfoDisplay label={'City 8'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_8__c, 'name')} /> : []}
		          {data.city_9__c  ? <InfoDisplay label={'City 9'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_9__c, 'name')} /> : []}
		          {data.city_10__c ? <InfoDisplay label={'City 10'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_10__c, 'name')} /> : []}
		          {data.city_11__c ? <InfoDisplay label={'City 11'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_11__c, 'name')} /> : []}
		          {data.city_12__c ? <InfoDisplay label={'City 12'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_12__c, 'name')} /> : []}
		          {data.city_13__c ? <InfoDisplay label={'City 13'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_13__c, 'name')} /> : []}
		          {data.city_14__c ? <InfoDisplay label={'City 14'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_14__c, 'name')} /> : []}
		          {data.city_15__c ? <InfoDisplay label={'City 15'} value={HelperService.findMatchingKeyValueInList(cityList, 'id', data.city_15__c, 'name')} /> : []}
		          {data.remark__c  ? <InfoDisplay label={'Remarks'} value={data.remark__c} /> : []}
	          
        	</ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  selectedMyTour: state.tours.selectMyTour,
  selectTeamTour: state.tours.selectTeamTour,
  cityList: state.tours.cityList,
  token: state.user.token,
  agentid: state.user.id
});


export default connect(
  mapStateToProps
)(TourInfoScreen)

