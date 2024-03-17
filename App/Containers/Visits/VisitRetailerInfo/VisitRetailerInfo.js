import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList} from 'react-native'
import { Button, Text, Icon } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './VisitRetailerInfoStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import VisitsActions from 'App/Stores/Visits/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import VisitAction from '../VisitsDisplayScreen/VisitAction';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions'
import { Colors } from 'App/Theme'


class VisitRetailerInfo extends React.Component {
	componentDidMount() {
		this.getVisitsDisplayListCall();
		this.fetchVisitsStorageListCall();
	}

	fetchVisitsDisplayListCall() {
		const {
	  		token,
	  		agentid,
	  		searchFilters,
	  		fetchVisitsDisplayList
	  	} = this.props;

		fetchVisitsDisplayList({
			token: token,
	  		agentid: agentid,
	  		startDate: searchFilters['startDate'],
	  		endDate: searchFilters['endDate']
		});
	}

	getVisitsDisplayListCall() {
		const {
	  		token,
	  		agentid,
	  		searchFilters,
	  		getVisitsDisplayList
	  	} = this.props;

		getVisitsDisplayList({
			token: token,
	  		agentid: agentid,
	  		startDate: searchFilters['startDate'],
	  		endDate: searchFilters['endDate']
		});
	}

	fetchVisitsStorageListCall() {
		const {
	  		token,
	  		agentid,
	  		fetchVisitsStorageList
	  	} = this.props;

		fetchVisitsStorageList({
			token: token,
	  		agentid: agentid,
	  		startDate: HelperService.getPrevious7DayTimestamp(),
	  		endDate: HelperService.getNext7DayTimestamp()
		});
	}

	refresh() {
		this.fetchVisitsDisplayListCall();
		this.fetchVisitsStorageListCall();
	}

	getCardNode(data) {
		const {
			openModal,
			categoryRatingMapping
		} = this.props;

		return (
			<VisitCard 
				visitData={data.visit} 
				categoryRatingMapping={categoryRatingMapping}
				orderData={data.order} 
				onEditClick={()=> openModal({
					content: (<EditVisitCard key={data.visit.sfid} cancel={false} edit={true}  data={data.visit} />), 
					heading: 'Edit Visit'})
				}

				onCancelClick={()=> openModal({
					content: (<EditVisitCard key={data.visit.sfid} cancel={true} edit={false} data={data.visit} />), 
					heading: 'Cancel Visit'})
				}
			/>
		);
	}

  	render() {
	  	const {
	  		token,
	  		agentid,
	  		visitsDisplayList,
	 		visitsStorageList,
	 		visitsAction,
	 		fetchVisitsDisplayListLoader,
	 		searchFilters,
	 		openVisitsAction,
	 		closeVisitsAction,
	 		filteredDisplayData,
	  	} = this.props;

	  	let visibleNode = [];

	    if (filteredDisplayData && filteredDisplayData.length) {   
	        visibleNode = (
	            <FlatList
	              data={filteredDisplayData}
	              renderItem={({ item }) => this.getCardNode(item)}
	              onRefresh={() => this.fetchVisitsDisplayListCall()}
	              refreshing={fetchVisitsDisplayListLoader}
	            />
	        );
	    }else if(fetchVisitsDisplayListLoader){
	        visibleNode = <Loading />
	    }else if(filteredDisplayData && !filteredDisplayData.length && !fetchVisitsDisplayListLoader){
	        visibleNode = (
	        	<NoDataFound text={'No Visits for this date.'}>
	        		<GenericIcon 
		              name={'refresh'}
		              onPress={() => this.fetchVisitsDisplayListCall()}
		              style={{color: Colors.button, fontSize: 35, alignSelf: 'center', padding: 10}}
		            />
	        	</NoDataFound>
	        )
	    }


	    return (
	    	<View style={Style.container}>
		       	{visibleNode}
		        {visitsAction ? <VisitAction closeVisitsAction={closeVisitsAction} openVisitsAction={openVisitsAction}/> : []}
		        <TouchableHighlight 
	          		style={Style.plusIcon}
	          		onPress={() => {visitsAction ? closeVisitsAction() : openVisitsAction()}}>
		            <GenericIcon 
		              name={visitsAction ? 'remove' : 'add'}
		              style={{color: Colors.white, fontSize: 45, alignSelf: 'center'}}
		            />
	        	</TouchableHighlight>
		    </View>
	    )
  	}
}

const mapStateToProps = (state) => ({
  	token						: state.user.token,
  	agentid						: state.user.id,
  	visitsDisplayList			: state.visits.visitsDisplayList,
 	visitsStorageList			: state.visits.visitsStorageList,
 	visitsAction				: state.visits.visitsAction,
 	fetchVisitsDisplayListLoader: state.visits.fetchVisitsDisplayListLoader,
 	searchFilters				: state.visits.searchFilters,
 	filteredDisplayData			: state.visits.filteredDisplayData,
 	categoryRatingMapping		: state.common.categoryRatingMapping
});

const mapDispatchToProps = (dispatch) => ({
  fetchVisitsStorageList:(params)   => dispatch(VisitsActions.fetchVisitsStorageList(params)),
  fetchVisitsDisplayList:(params)   => dispatch(VisitsActions.fetchVisitsDisplayList(params)),
  changeSearchFilters:(params)    	=> dispatch(VisitsActions.changeSearchFilters(params)),
  openVisitsAction:()      			=> dispatch(VisitsActions.openVisitsAction()),
  closeVisitsAction:()   			=> dispatch(VisitsActions.closeVisitsAction()),
  getVisitsDisplayList:(params)     => dispatch(VisitsActions.getVisitsDisplayList(params)),
  openModal:(params)		 		=> dispatch(CommonActions.openModal(params)),
  disableModal:(params)		 		=> dispatch(CommonActions.disableModal(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitRetailerInfo)

