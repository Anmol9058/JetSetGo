import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import SiteActions from '../../../Stores/Sites/Actions';
import SiteProductListTuple from '../SiteProductListTuple/SiteProductListTuple';
import Style from './SiteProductListScreenStyle';
import { HelperService } from '../../../Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService';

class SiteProductListScreen extends Component {
    componentDidMount() {
        const { siteProductList } = this.props;
        this.props.clearSelectSiteProduct();
        this.fetchSiteProductCall();
    }

    fetchSiteProductCall() {
        const {
            token,
            agentid,
            sitesOffset,
            sitesLimit,
            fetchSiteProduct
        } = this.props;

        fetchSiteProduct({
            token,
            agentid,
            offset: sitesOffset,
            limit: sitesLimit,
            id: this.props.selectedSite.pg_id__c
        });
    }

    filterResults(list) {
        let siteSearchFilters = this.props.siteSearchFilters;
        let filteredList = HelperService.multiFieldSearchText(list, siteSearchFilters['searchValue']);
        return filteredList;
    }

    onSelectSiteProduct(params) {
        NavigationService.navigate('SiteProductInfoScreen', params.data);
        this.props.selectSiteProduct(params.data);
    }


    render() {
        const {
            siteProductList,
            fetchSiteProductLoader,
            agentAreas
        } = this.props;

        let visibleNode = [];

        if (siteProductList && siteProductList.length) {
            let filteredSitesList = this.filterResults(siteProductList.map((obj) => obj));
            if (filteredSitesList.length) {
                visibleNode = (
                    <FlatList
                        data={filteredSitesList}
                        renderItem={({ item }) => <SiteProductListTuple data={item} id={item.sfid} areas={agentAreas} onPress={() => this.onSelectSiteProduct({ id: item.sfid, data: item, type: 'SiteProduct' })} />}
                        keyExtractor={item => item.sfid}
                        onRefresh={() => this.fetchSiteProductCall()}
                        refreshing={fetchSiteProductLoader}
                    />
                );
            } else {
                visibleNode = <NoDataFound text={'No Leads Product Found'} />
            }
        } else if (fetchSiteProductLoader) {
            visibleNode = <Loading />
        } else if (siteProductList && !siteProductList.length && !fetchSiteProductLoader) {
            visibleNode = <NoDataFound text={'No Leads Product Found'} />
        }



        return (
            <View style={Style.container}>
                <View >
                    {visibleNode}
                </View>
                <TouchableOpacity
                    style={Style.plusIcon}
                    onPress={() => NavigationService.navigate('NewSiteProduct')}>
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
    sitesOffset: state.sites.sitesOffset,
    sitesLimit: state.sites.sitesLimit,
    agentAreas: state.user.agentAreas,
    siteProductList: state.sites.siteProductList,
    fetchSiteProductLoader: state.sites.fetchSiteProductLoader,
    siteSearchFilters: state.sites.siteSearchFilters,
    selectedSite:state.sites.selectedSite
});

const mapDispatchToProps = (dispatch) => ({
    fetchSiteProduct: (params) => dispatch(SiteActions.fetchSiteProducts(params)),
    selectSiteProduct: (params) => dispatch(SiteActions.selectSiteProduct(params)),
    clearSelectSiteProduct: () => dispatch(SiteActions.clearSelectSiteProduct())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteProductListScreen)

