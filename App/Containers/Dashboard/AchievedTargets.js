import CircularProgressBar from 'App/Components/CircularProgressBar';
import Loading from 'App/Components/Loading';
import Separator from 'App/Components/Separator';
import SingleInfo from 'App/Components/SingleInfo';
import DashboardActions from 'App/Stores/Dashboard/Actions';
import _ from 'lodash';
import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Style from './DashboardScreenStyle';



class AchievedTargets extends React.Component {

  componentDidMount() {
    //console.log(this.props.psmList, "PSMLIST");
  }
  filteredData(list) {
    let filteredList = {};
    const {
      searchFilters
    } = this.props;

    let selectedPSM = searchFilters['psm__c'];

    if (selectedPSM) {
      if (list[selectedPSM]) {
        filteredList[selectedPSM] = list[selectedPSM];
      }
      return filteredList;
    }

    return list
  }


  getSitesDataNode() {
    let sitesVisibleNode = [];

    const {
      data,
      loaders
    } = this.props

    const {
      siteCount
    } = data;

    const {
      siteCountLoader
    } = loaders;


    if (siteCountLoader) {
      sitesVisibleNode = (
        <View>
          <SingleInfo
            heading={'Hair Care Performance'}
            value={'None'}
          />
          <Loading />
        </View>
      );
    } else {
      let filteredData = this.filteredData(siteCount);
      if (_.isEmpty(filteredData)) {
        sitesVisibleNode = (
          <View>
            <SingleInfo
              heading={'Hair Care Performance'}
              value={'None'}
            />
            <Text style={Style.noDataText}>No Data</Text>
          </View>
        );
      } else {
        let totalCount = 0;
        let totalTarget = 0;
        _.map(filteredData, (value, key) => {
          value.map((data) => {
            if (data['target__c']) {
              totalCount += Number(data['count'] || 0);
              totalTarget += Number(data['target__c'] || 0);
            }
          });
        });

        sitesVisibleNode = (
          <View>
            <SingleInfo
              heading={'Hair Care Performance'}
              value={totalCount}
            />
            <CircularProgressBar
              target={totalTarget}
              value={totalCount}
            />
          </View>
        )
      }
    }

    return sitesVisibleNode;
  }


  getCountersNode() {
    let countersVisibleNode = [];
    const {
      data,
      loaders
    } = this.props

    const {
      counters
    } = data;

    const {
      countersLoader
    } = loaders;


    if (countersLoader) {
      countersVisibleNode = (
        <View>
          <SingleInfo
            heading={'Body Care Performance'}
            value={'None'}
          />
          <Loading />
        </View>
      );
    } else {
      let filteredData = this.filteredData(counters);
      if (_.isEmpty(filteredData)) {
        countersVisibleNode = (
          <View>
            <SingleInfo
              heading={'Body Care Performance'}
              value={'None'}
            />
            <Text style={Style.noDataText}>No Data</Text>
          </View>
        );
      } else {
        let totalCount = 0;
        let totalTarget = 0;
        _.map(filteredData, (value, key) => {
          value.map((data) => {
            if (data['target__c']) {
              totalCount += Number(data['count'] || 0);
              totalTarget += Number(data['target__c'] || 0);
            }
          });
        });

        countersVisibleNode = (
          <View>
            <SingleInfo
              heading={'Body Care Performance'}
              value={totalCount}
            />
            <CircularProgressBar
              target={totalTarget}
              value={totalCount}
            />
          </View>
        )
      }
    }

    return countersVisibleNode;
  }


  getOrderValueNode() {
    let orderValueVisibleNode = [];
    const {
      data,
      loaders
    } = this.props

    const {
      orderValue
    } = data;

    const {
      orderValueLoader
    } = loaders;


    if (orderValueLoader) {
      orderValueVisibleNode = (
        <View>
          <SingleInfo
            heading={'Order value'}
            value={'None'}
          />
          <Loading />
        </View>
      );
    } else {
      let filteredData = this.filteredData(orderValue);
   
      if (_.isEmpty(filteredData)) {
        orderValueVisibleNode = (
          <View>
            <SingleInfo
              heading={'Order value'}
              value={'None'}
            />
            <Text style={Style.noDataText}>No Data</Text>
          </View>
        );
      } else {
        let totalCount = 0;
        let totalTarget = 0;
        _.map(filteredData, (value, key) => {
          value.map((data) => {
            if (data['target__c']) {
              totalCount += Number(data['count'] || 0);
              totalTarget += Number(data['target__c'] || 0);
            }
          });
        });

        orderValueVisibleNode = (
          <View>
            <SingleInfo
              heading={'Order value'}
              value={totalCount.toFixed(2)}
            />
            <CircularProgressBar
              target={totalTarget}
              value={totalCount.toFixed(2)}
            />
          </View>
        )
      }
    }

    return orderValueVisibleNode;
  }


  getVisitCountNode() {
    let visitCountVisibleNode = [];
    const {
      data,
      loaders
    } = this.props

    const {
      visitCount
    } = data;

    const {
      visitCountLoader
    } = loaders;


    if (visitCountLoader) {
      visitCountVisibleNode = (
        <View>
          <SingleInfo
            heading={'Visits'}
            value={'None'}
          />
          <Loading />
        </View>
      );
    } else {
      let filteredData = this.filteredData(visitCount);
      if (_.isEmpty(filteredData)) {
        visitCountVisibleNode = (
          <View>
            <SingleInfo
              heading={'Visits'}
              value={'None'}
            />
            <Text style={Style.noDataText}>No Data</Text>
          </View>
        );
      } else {
        let totalCount = 0;
        let totalTarget = 0;
        _.map(filteredData, (value, key) => {
          value.map((data) => {
            if (data['target__c']) {
              totalCount += Number(data['count'] || 0);
              totalTarget += Number(data['target__c'] || 0);
            }
          });
        });

        visitCountVisibleNode = (
          <View>
            <SingleInfo
              heading={'Visits'}
              value={totalCount}
            />
            <CircularProgressBar
              target={totalTarget}
              value={totalCount}
            />
          </View>
        )
      }
    }

    return visitCountVisibleNode;
  }



  getEventsCountNode() {
    let eventsCountVisibleNode = [];
    const {
      data,
      loaders
    } = this.props

    const {
      eventsCount
    } = data;

    const {
      eventsCountLoader
    } = loaders;


    if (eventsCountLoader) {
      eventsCountVisibleNode = (
        <View>
          <SingleInfo
            heading={'Skin Care Performance'}
            value={'None'}
          />
          <Loading />
        </View>
      );
    } else {
      let filteredData = this.filteredData(eventsCount);
      if (_.isEmpty(filteredData)) {
        eventsCountVisibleNode = (
          <View>
            <SingleInfo
              heading={'Skin Care Performance'}
              value={'None'}
            />
            <Text style={Style.noDataText}>No Data</Text>
          </View>
        );
      } else {
        let totalCount = 0;
        let totalTarget = 0;
        _.map(filteredData, (value, key) => {
          value.map((data) => {
            if (data['target__c']) {
              totalCount += Number(data['count'] || 0);
              totalTarget += Number(data['target__c'] || 0);
            }
          });
        });

        eventsCountVisibleNode = (
          <View>
            <SingleInfo
              heading={'Skin Care Performance'}
              value={totalCount}
            />
            <CircularProgressBar
              target={totalTarget}
              value={totalCount}
            />
          </View>
        )
      }
    }

    return eventsCountVisibleNode;
  }


  render() {
    return (
      <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
        {/* {this.getSitesDataNode()}
        <Separator />
        {this.getCountersNode()}
        <Separator />
        {this.getOrderValueNode()}
        <Separator />
        {this.getVisitCountNode()}
        <Separator />
        {this.getEventsCountNode()}
        <Separator /> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.isASM,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievedTargets)
