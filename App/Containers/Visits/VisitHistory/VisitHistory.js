import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, TouchableOpacity, Text,StyleSheet } from 'react-native'
import HistoryTuple from './HistoryTuple'
import VisitsActions from 'App/Stores/Visits/Actions'
import { HelperService } from 'App/Services/Utils/HelperService'
import _ from 'lodash'
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import NavigationService from 'App/Services/NavigationService'
import GenericIcon from 'App/Components/GenericIcon'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'


class VisitHistory extends Component {
  componentDidMount() {
    this.getOrders();
  }

  getOrders(params) {
    const {
      selectedRetailer,
      fetchHistory,
      selectedSite,
      selectedInfluencer,
      visitId,
      token,
      type,
      monthNumber,
      customersfid,
      userid
     
    } = this.props

    // let requestParameter = {}
        fetchHistory({
            token,
            customer:customersfid,
            flsp__c:userid,
        })
    
  }

  getCardNode(item) {
    return <HistoryTuple data={item} id={item.Id} />
  }

  render() {
    const { loader, VisitHistory} = this.props

    //console.log('history', VisitHistory)
    let visibleNode = []
    if (VisitHistory && VisitHistory.length > 0) {
    //   console.log('history', VisitHistory)
      visibleNode = (
        <FlatList
          data={VisitHistory}
          renderItem={({ item }) => this.getCardNode(item)}
          keyExtractor={(item) => item.Id}
          onRefresh={() => this.getOrders()}
          refreshing={loader}
        />
      )
    } else if (loader) {
      visibleNode = <Loading />
    } else if (VisitHistory && !VisitHistory.length && !loader) {
    //  console.log('history', VisitHistory)
      visibleNode = <NoDataFound text={'No History Found'} />
    }
    return <View style={{ flex: 1 }}>
       
        {visibleNode}
        </View>
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,

  VisitHistory: state.visits.History &&  state.visits.History.data &&  state.visits.History.data.length>0 ?  state.visits.History.data:[],
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  loader: state.visits.fetchHistoryLoader,
  visitId: state.visits.executeVisitData.Id,
  type: state.visits.type,
  selectedRetailer: state.retailers.selectedRetailer,
  selectedInfluencer: state.influencers.selectedInfluencer,
  selectedSite: state.sites.selectedSite,
  customersfid: state.visits.executeVisitData.customer_sfid__c,
  userid: state.user.id
  //  monthNumber: state.visits.monthNumber,
})

const mapDispatchToProps = (dispatch) => ({
  fetchHistory: (params) => dispatch(VisitsActions.fetchHistory(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitHistory)

const Styles = StyleSheet.create({  
backArrow: {
    color: Colors.button,
    paddingLeft: 5,
    fontSize:30,
    marginTop:'3%'
  },
}); 
