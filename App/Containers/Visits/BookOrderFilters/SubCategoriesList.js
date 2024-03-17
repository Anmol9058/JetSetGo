import React, { Component } from 'react'
import { View, Alert, ScrollView, TouchableHighlight, FlatList, Dimensions} from 'react-native'
import { Button, Text, Icon, List, ListItem, Left, Right, CheckBox, Body } from 'native-base';
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
import SelectionButton from 'App/Components/SelectionButton';

export default class SubCategoriesList extends React.Component {
	
		getCardNode(data) {
			const {
				selectedData,
				onDeselect,
				onSelect
			} = this.props;
			if (selectedData==(data.id)) {
				return (
					<SelectionButton 
					onPress={() =>onDeselect(data.id)}
					  title={data.name}
					  style={{backgroundColor:Colors.firozi}}
					  textStyle={{	color: Colors.white,}}
				  />
	
				);	
			}else
			
				return (
					<SelectionButton 
					onPress={() =>onSelect(data.id)}
					  title={data.name}
					  
				  />
				);
			
		}
	

  	render() {
	  	const {
	  		data,
	  		loading
	  	} = this.props;

	  	let visibleNode = [];
	  	if (data && data.length &&!loading) {
	  		visibleNode = (
	        	<FlatList
	              	data={data}
	              	renderItem={({ item }) => this.getCardNode(item)}
	              	keyExtractor={item => item.id}
            	/>
        	);
	  	}else if(loading){
	  		visibleNode = <Loading />
	  	}
	  	else if(data && !data.length && !loading) {
	  		visibleNode = <NoDataFound text={'No Brand Found.'}></NoDataFound>
	  	}

	    return (
			<View style={{backgroundColor: Colors.lightGrey,
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
				width:'100%'}}>
		       	{visibleNode}
		    </View>
	    )
  	}
}

