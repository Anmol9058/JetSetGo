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
import GenericDisplayCard from 'App/Components/GenericDisplayCard/GenericDisplayCard'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import _ from 'lodash'
import Style from './style'

export default class ProductLevelSchemeInfo extends Component {
	getCardNode(item) {
		const {
	      data
	    } = this.props.navigation.state.params;

		return (
			<GenericDisplayCard dark={false}
              style={{ width: '88%', elevation: 0 }}
              key={item.product_name}
              heading={item.product_name}
              content={[
                <GenericDisplayCardStrip 
                	key={'Min. Qty' + data.sfid + item.product_name} 
                	label={'Min. Qty'} 
                	value={data.min_qty__c || 0} 
                />,
                <GenericDisplayCardStrip 
                	key={'Max. Qty' + data.sfid + item.product_name} 
                	label={'Max. Qty'} 
                	value={data.max_qty__c || 0} 
                />,
                <GenericDisplayCardStrip 
                	key={'Discount' + data.sfid + item.product_name} 
                	label={'Discount'} 
                	value={(data.discount__c || '') + '%'} 
                />
              ]}
            />
		);
	}


	render() {
		const {
	      data
	    } = this.props.navigation.state.params;

		let visibleNode = [];
		let products = data['product_info'] || []

		if (products && products.length) {
			visibleNode = (
				<FlatList
					data={products}
					renderItem={({ item }) => this.getCardNode(item)}
					keyExtractor={item => item.product_name}
				/>
			);
		}else {
			visibleNode = <NoDataFound text={'No Product Info Found'} />
		}

		return (
			<View style={{ flex: 1, padding: 10 }}>
				<GenericDisplayCard dark={false}
		            style={{ width: '95%', elevation: 5 }}
		            key={data.sfid}
		            heading={data.name}
		            dark={true}
		            content={[
		                <GenericDisplayCardStrip 
		                	dark={true}
		                	key={'Min. Qty' + data.sfid} 
		                	label={'Min. Qty'} 
		                	value={data.min_qty__c || 0} 
		                />,
		                <GenericDisplayCardStrip
		                	dark={true}	 
		                	key={'Max. Qty' + data.sfid} 
		                	label={'Max. Qty'} 
		                	value={data.max_qty__c || 0} 
		                />,
		                <GenericDisplayCardStrip 
		                	dark={true}
		                	key={'Discount' + data.sfid} 
		                	label={'Discount'} 
		                	value={(data.discount__c || 0) + '%'} 
		                />
		            ]}
		        />

		        <Text style={Style.heading}>{`Products: ${products.length}`}</Text>
				<View style={{ flex: 1}}>
					{visibleNode}
				</View>
			</View>
		)
	}
}
