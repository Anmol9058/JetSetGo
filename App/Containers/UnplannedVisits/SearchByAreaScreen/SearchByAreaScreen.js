import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList } from 'react-native'
import { Button, Text, Icon } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './SearchByAreaScreenStyles'
import BlueButton from 'App/Components/BlueButton'
import SearchableDropdown from 'App/Components/SearchableDropdown'
import WhiteButton from 'App/Components/WhiteButton'
import RetailerCard from '../UnplannedRetailerCard'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService'
import RetailersActions from 'App/Stores/Retailers/Actions'
import VisitsActions from 'App/Stores/Visits/Actions'
import SitesActions from 'App/Stores/Sites/Actions'
import InfluencersActions from 'App/Stores/Influencers/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import { Colors } from 'App/Theme'
import RetailerResultList from 'App/Containers/UnplannedVisits/RetailerResultList'
import PlannedVisitCard from 'App/Containers/Visits/PlannedVisitCard'
import _ from 'lodash'

class SearchByAreaScreen extends React.Component {
  componentDidMount() {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      updateSearchFilters,
      countMapping,
      user_details,
    } = this.props

    this.props.clearSelectRetailer()
    let value = Object.keys(countMapping)[0]

    if (retailersList && !_.isEmpty(retailersList)) {
      updateSearchFilters({
        edited_field: 'party_type',
        edited_value: user_details.rd_manual ? 'Retail_Distributor' : value,
      })
    } else {
      this.fetchRetailersCall()
      updateSearchFilters({
        edited_field: 'party_type',
        edited_value: user_details.rd_manual ? 'Retail_Distributor' : value,
      })
    }
  }

  fetchRetailersCall() {
    const { token, agentid, fetchRetailers } = this.props

    fetchRetailers({
      token,
      agentid,
    })
  }

  filterResults(list) {
    const { searchByAreaFilters } = this.props

    let filteredList = HelperService.searchTextListFilter(
      list,
      'area__c',
      searchByAreaFilters['area']
    )
    filteredList = HelperService.searchTextListFilter(
      filteredList,
      'name',
      searchByAreaFilters['name']
    )
    filteredList = HelperService.sortListFilter(filteredList, 'name', 'ASC')
    return filteredList
  }

  onSelect(params) {
    const { token, agentid, offset, limit, submitSelectedUnplannedVisit, user_details } = this.props

    let data = [
      {
        customer_name__c: params.sfid,
        //"visit_type": "Unplanned",
        visit_date__c: HelperService.getCurrentTimestamp(),
        // "createddate": HelperService.getCurrentTimestamp(),
        assigned_by__c: 'Self',
        type__c: params.type,
        area__c: params.area,
        flsp__c: agentid,
        manager__c: user_details.manager__c,
        team_manager__c: user_details.team_manager__c,
        visit_type__c: 'UnPlanned',
      },
    ]

    Alert.alert(
      'Start Visit',
      'Do you want to start the visit for this seller?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () =>
            submitSelectedUnplannedVisit({ payload: data, token: token, agentid: agentid }),
        },
      ],
      { cancelable: false }
    )
  }

  accountList(filteredRetailersList) {
    let arr = []
    let newArr = []

    for (let index = 0; index < filteredRetailersList.length; index++) {
      if (filteredRetailersList[index][0] == 'Retail_Distributor') {
        arr = filteredRetailersList[index]
      }
    }
    newArr.push(arr)
    return newArr
  }

  getPartiesDataNode() {
    const {
      user_details,
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      countMapping,
    } = this.props

    let visibleNode = []

    if (retailersList.success) {
      let filteredRetailersList = Object.entries(countMapping)

      if (user_details.rd_manual) {
        filteredRetailersList = this.accountList(filteredRetailersList)
      }

      if (filteredRetailersList.length) {
        visibleNode = (
          <FlatList
            horizontal
            key={'Retailers'}
            data={filteredRetailersList}
            renderItem={({ item }) => this.getRetailerCardNode(item)}
            keyExtractor={(item) => item.toString()}
            onRefresh={() => this.fetchRetailersCall()}
            refreshing={fetchRetailersLoader}
            ListEmptyComponent={() => <NoDataFound text={'No Parties Found'} />}
          />
        )
      } else {
        visibleNode = <NoDataFound text={'No Parties Found'} />
      }
    } else if (fetchRetailersLoader) {
      visibleNode = <Loading />
    } else if (retailersList && !fetchRetailersLoader) {
      visibleNode = (
        <NoDataFound text={'No Parties found.'}>
          <Icon
            name={'refresh'}
            onPress={() => this.fetchRetailersCall()}
            style={{ color: Colors.button, fontSize: 25, alignSelf: 'center', padding: 10 }}
            type={'FontAwesome'}
          />
        </NoDataFound>
      )
    }

    return visibleNode
  }

  getRetailerCardNode(data) {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      updateSearchFilters,
      countMapping,
      partiesMapping,
      searchByAreaFilters,
      isASM,
      user_details,
    } = this.props

    let count = data[1]
    Object.keys(partiesMapping).map((key) => {
      if (key == data[0]) {
        let filteredPartiesList = this.filterResults(Object.values(partiesMapping[key]))
        count = filteredPartiesList.length
      }
    })

    if (data[0] == 'Retailer' && !isASM.length && user_details.business_channel__c == 'Retail') {
      return []
    } else {
      // console.log("fggffg",data[0].replace('_', ' ') +'('  +count+ ')');
      return (
        <WhiteButton
          title={data[0].replace('_', ' ') + '(' + count + ')'}
          style={{ ...Style.actionButton, ...Style.customSelectedStyleCorpBlue }}
          textStyle={Style.actionButtonText}
          onPress={() => updateSearchFilters({ edited_field: 'party_type', edited_value: data[0] })}
          selected={searchByAreaFilters['party_type'] == data[0]}
          customSelectedStyle={{ ...Style.customSelectedStyleCorpBlue, ...Style.selected }}
          customSelectedTextStyle={Style.customSelectedTextStyle}
        />
      )
    }
  }
  loadingNode() {
    let loadingNode = (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.button,
          paddingBottom: 5,
          position: 'absolute',
          backgroundColor: 'rgb(0, 0, 0, .3)',
          zIndex: 4,
          width: '100%',
          height: '100%',
        }}
      >
        <Loading />
      </View>
    )
    return loadingNode
  }

  getPartiesDataNode1() {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      countMapping,
      partiesMapping,
      searchByAreaFilters,
      isASM,
    } = this.props

    let visibleNode = []
    Object.keys(partiesMapping).map((key) => {
      if (key == searchByAreaFilters['party_type']) {
        let filteredPartiesList = this.filterResults(Object.values(partiesMapping[key]))
        if (filteredPartiesList.length) {
          visibleNode = (
            <FlatList
              key={'Retailers'}
              data={filteredPartiesList}
              renderItem={({ item }) => (
                <PlannedVisitCard
                  data={item}
                  key={item.sfid}
                  id={item.sfid}
                  show={true}
                  onPress={() => {
                    this.onSelect({
                      sfid: item.sfid,
                      type: item.account_type__c,
                      area: item.area__c,
                    })
                  }}
                  // categoryRatingMapping={categoryRatingMapping}
                  //  onAddClick={() => this.onAddClick(item)}
                  //  onRemoveClick={() => this.onRemoveClick(item)}
                  // added={this.isRetailerAdded(item)}
                  //areas={agentAreas}
                  // type={searchFilters['retailer_type']}
                />
              )}
              keyExtractor={(item) => item.sfid}
              // onRefresh={() => this.fetchRetailersCall()}
              //  refreshing={fetchRetailersLoader}
              // ListEmptyComponent={() => <NoDataFound text={'No Parties Found'} />}
            />
          )
        } else {
          visibleNode = <NoDataFound text={'No Parties Found'} />
        }
      }
    })

    return visibleNode
  }

  render() {
    const { submitPlannedVisitsLoader } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
        <View style={{ height: '15%', backgroundColor: Colors.white, justifyContent: 'center' }}>
          {this.getPartiesDataNode()}
        </View>

        {submitPlannedVisitsLoader ? this.loadingNode() : this.getPartiesDataNode1()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  agentAreas: [{ id: '', name: 'All' }].concat(state.user.agentAreas),

  offset: state.retailers.retailersOffset,
  limit: state.retailers.retailersLimit,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  fetchDealersLoader: state.retailers.fetchDealersLoader,
  searchByAreaFilters: state.visits.unplannedVisit.searchByAreaFilters,
  submitPlannedVisitsLoader: state.visits.planVisit.submitPlannedVisitsLoader,
  countMapping: state.retailers.countMapping,
  partiesMapping: state.retailers.partiesMapping,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  user_details: state.user.user_details,
  isASM: state.user.psmList,
  user_details: state.user.user_details,
})

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
  submitSelectedUnplannedVisit: (params) =>
    dispatch(VisitsActions.submitSelectedUnplannedVisit(params)),
  updateSearchFilters: (params) => dispatch(VisitsActions.changeSearchByAreaFilters(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchByAreaScreen)
