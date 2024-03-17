import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import OrderCard from 'App/Components/OrderCard'
import RetailersActions from 'App/Stores/Retailers/Actions'
import {HelperService} from 'App/Services/Utils/HelperService';
import _ from 'lodash';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import NavigationService from 'App/Services/NavigationService'
import GenericDisplayCard from 'App/Components/GenericDisplayCard'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'

class DealerOutstandingListScreen extends Component {
	componentDidMount() {
		this.getOutstanding();
	}

	getOutstanding() {
		const {
			selectedRetailer, 
			offset, 
			limit,
			fetchDealerOutstanding,
			agentid,
			token
		} = this.props

		let seller_id = selectedRetailer.id;
		let type      = selectedRetailer.type;

		fetchDealerOutstanding({
			agentid, 
			token, 
			offset, 
			limit,
			seller_id,
			type
		});
	}

	getCustomerName(id) {
		const {
			selectedRetailer, 
			retailersList, 
			dealersList
		} = this.props

		let type = selectedRetailer.type;
		let list = (type == 'Retailers') ? retailersList : dealersList; 
		let customerName = '';
	    list.map((obj) => {
	    	if(obj.seller.sfid == id) {
	    		customerName = obj.seller.name
	    	}
	    });
	    return customerName;
	}

	getCardNode(item) {
		return (
			<GenericDisplayCard
				key={item.sfid}
          		content={[
          			<GenericDisplayCardStrip key={'0-30 Days' + item.sfid} label={'0-30 days'} value={HelperService.currencyValue(item.x0_30_days__c) || 'None'}/>,
                	<GenericDisplayCardStrip key={'30-60 Days' + item.sfid} label={'30-60 days'} value={HelperService.currencyValue(item.x30_60_days__c) || 'None'}/>,
                  	<GenericDisplayCardStrip key={'60-90 Days' + item.sfid} label={'60-90 days' } value={HelperService.currencyValue(item.x60_90_days__c) || 'None'}/>,
                  	<GenericDisplayCardStrip key={'More Than 90 Days' + item.sfid} label={'More Than 90 days'} value={item.x90_days__c || 'None'}/>,
                  	<GenericDisplayCardStrip key={'Total Outstanding' + item.sfid} label={'Total Outstanding'} value={HelperService.currencyValue(item.total_outstanding)}/>,
          		]} 
	            dark={false} 
	            onPress={() => {}}
	        />
		);
	}

  	render() {
  		const {
  			loader, 
  			dealerOutstanding,
  			selectedRetailer
  		} = this.props;

	    let data = selectedRetailer.data;
	    let id   = selectedRetailer.id;
		let type = selectedRetailer.type;
		let visibleNode = [];
	    let orders =[];

	    _.map(dealerOutstanding, (value, key) => {
	    	if (key == id) {
	    		orders = dealerOutstanding[key];
	    	}
	    });
	    
	    if (orders && orders.length) {
	        visibleNode = (
	          	<FlatList
	            	data={orders}
	            	renderItem={({ item }) => this.getCardNode(item)}
	            	keyExtractor={item => item.name}
	            	onRefresh={() => this.getOutstanding()}
            		refreshing={loader}
	           	/>
	        );
	    }else if (loader){
	        visibleNode = <Loading />
	    }else if(orders && !orders.length && !loader){
        	visibleNode = <NoDataFound text={'No Outstanding.'}/>
      	}

	    return (
	      	<View style={{flex: 1}}>
	        	{visibleNode}
	      	</View>
	    );
  	}
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  dealerOutstanding: state.retailers.dealerOutstanding,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  loader: state.retailers.fetchDealerOutstandingLoader,
  offset: state.retailers.retailerOrdersOffset,
  limit: state.retailers.retailerOrdersLimit,
  selectedRetailer: state.retailers.selectedRetailer,
});

const mapDispatchToProps = (dispatch) => ({
  updateRetailerLocation:(params)   => dispatch(RetailersActions.updateRetailerLocation(params)),
  fetchDealerOutstanding:(params)   => dispatch(RetailersActions.fetchDealerOutstanding(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerOutstandingListScreen)

