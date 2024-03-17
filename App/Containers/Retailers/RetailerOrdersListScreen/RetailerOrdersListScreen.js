import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import OrderCard from 'App/Components/OrderCard';
import NavigationService from 'App/Services/NavigationService';
import RetailersActions from 'App/Stores/Retailers/Actions';
import _ from 'lodash';
import { Header, Icon, Text } from 'native-base';
import Styles from  './RetailerOrdersListScreenStyle'
import React, { Component } from 'react';
import { FlatList, View ,StyleSheet,TouchableOpacity,} from 'react-native';
import { connect } from 'react-redux';
import OrdersActions from 'App/Stores/Orders/Actions'
import GenericIcon from 'App/Components/GenericIcon'
import {ApplicationStyles,Colors} from 'App/Theme'
import { HelperService } from 'App/Services/Utils/HelperService';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class RetailerOrdersListScreen extends Component {
	componentDidMount() {
		//this.getOrders();
		
	}

	getOrders() {
		const {
			selectedRetailer,
			retailerOrdersOffset,
			retailerOrdersLimit,
			agentid,
			token
		} = this.props

		let id = selectedRetailer.id;
	//	let type = selectedRetailer.type;

		this.props.fetchRetailerOrders({
			agentid: agentid,
			token: token,
			offset: retailerOrdersOffset,
			limit: retailerOrdersLimit,
			seller_id: id,
		//	type: (type == 'Retailers') ? 'Retailer' : type
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

	handleOrderPress(item) {
	
		NavigationService.navigate('OrderInfoScreen', { id: item.pg_id__c, data: item });
		
	}

	getCardNode(item) {
		const {
			token,
			agentid,
			repeatOrder,
			repeatOrderLoader
		} =  this.props;

		return (
			<OrderCard
				data={item}
				customerName={item.name}
				orderDate={item.order_date__c}
				orderValue={item.order_value__c || ' '}
				orderNumber={''}
				totalTax={item.total_tax__c}
				dark={false}
				onPress={() => this.handleOrderPress(item)}
				showReorder={true}
				repeatOrderLoading={repeatOrderLoader == item.sfid}
				onClickRepeatOrder={() => repeatOrder({order__c: item.sfid, order_date__c: Date.now(), token, agentid, data: item})}
			/>
		);
	}
	onMonthChange(month) {

        const {
            changeSearchFilters,
            updateMonthNumber
        } = this.props;

        changeSearchFilters({
            edited_field: 'selectedMonth',
            edited_value: month
        });

        //updateMonthNumber(HelperService.getMonthMappingName(month));

	}
	getdataNode()
	{
		const {
			loader,
			selectedRetailer,
			data
		} = this.props;

		//let data = selectedRetailer.data;
		let id = selectedRetailer.id;
		//let type = selectedRetailer.type;

		let orders = [];

		_.map(data, (value, key) => {
			if (key == id) {
				orders = data[key];
			}
		});

		

		let visibleNode = [];

		if (orders && orders.length) {
			visibleNode = (
				<FlatList
					data={orders}
					renderItem={({ item }) => this.getCardNode(item)}
					keyExtractor={item => (item.sfid + item.name)}
					onRefresh={() => this.getOrders()}
					refreshing={loader}
				/>
			);
		} else if (loader) {
			visibleNode = <Loading />
		} else if (orders && !orders.length && !loader) {
			visibleNode =  <NoDataFound text={'No Orders Found'}>
			
		  </NoDataFound>
		}

		return visibleNode;

	}


	render() {

		const {
            searchFilters,
           data,
            loader,
         
        } = this.props;

        let monthPickerNode = (
            <View
                style={Styles.monthPicker}>
                <Text style={Styles.dateText}>{HelperService.getMonthMappingName(searchFilters['selectedMonth'])}
                </Text>
            </View>
        );

        let visiblePickerNode = [];

        visiblePickerNode = (<View style={{ flexDirection: 'row', width: wp('100%') }}>
            {monthPickerNode}
		    <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getPreviousMonth(searchFilters['selectedMonth']))}>
                <Icon
                    name={'ios-arrow-back'}
                    ios={'ios-arrow-back'}
                    android={'md-arrow-dropleft'}
                    style={Styles.dateChangeIcon}
                />
            </TouchableOpacity>
           
            <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getNextMonth(searchFilters['selectedMonth']))}>
                <Icon
                    name={'ios-arrow-forward'}
                    ios={'ios-arrow-forward'}
                    android={'md-arrow-dropright'}

                    style={Styles.dateChangeIcon}
                />
            </TouchableOpacity>
        </View>);
		

		return (
			<View style={{paddingHorizontal: 15, paddingVertical: 15}}>
			{this.getdataNode()}
				
			
			
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	token: state.user.token,
	agentid: state.user.id,
    data: state.retailers.retailerOrders,
	retailersList: state.retailers.retailersList,
	dealersList: state.retailers.dealersList,
	loader: state.retailers.fetchRetailerOrdersLoader,
	retailerOrdersOffset: state.retailers.retailerOrdersOffset,
	retailerOrdersLimit: state.retailers.retailerOrdersLimit,
	selectedRetailer: state.retailers.selectedRetailer,
	repeatOrderLoader: state.orders.repeatOrderLoader,
	searchFilters: state.retailers.retailerSearchFilters,
});

const mapDispatchToProps = (dispatch) => ({
	updateRetailerLocation: (params) => dispatch(RetailersActions.updateRetailerLocation(params)),
	fetchRetailerOrders: (params) => dispatch(RetailersActions.fetchRetailerOrders(params)),
	repeatOrder: (params) => dispatch(OrdersActions.repeatOrder(params)),
	changeSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
	fetchOrderDetails: (params) => dispatch(OrdersActions.fetchOrderDetails(params)),
	clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RetailerOrdersListScreen)

