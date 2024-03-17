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

class DealerOutstandingListScreen extends Component {
	componentDidMount() {
		this.getOrders();
	}

	getOrders() {
		const {
			selectedRetailer, 
			retailerOrdersOffset, 
			retailerOrdersLimit,
			agentid,
			token
		} = this.props

		let id   = selectedRetailer.id;
		let type = selectedRetailer.type;

		this.props.fetchRetailerOrders({
			agentid: agentid, 
			token: token, 
			offset: retailerOrdersOffset, 
			limit: retailerOrdersLimit,
			seller_id: id,
			type: (type == 'Retailers') ? 'Retailer' : type
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

	handleOrderPress(item) {
		NavigationService.navigate('OrderInfoScreen', {id: item.pg_id__c, data: item});
	}

	getCardNode(item) {
		return (
			<OrderCard 
				data={item} 
				customerName={''} 
				orderDate={item.order_date__c} 
				orderValue={item.order_value__c} 
				orderNumber={item.name}
	            dark={false} 
	            onPress={() => this.handleOrderPress(item)}
	        />
		);
	}

  	render() {
  		const {
  			fetchRetailerOrdersLoader, 
  			selectedRetailer, 
  			retailerOrders
  		} = this.props;

	    let data = selectedRetailer.data;
	    let id   = selectedRetailer.id;
		let type = selectedRetailer.type;

	    let orders =[];

	    _.map(retailerOrders, (value, key) => {
	    	if (key == id) {
	    		orders = retailerOrders[key];
	    	}
	    });

	    let visibleNode = [];

	    if (orders && orders.length) {
	        visibleNode = (
	          	<FlatList
	            	data={orders}
	            	renderItem={({ item }) => this.getCardNode(item)}
	            	keyExtractor={item => item.name}
	            	onRefresh={() => this.getOrders()}
            		refreshing={fetchRetailerOrdersLoader}
	           	/>
	        );
	    }else if (fetchRetailerOrdersLoader){
	        visibleNode = <Loading />
	    }else if(orders && !orders.length && !fetchRetailerOrdersLoader){
        	visibleNode = <NoDataFound text={'No Orders Found'}/>
      	}

	    return (
		      	<View style={{flex: 1}}>
		        	{visibleNode}
		      	</View>
	    )
  	}
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  retailerOrders: state.retailers.retailerOrders,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  fetchRetailerOrdersLoader: state.retailers.fetchRetailerOrdersLoader,
  retailerOrdersOffset: state.retailers.retailerOrdersOffset,
  retailerOrdersLimit: state.retailers.retailerOrdersLimit,
  selectedRetailer: state.retailers.selectedRetailer,
});

const mapDispatchToProps = (dispatch) => ({
  updateRetailerLocation:(params)   => dispatch(RetailersActions.updateRetailerLocation(params)),
  fetchRetailerOrders:(params) 		=> dispatch(RetailersActions.fetchRetailerOrders(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerOutstandingListScreen)

