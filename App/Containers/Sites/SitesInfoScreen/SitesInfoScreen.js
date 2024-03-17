import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { HelperService } from '../../../Services/Utils/HelperService';
import SiteInfoTuple from '../SitesInfoTuple/SitesInfoTuple';
import Style from './SitesInfoStyle';

class SiteInfoScreen extends Component {

  render() {
    const {
      selectedSite, agentAreas
    } = this.props;

    if (!selectedSite) {
      return (
        <View style={Style.parentContainer}>
          <Loading />
        </View>
      );
    }

    return (
      <View style={Style.parentContainer}>
        <SiteInfoTuple data={selectedSite} areas={agentAreas} />
        <View style={{ height: 15 }}></View>
        <ScrollView>
          <InfoDisplay label={'Email'} value={selectedSite.email__c || 'None'} />
          <InfoDisplay label={'Phone '} value={selectedSite.phone__c || 'None'} />
          <InfoDisplay label={'Alternate PhoneNo'} value={selectedSite.alternate_phone__c || 'None'} />
          <InfoDisplay label={'Address Line 1'} value={selectedSite.address_line_1__c || 'None'} />
          <InfoDisplay label={'Address Line 2'} value={selectedSite.address_line_2__c || 'None'} />
          <InfoDisplay label={'Dealer'} value={HelperService.getNameFromSFID(this.props.dealerSearchableList, selectedSite.dealer__c || '')} />
          <InfoDisplay label={'Retailer'} value={HelperService.getNameFromSFID(this.props.retailerSearchableList, selectedSite.retailer__c || 'None')} />
          <InfoDisplay label={'Source'} value={HelperService.getNameFromSFID(this.props.influencerSearchableList, selectedSite.source__c || 'None')} />
          <InfoDisplay label={'Size'} value={selectedSite.size__c || 'None'} />
          <InfoDisplay label={'Project Type'} value={selectedSite.project_type__c || 'None'} />
          <InfoDisplay label={'Source Type'} value={selectedSite.source_type__c || 'None'} />
          <InfoDisplay label={'Status'} value={selectedSite.status__c || 'None'} />
          <InfoDisplay label={'Lead Stage'} value={selectedSite.site_stages__c || 'None'} />
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  selectedSite: state.sites.selectedSite,
  agentAreas: state.user.agentAreas,
  retailerSearchableList: state.sites.retailerSearchableList,
  influencerSearchableList: state.sites.influencerSearchableList,
  dealerSearchableList: state.sites.dealerSearchableList,

});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteInfoScreen)

