import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import SitesActions from 'App/Stores/Sites/Actions';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Style from './InfluencerSiteListStyle';
import { HelperService } from '../../../Services/Utils/HelperService';
import InfluencerSiteTuple from '../InfluencerSiteTuple/InfluencerSiteTuple';


class InfluencerSiteList extends Component {
    componentDidMount() {
        const { influencerSiteList } = this.props;
        if (influencerSiteList && influencerSiteList.length) {
        } else {
            this.fetchInfluencerSiteCall();
        }

    }

    fetchInfluencerSiteCall() {
        const {
            token,
            agentid,
            influencersOffset,
            influencersLimit,
            fetchInfluencerSites,
            selectedInfluencer
        } = this.props;

        fetchInfluencerSites({
            token,
            agentid,
            offset: influencersOffset,
            limit: influencersLimit,
            id: selectedInfluencer.data.sfid
        });
    }



    filterResults(list) {
        let influencerSearchFilters = this.props.influencerSearchFilters;;
        let filteredList = HelperService.multiFieldSearchText(list, influencerSearchFilters['searchValue']);
        filteredList = HelperService.sortListFilter(filteredList, influencerSearchFilters['sortBy'], influencerSearchFilters['sortType']);
        return filteredList;
    }

    onSelectSite(params) {
        NavigationService.navigate('SitesInfoScreen', params.data);
        this.props.selectSite(params.data);
    }


    render() {
        const {
            influencerSiteList,
            fetchInfluencerSiteLoader,
            agentAreas,
            selectedInfluencer
        } = this.props;

        let visibleNode = [];

        if (influencerSiteList && influencerSiteList.length) {

            let filteredInfluencerList = this.filterResults(influencerSiteList.map((obj) => obj));

            if (filteredInfluencerList.length) {
                visibleNode = (
                    <FlatList
                        data={filteredInfluencerList}
                        renderItem={({ item }) => <InfluencerSiteTuple data={item} id={item.sfid} areas={agentAreas} onPress={() => this.onSelectSite({ id: item.sfid, data: item, type: 'Site' })} />}
                        keyExtractor={item => item.sfid}
                        onRefresh={() => this.fetchInfluencerSiteCall()}
                        refreshing={fetchInfluencerSiteLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Site Found'} />}
                    />
                );
            } else {
                visibleNode = <NoDataFound text={'No Site Found'} />
            }
        } else if (fetchInfluencerSiteLoader) {
            visibleNode = <Loading />
        } else if (influencerSiteList && !influencerSiteList.length && !fetchInfluencerSiteLoader) {
            visibleNode = <NoDataFound text={'No Site Found'} />
        }


        return (
            <View style={Style.container}>
                <View >
                    {visibleNode}
                </View>
                <TouchableOpacity
                    style={Style.plusIcon}
                    onPress={() => NavigationService.navigate('NewSites', {source: selectedInfluencer.data.sfid})}>
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
    influencerSiteList: state.influencers.influencerSiteList,
    fetchInfluencerSiteLoader: state.influencers.fetchInfluencerSiteLoader,
    influencerSearchFilters: state.influencers.influencerSearchFilters,
    selectedInfluencer: state.influencers.selectedInfluencer,
    influencersOffset: state.influencers.influencerOffset,
    influencersLimit: state.influencers.influencerLimit
});

const mapDispatchToProps = (dispatch) => ({
    selectSite: (params) => dispatch(SitesActions.selectSite(params)),
    fetchInfluencerSites: (params) => dispatch(InfluencersActions.fetchInfluencerSites(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfluencerSiteList)

