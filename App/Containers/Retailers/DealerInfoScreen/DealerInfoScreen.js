import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableHighlight, Alert } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './DealerInfoScreenStyle'
import RetailerInfoTuple from 'App/Containers/Retailers/RetailerInfoTuple'
import LayoutScreen from 'App/Containers/Layout/LayoutScreen'
import NavigationService from 'App/Services/NavigationService'
import WhiteButton from 'App/Components/WhiteButton'
import { Colors, ApplicationStyles } from 'App/Theme'
import {HelperService} from 'App/Services/Utils/HelperService';
import InfoDisplay from 'App/Components/InfoDisplay'
import RetailersActions from 'App/Stores/Retailers/Actions'
import Loading from 'App/Components/Loading'

class DealerInfoScreen extends Component {
  async updateLocation(){
    this.props.updateRetailerLocationLoading();
    let location = await HelperService.requestLocation();
    if (location == 'DENIED'){
       Alert.alert("Location permission is required to proceed.", 
        "Go App Permissions and Turn on Location Permission for JK Paper."
        );
      this.props.updateRetailerLocationLoadingStop();// stops btn loading
      return;
    }else if (!location) {
      this.props.updateRetailerLocationLoadingStop();
      return;
    }

    this.props.updateRetailerLocation({
      lat: location.latitude + '', 
      long: location.longitude + '', 
      token: this.props.token, 
      agentid: this.props.agentid,
      seller_id: this.props.navigation.getParam('id', '') + ''
    });
  }


  render() {
    const {
      selectedRetailer, 
      retailersList
    } = this.props;

    const {
      id,
      type,
      data 
    } = selectedRetailer

    const {
      agentAreas,
      retailerCompetitors
    } = this.props;

    if (!data) {
        return (
          <View style={Style.parentContainer}>
            <Loading />
        </View>
      );
    }

    let dealerInfoNode = [];
    if (type == 'Dealer') {
      dealerInfoNode = (
        <View>
          <InfoDisplay label={'Number of retailers'} value={data.no_of_retailers__c || 'None'} />
          <InfoDisplay label={'Sales Team'} value={data.sales_team__c || 'None'} />
          <InfoDisplay label={'Credit Limit'} value={HelperService.currencyValue(data.total_credit_limit__c)} />
          <InfoDisplay label={'Credit Used'} value={HelperService.currencyValue(data.credit_used__c)} />
          <InfoDisplay label={'Credit Blocked'} value={data.credit_block__c || ''} />
        </View>
      );
    }

    return (
          <View style={Style.parentContainer}>
            <RetailerInfoTuple id={id} data={data} areas={agentAreas} />
            <View style={Style.actionContainer}>
            	<WhiteButton 
                selected={false} 
                title={'Update Location'} 
                disabled={this.props.updateRetailerLocationLoader} 
                loading={!!this.props.updateRetailerLocationLoader} 
                onPress={() => this.updateLocation()} 
                style={{...Style.actionButton, ...Style.locationAction}} 
                textStyle={Style.actionButtonText}
              />

              <WhiteButton 
                selected={false} 
                title={'Call'} 
                disabled={this.props.updateRetailerLocationLoader}  
                onPress={() => HelperService.callNumber(data.mobile_contact__c)} 
                style={{...Style.actionButton, ...Style.callAction}} 
                textStyle={Style.actionButtonText}
              >
                <Icon name="call" style={Style.actionButtonIcon}/>
              </WhiteButton>

            	<WhiteButton 
                selected={false} 
                title={'Direction'} 
                disabled={this.props.updateRetailerLocationLoader}  
                onPress={() => HelperService.showDirectionInGoogleMaps(data.location__latitude__s, data.location__longitude__s, 'Retailer Direction')} 
                style={{...Style.actionButton, ...Style.directionAction}} 
                textStyle={Style.actionButtonText}
              >
                
            		<Icon name="locate" style={Style.actionButtonIcon}/>
            	</WhiteButton>
              
            </View>

            <ScrollView>
              <InfoDisplay label={'GSTIN'} value={data.gstin__c || 'None'} />
              <InfoDisplay label={'Mobile No.'} value={data.mobile_contact__c || 'None'} />
              <InfoDisplay label={'Billing Street'} value={data.billingstreet || 'None'} />
              <InfoDisplay label={'City'} value={data.billingcity || 'None'} />
              <InfoDisplay label={'State'} value={data.billingstate || 'None'} />
              <InfoDisplay label={'Country'} value={data.billingcountry || 'None'} />
              <InfoDisplay label={'Postal Code'} value={data.billingpostalcode || 'None'} />
              <InfoDisplay label={'Competitor'} value={HelperService.findMatchingKeyValueInList(retailerCompetitors, 'id', data.competitor__c, 'name')} />
              <InfoDisplay label={'Number of retailers'} value={data.no_of_retailers__c || 'None'} />
	          <InfoDisplay label={'Sales Team'} value={data.sales_team__c || 'None'} />
	          <InfoDisplay label={'Credit Limit'} value={HelperService.currencyValue(data.total_credit_limit__c)} />
	          <InfoDisplay label={'Credit Used'} value={HelperService.currencyValue(data.credit_used__c)} />
	          <InfoDisplay label={'Credit Blocked'} value={data.credit_block__c || ''} />
              <InfoDisplay label={'Total Order Value'} value={HelperService.currencyValue(data.total_order_value__c)} />
              <InfoDisplay label={'Potential Value'} value={HelperService.currencyValue(data.potential_value__c)} />
              <InfoDisplay label={'Assosiated Date'} value={HelperService.dateReadableFormat(data.associated_date__c || '')} />
              <InfoDisplay label={'Last Visit Date'} value={HelperService.dateReadableFormat(data.last_visit_date__c || '')} />
              <InfoDisplay label={'Last Order Date'} value={HelperService.dateReadableFormat(data.last_order_date__c || '')} />
              <InfoDisplay label={'Owner Name'} value={data.owner_name__c || 'None'} />
              <InfoDisplay label={'Owner Phone No.'} value={data.owner_phone__c || 'None'} />
            </ScrollView>
          </View>
    )
  }
}


const mapStateToProps = (state) => ({
  selectedRetailer: state.retailers.selectedRetailer,
  updateRetailerLocationLoader: state.retailers.updateRetailerLocationLoader,
  retailerCompetitors: state.retailers.retailerCompetitors,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  agentAreas: state.user.agentAreas,
  token: state.user.token,
  agentid: state.user.id
});

const mapDispatchToProps = (dispatch) => ({
  updateRetailerLocation:(params)       => dispatch(RetailersActions.updateRetailerLocation(params)),
  updateRetailerLocationLoading:()      => dispatch(RetailersActions.updateRetailerLocationLoading()),
  updateRetailerLocationLoadingStop:()  => dispatch(RetailersActions.updateRetailerLocationLoadingStop())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerInfoScreen)

