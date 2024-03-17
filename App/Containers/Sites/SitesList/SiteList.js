import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import { HelperService } from 'App/Services/Utils/HelperService';
import SitesActions from 'App/Stores/Sites/Actions';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import SitesTuple from '../../Sites/SitesTuple';
import Style from './SitesListStyle';
import GenericIcon from 'App/Components/GenericIcon'

class SiteListScreen extends Component {

  componentDidMount() {
    this.props.clearSelectSite();
    if (this.props.navigation.getParam('payload')) {
      this.fetchSitesCall();
    } else {
      this.fetchSitesCall();
    }
  }

  fetchSitesCall() {
    const {
      token,
      agentid,
      sitesOffset,
      sitesLimit,
      fetchSites
    } = this.props;

    fetchSites({
      token,
      agentid,
      offset: sitesOffset,
      limit: sitesLimit
    });
  }

  filterResults(list) {
    let siteSearchFilters = this.props.siteSearchFilters;
    let filteredList = HelperService.multiFieldSearchText(list, siteSearchFilters['searchValue']);
    return filteredList;
  }

  onSelectSite(params) {
    NavigationService.navigate('SitesInfoScreen', params.data);
    this.props.selectSite(params.data);
  }


  render() {
    const {
      sitesList,
      fetchSitesLoader,
      agentAreas
    } = this.props;

    let visibleNode = [];

    if (sitesList && sitesList.length) {
      let filteredSitesList = this.filterResults(sitesList.map((obj) => obj));
      if (filteredSitesList.length) {
        visibleNode = (
          <FlatList
            data={filteredSitesList}
            renderItem={({ item }) => <SitesTuple data={item} id={item.sfid} areas={agentAreas} onPress={() => this.onSelectSite({ id: item.sfid, data: item, type: 'Site' })} />}
            keyExtractor={item => item.sfid}
            onRefresh={() => this.fetchSitesCall()}
            refreshing={fetchSitesLoader}
          />
        );
      } else {
        visibleNode = <NoDataFound text={'No Leads Found'} />
      }
    } else if (fetchSitesLoader) {
      visibleNode = <Loading />
    } else if (sitesList && !sitesList.length && !fetchSitesLoader) {
      visibleNode = <NoDataFound text={'No Leads Found'} />
    }



    return (
      <View style={Style.container}>
        <View >
          {visibleNode}
        </View>
        <TouchableOpacity
          style={Style.plusIcon}
          onPress={() => NavigationService.navigate('NewSites')}>
          <GenericIcon
            name={'add'}
            style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  sitesOffset: state.sites.sitesOffset,
  sitesLimit: state.sites.sitesLimit,
  agentAreas: state.user.agentAreas,
  sitesList: state.sites.sitesList,
  fetchSitesLoader: state.sites.fetchSitesLoader,
  siteSearchFilters: state.sites.siteSearchFilters
});

const mapDispatchToProps = (dispatch) => ({
  selectSite: (params) => dispatch(SitesActions.selectSite(params)),
  fetchSites: (params) => dispatch(SitesActions.fetchSites(params)),
  clearSelectSite: () => dispatch(SitesActions.clearSelectSite())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteListScreen)

