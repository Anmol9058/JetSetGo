import SearchBar from 'App/Components/SearchBar';
import RetailersActions from 'App/Stores/Retailers/Actions';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Header } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';


class EventListLayout extends React.Component {
    onAreaChange(areaCode) {
        this.props.updateSearchFilters({ edited_field: 'area', 'edited_value': areaCode });
    }

    render() {
        const {
            agentAreas,
            retailerSearchFilters,
            updateSearchFilters,
            openMoreFiltersOption,
            closeMoreFiltersOption
        } = this.props;


        return (
            <View>
                <Header style={Styles.header}>
                    <SearchBar
                        placeholder={`Search by event name`}
                        onInputChange={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
                        onInputSubmit={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
                        onInputClear={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
                        value={retailerSearchFilters['searchValue']}
                        ContainerStyles={Styles.searchContainer}
                    />
                </Header>
                {this.props.children}
            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    retailersOffset: state.retailers.retailersOffset,
    retailersLimit: state.retailers.retailersLimit,
    agentAreas: [{ id: '', name: 'All' }].concat(state.user.agentAreas),
    retailerCompetitors: state.retailers.retailerCompetitors,
    retailersList: state.retailers.retailersList,
    dealersList: state.retailers.dealersList,
    fetchRetailersLoader: state.retailers.fetchRetailersLoader,
    fetchDealersLoader: state.retailers.fetchDealersLoader,
    retailerSearchFilters: state.retailers.retailerSearchFilters
});

const mapDispatchToProps = (dispatch) => ({
    updateSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
    openMoreFiltersOption: () => dispatch(RetailersActions.openMoreFiltersOption()),
    closeMoreFiltersOption: () => dispatch(RetailersActions.closeMoreFiltersOption()),
    fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
    fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListLayout)

const Styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.white,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 0,
        paddingLeft: 10,
        paddingRight: 10
    },
    searchContainer: {
        width: Math.round(Dimensions.get('window').width - 20)
    },
    searchableDropdownContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    picker: {
        borderRadius: 100,
        width: 330
    },
    searchFilterContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchFilterTypeBox: {
        marginHorizontal: 5,
        width: 140,
        borderWidth: 1.5
    },
    searchFilterTypeText: {
        fontSize: 15,
        fontFamily: ApplicationStyles.textMediumFont
    },
});
