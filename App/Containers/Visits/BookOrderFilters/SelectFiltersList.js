import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList, Dimensions} from 'react-native'
import { Button, Text, Icon, List, ListItem, Left, Right } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import VisitsActions from 'App/Stores/Visits/Actions'
import VisitCard from 'App/Containers/Visits/VisitCard'
import ProductCard from 'App/Components/ProductCard'
import VisitAction from '../VisitsDisplayScreen/VisitAction';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import SearchBar from 'App/Components/SearchBar'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions'
import { Colors } from 'App/Theme'
import Style from './SelectFiltersListStyles';

export default class SelectFiltersList extends React.Component {
	getCardNode(data) {
		const {
			selectedFilter,
			onChange
		} = this.props
		if (data.id == selectedFilter) {
			return (
				<ListItem selected={true} style={{...Style.listItem, ...Style.listItemHeader}} onPress={() => onChange(data.id)}>
	              <Left>
	                <Text style={Style.selectedListItemText}>
	                	{data.name}
	                </Text>
	              </Left>
	              <Right>
	                <GenericIcon name="arrow-forward" style={Style.selectedListItemIcon}/>
	              </Right>
	            </ListItem> 
			);	
		}else {
			return (
				<ListItem selected={false} style={{...Style.listItem}} onPress={() => onChange(data.id)}>
	              <Left>
	                <Text style={Style.listItemText}>
	                	{data.name}
	                </Text>
	              </Left>
	              <Right>
	                <GenericIcon name="arrow-forward" style={Style.listItemIcon}/>
	              </Right>
	            </ListItem> 
			);
		}
		
	}

  	render() {
	  	const {
	  		listData
	  	} = this.props;

	  	let visibleNode = [];
        visibleNode = (
            <FlatList
              data={listData}
              renderItem={({ item }) => this.getCardNode(item)}
              keyExtractor={item => item.id}
            />
        );
	   
	    return (
	    	<View style={{flex: 1}}>
		       	{visibleNode}
		    </View>
	    )
  	}
}
