import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableHighlight, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import ProductActions from 'App/Stores/Products/Actions';
import { HelperService } from 'App/Services/Utils/HelperService';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import SchemeCard from './card'
import GenericDisplayCard from 'App/Components/GenericDisplayCard'

class SchemesListScreen extends Component {
	componentDidMount() {
		this.fetchCall();
	}

	fetchCall() {
		const {
			token,
			agentid,
			fetch
		} = this.props;

		fetch({
			token,
			agentid
		});
	}



	filterResults(list) {
		let searchFilters = this.props.searchFilters;
		let filteredList = HelperService.searchTextListFilter(list, 'scheme_category__c', searchFilters['type']);
		return filteredList;
	}


	handlePress(data) {
		if (data.scheme_category__c == 'Order Level'){
			NavigationService.navigate('OrderLevelSchemeInfoScreen', { data: data });
		}else if(data.scheme_category__c == 'Product Cat Level'){
			NavigationService.navigate('ProductLevelSchemeInfoScreen', { data: data });
		}
	}

	getCardNode(item) {
		return (
			<SchemeCard
				data={item}
				onPress={() => this.handlePress(item)}
			/>
		);
	}


	render() {
		const {
			loader,
			schemes,
		} = this.props;

		let visibleNode = [];

		if (schemes && schemes.length) {
			let filteredList = this.filterResults(schemes);
			if (filteredList.length) {
				visibleNode = (
					<FlatList
						data={filteredList}
						renderItem={({ item }) => this.getCardNode(item)}
						keyExtractor={item => item.sfid}
						onRefresh={() => this.fetchCall()}
						refreshing={loader}
						ListEmptyComponent={() => <NoDataFound text={'No Schemes Found'} />}
					/>
				);
			} else {
				visibleNode = <NoDataFound text={'No Schemes Found'} />
			}
		} else if (loader) {
			visibleNode = <Loading />
		} else if (schemes && !schemes.length && !loader) {
			visibleNode = <NoDataFound text={'No Schemes Found'} />
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
	schemes: state.products.schemes,
	limit: state.orders.ordersLimit,
	offset: state.orders.ordersOffset,
	loader: state.products.fetchSchemesLoader,
	retailersList: state.retailers.retailersList,
	dealersList: state.retailers.dealersList,
	isASM: state.user.isASM,
	psmList: state.user.psmList,
	searchFilters: state.products.schemesSearchFilters,
});

const mapDispatchToProps = (dispatch) => ({
	fetch:(params) => dispatch(ProductActions.fetchSchemes(params))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchemesListScreen);
