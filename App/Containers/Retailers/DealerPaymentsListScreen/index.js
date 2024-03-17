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

class DealerPaymentsListScreen extends Component {
	componentDidMount() {
		this.getPayments();
	}

	getPayments() {
		const {
			selectedRetailer, 
			offset, 
			limit,
			fetchDealerPayments,
			agentid,
			token
		} = this.props

		let seller_id = selectedRetailer.id;
		let type      = selectedRetailer.type;

		fetchDealerPayments({
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


	getCardNode(item, index) {
		return (
			<GenericDisplayCard
				key={index + item.date_of_payment__c}
          		content={[
          			<GenericDisplayCardStrip key={'Date of payment ' + index + item.date_of_payment__c} label={'Date of payment '} value={HelperService.removeTimestringFromDate(item.date_of_payment__c)}/>,
                	<GenericDisplayCardStrip key={'Mode of payment' + index+ item.date_of_payment__c} label={'Mode of payment'} value={item.payment_mode__c}/>,
                  	<GenericDisplayCardStrip key={'Payment reference' + index+ item.date_of_payment__c} label={'Payment reference' } value={item.payement_reference__c}/>,
                  	<GenericDisplayCardStrip key={'Amount' +index+ item.date_of_payment__c} label={'Amount'} value={HelperService.currencyValue(item.amount__c)}/>
          		]} 
	            dark={false} 
	            onPress={() => {}}
	        />
		);
	}

  	render() {
  		const {
  			loader, 
  			dealerPayments,
  			selectedRetailer
  		} = this.props;

	    let data = selectedRetailer.data;
	    let id   = selectedRetailer.id;
		let type = selectedRetailer.type;
		let visibleNode = [];
	    let orders =[];

	    _.map(dealerPayments, (value, key) => {
	    	if (key == id) {
	    		orders = dealerPayments[key];
	    	}
	    });
	    
	    if (orders && orders.length) {
	        visibleNode = (
	          	<FlatList
	            	data={orders}
	            	renderItem={({ item, index }) => this.getCardNode(item, index)}
	            	keyExtractor={item => item.name}
	            	onRefresh={() => this.getPayments()}
            		refreshing={loader}
	           	/>
	        );
	    }else if (loader){
	        visibleNode = <Loading />
	    }else if(orders && !orders.length && !loader){
        	visibleNode = <NoDataFound text={'No Payments.'}/>
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
  dealerPayments: state.retailers.dealerPayments,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  loader: state.retailers.fetchDealerPaymentsLoader,
  offset: state.retailers.retailerOrdersOffset,
  limit: state.retailers.retailerOrdersLimit,
  selectedRetailer: state.retailers.selectedRetailer,
});

const mapDispatchToProps = (dispatch) => ({
  updateRetailerLocation:(params)   => dispatch(RetailersActions.updateRetailerLocation(params)),
  fetchDealerPayments:(params)   => dispatch(RetailersActions.fetchDealerPayments(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerPaymentsListScreen)

