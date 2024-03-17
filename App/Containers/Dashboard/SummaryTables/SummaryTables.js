import React, { Component } from 'react'
import { View, Alert, ScrollView} from 'react-native'
import { Button, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './SummaryTablesStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import { START, ABSENT, GOOD, MORNING} from 'App/Constants';
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import UserActions from 'App/Stores/User/Actions'
import SingleInfo from 'App/Components/SingleInfo';
import Separator from 'App/Components/Separator';
import DashboardHeading from 'App/Components/DashboardHeading';
import Table from 'App/Components/Table';
import CircularProgressBar from 'App/Components/CircularProgressBar';
import { Colors, ApplicationStyles, Fonts, Metrics } from 'App/Theme'
import DashboardActions from 'App/Stores/Dashboard/Actions'
import NoDataFound from 'App/Components/NoDataFound'
import Loading from 'App/Components/Loading'
import _ from 'lodash';


class SummaryTables extends React.Component {
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

  	getTableHead() {
  		const {
		  isASM,
	    } = this.props;

	    return (isASM ? ['SO', 'Target', 'Achieved', 'Month'] : ['Target', 'Achieved', 'Month'])
  	}

	getSitesVisitedData() {
	    const {
	      isASM,
	      data,
	      psmList,
	      loaders
	    } = this.props

	    const {
	      siteCount
	    } = data;

	    const {
	      siteCountLoader
	    } = loaders;


		let tableHead = this.getTableHead();
		let tableData = [];
		let filteredData = this.filteredData(siteCount);

		if (_.isEmpty(filteredData)) {
			tableData = [];
		}else {
			_.map(filteredData, (value, key) => {
				const rowData = [];
	          	value.map((data) => {
	          		isASM ? rowData.push(HelperService.findMatchingKeyValueInList(psmList, 'id', key, 'name')) : '';
	          		rowData.push(Number(data['target__c'] || 0));
	          		rowData.push(Number(data['count'] || 0));
	          		rowData.push(HelperService.getMonthMappingName(Number(data['month'] || 1) - 1));
	          	});
	          	tableData.push(rowData);
        	});
		}
		return {
			tableHead,
			tableData
		}
	}

	getCountersData() {
		const {
		  isASM,
	      data,
	      psmList,
	      loaders
	    } = this.props

	    const {
	      counters
	    } = data;

	    const {
	      countersLoader
	    } = loaders;


		let tableHead = this.getTableHead();
		let tableData = [];
		let filteredData = this.filteredData(counters);

		if (_.isEmpty(filteredData)) {
			tableData = [];
		}else {
			_.map(filteredData, (value, key) => {
				const rowData = [];
	          	value.map((data) => {
	          		isASM ? rowData.push(HelperService.findMatchingKeyValueInList(psmList, 'id', key, 'name')) : '';
	          		rowData.push(Number(data['target__c'] || 0));
	          		rowData.push(Number(data['count'] || 0));
	          		rowData.push(HelperService.getMonthMappingName(Number(data['month'] || 1) - 1));
	          	});
	          	tableData.push(rowData);
        	});
		}
		return {
			tableHead,
			tableData
		}
	}

	getOrdersData() {
		const {
		  isASM,
	      data,
	      psmList,
	      loaders
	    } = this.props

	    const {
	      orderValue
	    } = data;

	    const {
	      orderValueLoader
	    } = loaders;


		let tableHead = this.getTableHead();
		let tableData = [];
		let filteredData = this.filteredData(orderValue);

		if (_.isEmpty(filteredData)) {
			tableData = [];
		}else {
			_.map(filteredData, (value, key) => {
				const rowData = [];
	          	value.map((data) => {
	          		isASM ? rowData.push(HelperService.findMatchingKeyValueInList(psmList, 'id', key, 'name')) : '';
	          		rowData.push(Number(data['target__c'] || 0));
	          		rowData.push(HelperService.FixedDecimalValue(Number(data['count'] || 0)));
	          		rowData.push(HelperService.getMonthMappingName(Number(data['month'] || 1) - 1));
	          	});
	          	tableData.push(rowData);
        	});
		}
		return {
			tableHead,
			tableData
		}
	}

	getVisitsData() {
		const {
	      isASM,
	      data,
	      psmList,
	      loaders
	    } = this.props

	    const {
	      visitCount
	    } = data;

	    const {
	      visitCountLoader
	    } = loaders;


		let tableHead = this.getTableHead();
		let tableData = [];
		let filteredData = this.filteredData(visitCount);

		if (_.isEmpty(filteredData)) {
			tableData = [];
		}else {
			_.map(filteredData, (value, key) => {
				const rowData = [];
	          	value.map((data) => {
	          		isASM ? rowData.push(HelperService.findMatchingKeyValueInList(psmList, 'id', key, 'name')) : '';
	          		rowData.push(Number(data['target__c'] || 0));
	          		rowData.push(Number(data['count'] || 0));
	          		rowData.push(HelperService.getMonthMappingName(Number(data['month'] || 1) - 1));
	          	});
	          	tableData.push(rowData);
        	});
		}
		return {
			tableHead,
			tableData
		}
	}

	getEventsData() {
		const {
		  isASM,
	      data,
	      psmList,
	      loaders
	    } = this.props

	    const {
	      eventsCount
	    } = data;

	    const {
	      eventsCountLoader
	    } = loaders;


		let tableHead = this.getTableHead();
		let tableData = [];
		let filteredData = this.filteredData(eventsCount);

		if (_.isEmpty(filteredData)) {
			tableData = [];
		}else {
			_.map(filteredData, (value, key) => {
				const rowData = [];
	          	value.map((data) => {
	          		isASM ? rowData.push(HelperService.findMatchingKeyValueInList(psmList, 'id', key, 'name')) : '';
	          		rowData.push(Number(data['target__c'] || 0));
	          		rowData.push(Number(data['count'] || 0));
	          		rowData.push(HelperService.getMonthMappingName(Number(data['month'] || 1) - 1));
	          	});
	          	tableData.push(rowData);
        	});
		}
		return {
			tableHead,
			tableData
		}
	}


  	render() {
  		let sitesData 	 = this.getSitesVisitedData();
  		let countersData = this.getCountersData();
  		let ordersData	 = this.getOrdersData();
  		let visitsData	 = this.getVisitsData();
  		let eventsData	 = this.getEventsData();

    	return (
    		<View style={{paddingHorizontal: 15, paddingVertical: 15}}>
		    	{/* <SingleInfo heading={'Order Value'} value={'None'} />
			       <Table tableHead={ordersData.tableHead} tableData={ordersData.tableData} />
			   	<Separator />

			    <SingleInfo heading={'New Counters'} value={'None'} />
			      <Table tableHead={countersData.tableHead} tableData={countersData.tableData} />
			   	<Separator />

			   	<SingleInfo heading={'Leads'} value={'None'} />
			      <Table tableHead={sitesData.tableHead} tableData={sitesData.tableData} />
			   	<Separator />

			   	<SingleInfo heading={'Visits'} value={'None'} />
			       <Table tableHead={visitsData.tableHead} tableData={visitsData.tableData} />
			   	<Separator />

			   	<SingleInfo heading={'Events'} value={'None'} />
			       <Table tableHead={eventsData.tableHead} tableData={eventsData.tableData} />
			   	<Separator /> */}
       		</View>
    	) 
  	}
}


const mapStateToProps = (state) => ({
    token            : state.user.token,
    agentid          : state.user.id,
    isASM            : state.user.isASM,
    psmList          : state.user.psmList.concat([{id: '', name: 'All'}]),
    searchFilters    : state.dashboard.searchFilters,
    data             : state.dashboard.data,
    loaders          : state.dashboard.loaders
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters:(params) => dispatch(DashboardActions.changeSearchFilters(params)),
  getOrderValue:(params)       => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount:(params)       => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount:(params)        => dispatch(DashboardActions.getSiteCount(params)),
  getCounters:(params)         => dispatch(DashboardActions.getCounters(params)),
  getEventCount:(params)       => dispatch(DashboardActions.getEventCount(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryTables)
