import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import InvoiceCard from 'App/Components/InvoiceCard'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import _ from 'lodash';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import NavigationService from 'App/Services/NavigationService'

class DealerInvoiceListScreen extends Component {
	componentDidMount() {
		this.getInvoice();
	}

	getInvoice() {
		const {
			selectedRetailer,
			offset,
			limit,
			fetchDealerInvoice,
			agentid,
			token
		} = this.props

		let seller_id = selectedRetailer.id;
		let type = selectedRetailer.type;

		fetchDealerInvoice({
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
			if (obj.seller.sfid == id) {
				customerName = obj.seller.name
			}
		});
		return customerName;
	}

	handleInvoicePress(item) {
		NavigationService.navigate('InvoiceInfoScreen', { id: item.sfid, data: item });
	}

	getCardNode(item) {
		return (
			<InvoiceCard
				data={item}
				customerName={'Invoice No. ' + item.name}
				orderDate={item.invoice_date__c}
				orderValue={item.invoice_amount__c}
				orderNumber={item.lr_no__c}
				dark={false}
				onPress={() => this.handleInvoicePress(item)}
			/>
		);
	}

	render() {
		const {
			loader,
			dealerInvoice,
			selectedRetailer
		} = this.props;

		let data = selectedRetailer.data;
		let id = selectedRetailer.id;
		let type = selectedRetailer.type;
		let visibleNode = [];
		let orders = [];

		_.map(dealerInvoice, (value, key) => {
			if (key == id) {
				orders = dealerInvoice[key];
			}
		});

		if (orders && orders.length) {
			visibleNode = (
				<FlatList
					data={orders}
					renderItem={({ item }) => this.getCardNode(item)}
					keyExtractor={item => item.name}
					onRefresh={() => this.getInvoice()}
					refreshing={loader}
				/>
			);
		} else if (loader) {
			visibleNode = <Loading />
		} else if (orders && !orders.length && !loader) {
			visibleNode = <NoDataFound text={'No Invoice Found'} />
		}

		return (
			<View style={{ flex: 1 }}>
				{visibleNode}
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	token: state.user.token,
	agentid: state.user.id,
	dealerInvoice: state.retailers.dealerInvoice,
	retailersList: state.retailers.retailersList,
	dealersList: state.retailers.dealersList,
	loader: state.retailers.fetchDealerInvoiceLoader,
	offset: state.retailers.retailerOrdersOffset,
	limit: state.retailers.retailerOrdersLimit,
	selectedRetailer: state.retailers.selectedRetailer,
});

const mapDispatchToProps = (dispatch) => ({
	updateRetailerLocation: (params) => dispatch(RetailersActions.updateRetailerLocation(params)),
	fetchDealerInvoice: (params) => dispatch(RetailersActions.fetchDealerInvoice(params))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DealerInvoiceListScreen)