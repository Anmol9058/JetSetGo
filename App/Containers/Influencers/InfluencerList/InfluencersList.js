import Loading from 'App/Components/Loading';
import NoDataFound from '../../../Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import InfluencersActions from '../../../Stores/Influencers/Actions';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import InfluencersTuple from '../InfluencerTuple';
import Style from './InfluencersListStyle';
import { HelperService } from '../../../Services/Utils/HelperService';


class InfluencersListScreen extends Component {
  componentDidMount() {
    const {
      influencersList,
    } = this.props;

    this.props.clearSelectInfluencer();
    this.fetchInfluencersCall();
  }

  fetchInfluencersCall() {
    const {
      token,
      agentid,
      influencersOffset,
      influencersLimit,
      fetchInfluencers
    } = this.props;

    fetchInfluencers({
      token,
      agentid,
      offset: influencersOffset,
      limit: influencersLimit
    });
  }



  filterResults(list) {
    let influencerSearchFilters = this.props.influencerSearchFilters;;
    let filteredList = HelperService.multiFieldSearchText(list, influencerSearchFilters['searchValue']);

    filteredList = HelperService.sortListFilter(filteredList, influencerSearchFilters['sortBy'], influencerSearchFilters['sortType']);

    return filteredList;
  }

  onSelectInfluencer(params) {
    const {
      token,
      agentid,
      influencersOffset,
      influencersLimit,
      fetchInfluencerSites,
    } = this.props;

    NavigationService.navigate('InfluencerInfoScreen', params);
    this.props.selectInfluencer(params);
    fetchInfluencerSites({
      token,
      agentid,
      offset: influencersOffset,
      limit: influencersLimit,
      id: params.data.sfid
    });
  }


  render() {
    const {
      influencersList,
      fetchInfluencersLoader,
      influencerSearchFilters
    } = this.props;

    let visibleNode = [];

    if (influencersList && influencersList.length) {

      let filteredInfluencerList = this.filterResults(influencersList.map((obj) => obj));

      if (filteredInfluencerList.length) {
        visibleNode = (
          <FlatList
            data={filteredInfluencerList}
            renderItem={({ item }) => <InfluencersTuple data={item} id={item.sfid} onPress={() => this.onSelectInfluencer({ id: item.sfid, data: item, type: 'Influencers' })} agentList={this.props.agentAreas} />}
            keyExtractor={item => item.pg_id__c}
            onRefresh={() => this.fetchInfluencersCall()}
            refreshing={fetchInfluencersLoader}
            ListEmptyComponent={() => <NoDataFound text={'No Influencers Found'} />}
          />
        );
      } else {
        visibleNode = <NoDataFound text={'No Influencers Found'} />
      }
    } else if (fetchInfluencersLoader) {
      visibleNode = <Loading />
    } else if (influencersList && !influencersList.length && !fetchInfluencersLoader) {
      visibleNode = <NoDataFound text={'No Influencers Found'} />
    }


    return (
      <View style={Style.container}>
        <View >
          {visibleNode}
        </View>
        <TouchableOpacity
          style={Style.plusIcon}
          onPress={() => NavigationService.navigate('NewInfluencers')}>
          <Icon
            name={'ios-add'}
            ios={'ios-add'}
            android={'md-add'}
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
  agentAreas: state.user.agentAreas,
  influencersList: state.influencers.influencersList,
  fetchInfluencersLoader: state.influencers.fetchInfluencersLoader,
  influencerSearchFilters: state.influencers.influencerSearchFilters,
  influencersOffset: state.influencers.influencerOffset,
  influencersLimit: state.influencers.influencerLimit
});

const mapDispatchToProps = (dispatch) => ({
  fetchInfluencers: (params) => dispatch(InfluencersActions.fetchInfluencers(params)),
  selectInfluencer: (params) => dispatch(InfluencersActions.selectInfluencer(params)),
  clearSelectInfluencer: () => dispatch(InfluencersActions.clearSelectInfluencer()),
  fetchInfluencerSites: (params) => dispatch(InfluencersActions.fetchInfluencerSites(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfluencersListScreen)

