import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableHighlight, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import OrdersActions from 'App/Stores/Orders/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import OrderCard from 'App/Components/OrderCard'
import GenericDisplayCard from 'App/Components/GenericDisplayCard'

class OrdersListScreen extends Component {
	componentDidMount() {
		const {
			orders,
		} = this.props;

		if (orders && orders.length) {
		} else {
			this.fetchOrdersCall();
		}
	}

	getRetailerName(id) {
		const {
			retailersList,
		} = this.props;

		let name = '';

		if (retailersList && retailersList.length) {
			retailersList.map((obj) => {
				if (obj.seller.sfid == id) {
					name = obj.seller.name
				}
			});
		}

		return name;
	}

	getDealerName(id) {
		const {
			dealersList,
		} = this.props;

		let name = '';

		if (dealersList && dealersList.length) {
			dealersList.map((obj) => {
				if (obj.seller.sfid == id) {
					name = obj.seller.name
				}
			});
		}

		return name;
	}

	fetchOrdersCall() {
		const {
			token,
			agentid,
			offset,
			limit,
			fetchOrders
		} = this.props;

		fetchOrders({
			token,
			agentid,
			offset,
			limit,
			type: 'Retailer'
		});
	}



	filterResults(list) {
		return list;
	}

	onSelectRetailer(params) {
		// NavigationService.navigate('RetailerInfoScreen', params);
		// this.props.selectRetailer(params);
	}

	handlePress(item) {
		NavigationService.navigate('OrderInfoScreen', { id: item.pg_id__c, data: item });
	}

	getCardNode(item) {
		const {
			name,
			sfid,
			dealer__c,
			retailer__c,
			order_date__c,
			order_value__c,
			psm_name__c,
			asm_name__c,
			total_tax__c
		} = item


		const {
			token,
			agentid,
			repeatOrder,
			repeatOrderLoader
		} =  this.props;

		let customerName = '';
		let retailer_order = false;
		let dealer_order = false;
		if (retailer__c) {
			customerName = this.getRetailerName(retailer__c) || this.getDealerName(retailer__c)
			retailer_order = true;
		}else if(dealer__c) {
			customerName = this.getRetailerName(dealer__c) || this.getDealerName(dealer__c)
			dealer_order = true
		}


		return (
			<OrderCard
				customerName={customerName}
				retailerOrder={retailer_order} 
				dealerOrder={dealer_order} 
				psm={psm_name__c}
				asm={asm_name__c}
				orderDate={order_date__c}
				orderValue={order_value__c}
				orderNumber={name}
				totalTax={total_tax__c}
				onPress={() => this.handlePress(item)}
				showReorder={true}
				repeatOrderLoading={repeatOrderLoader == sfid}
				onClickRepeatOrder={() => repeatOrder({order__c: sfid, order_date__c: Date.now(), token, agentid, data: item})}
			/>
		);
	}


	render() {
		const {
			loader,
			orders,
		} = this.props;

		let visibleNode = [];

		if (orders && orders.length) {
			let filteredList = this.filterResults(orders);
			if (filteredList.length) {
				visibleNode = (
					<FlatList
						data={filteredList}
						renderItem={({ item }) => this.getCardNode(item)}
						keyExtractor={item => (item.sfid + item.name)}
						onRefresh={() => this.fetchOrdersCall()}
						refreshing={loader}
						ListEmptyComponent={() => <NoDataFound text={'No Orders Found'} />}
					/>
				);
			} else {
				visibleNode = <NoDataFound text={'No Orders Found'} />
			}
		} else if (loader) {
			visibleNode = <Loading />
		} else if (orders && !orders.length && !loader) {
			visibleNode = <NoDataFound text={'No Orders Found'} />
		}

		return (
			<View style={{ flex: 1, padding: 10 }}>
				<View>
					{visibleNode}
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	agentid: state.user.id,
	token: state.user.token,
	orders: state.orders.allOrders,
	limit: state.orders.ordersLimit,
	offset: state.orders.ordersOffset,
	loader: state.orders.fetchAllOrdersLoader,
	retailersList: state.retailers.retailersList,
	dealersList: state.retailers.dealersList,
	repeatOrderLoader: state.orders.repeatOrderLoader,
	isASM: state.user.isASM,
	psmList: state.user.psmList
});

const mapDispatchToProps = (dispatch) => ({
	fetchOrders: (params) => dispatch(OrdersActions.fetchAllOrders(params)),
	selectOrder: (params) => dispatch(OrdersActions.selectOrder(params)),
	repeatOrder: (params) => dispatch(OrdersActions.repeatOrder(params))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OrdersListScreen)
