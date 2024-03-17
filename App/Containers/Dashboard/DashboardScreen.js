import React, { Component } from 'react'
import { View, Alert, ScrollView } from 'react-native'
import { Button, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './DashboardScreenStyle'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import LayoutScreen from '../Layout/LayoutScreen';
import { START, ABSENT, GOOD, MORNING } from 'App/Constants';
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import UserActions from 'App/Stores/User/Actions'
import SingleInfo from 'App/Components/SingleInfo';
import Separator from 'App/Components/Separator';
import DashboardHeading from 'App/Components/DashboardHeading';
import DashboardTabs from './DashboardTabs';
import AchievedTargets from './AchievedTargets';
import CircularProgressBar from 'App/Components/CircularProgressBar';
import GroupedLineChart from 'App/Components/GroupedLineChart';
import { Colors, ApplicationStyles, Fonts, Metrics } from 'App/Theme'
import SummaryTables from './SummaryTables'
import MyDetails from './SummaryTables/MyDetails'
import MyDetailsList from './MyDetails'
import DashboardActions from 'App/Stores/Dashboard/Actions'
import DailyReport from './DailyReport';
import Targets from './Targets'
import MySummary from './MySummary';



class DashboardScreen extends React.Component {
  componentDidMount() {
    const {
      token,
      agentid,
      searchFilters,
      getOrderValue,
      getVisitCount,
      getSiteCount,
      getCounters,
      getEventCount,
      getDashboardSummary
    } = this.props

    let params = {
      token,

      startDate: HelperService.getCurrentTimestamp(),
      endDate: searchFilters['endDate'],
      psm__c: searchFilters['psm__c'] ? searchFilters['psm__c'] : agentid,
    }

    getDashboardSummary(params)

  }

  render() {
    // console.log("DashboardScreen");
    let selectedTabNode = [];
    if (this.props.isASM.length) {
      switch (this.props.searchFilters['selectedTab']) {
        case 0:
          selectedTabNode = <DailyReport />
          break
        case 1:
          // selectedTabNode = <MyDetailsList />
          selectedTabNode = <DailyReport  />

          break
        case 2:
          // selectedTabNode = <Targets/>
          selectedTabNode = <DailyReport  />

          break
        case 3:
         // selectedTabNode = <MySummary />
          selectedTabNode = <DailyReport  />
          break
        //   case 5:
        //     selectedTabNode=<MyDetails />
      }
    } else {
      switch (this.props.searchFilters['selectedTab']) {
        case 0:
         // selectedTabNode = <MyDetailsList />
          selectedTabNode = <DailyReport />
          break
        case 1:
         selectedTabNode = <DailyReport />
        //  selectedTabNode = <Targets />
          break
        case 2:
          //  selectedTabNode = <Targets />
          selectedTabNode = <DailyReport  />

          
          break
        case 3:
          // selectedTabNode = <MySummary />
          selectedTabNode = <DailyReport  />

          break
      

      }
    }
    return (
      <ScrollView>
        {selectedTabNode}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: '', name: 'All' }]),
  searchFilters: state.dashboard.searchFilters,
  data: state.dashboard.data,
  loaders: state.dashboard.loaders
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(DashboardActions.changeSearchFilters(params)),
  getOrderValue: (params) => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount: (params) => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount: (params) => dispatch(DashboardActions.getSiteCount(params)),
  getCounters: (params) => dispatch(DashboardActions.getCounters(params)),
  getEventCount: (params) => dispatch(DashboardActions.getEventCount(params)),
  getDashboardSummary: (params) => dispatch(DashboardActions.getDashboardSummary(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen)