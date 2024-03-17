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



export default class SubSubCategoriesList extends React.Component {
	getCardNode(data) {
		const {
			selectedData,
			onDeselect,
			onSelect,
			onSubmit,
		} = this.props;
		if (selectedData.sfid==(data.sfid)) {
			return (
				<SelectionButton 
				onPress={() =>onDeselect(data.sfid)}
				  title={`GSM ${data.gsm}`}
				  style={{backgroundColor:Colors.firozi}}
				  textStyle={{	color: Colors.white,}}
			  />

			);	
		}else
		return (
			
			<SelectionButton 
			onPress={() =>onSelect(data)}
			title={`GSM ${data.gsm}`}
			  
		  />
		);
	}

  	render() {
	  	const {
	  		data,
	  		loading
	  	} = this.props;

	  	let visibleNode = [];
	  	if (data && data.length&&!loading) {
	  		visibleNode = (
	        	<FlatList
	              	data={data}
	              	renderItem={({ item }) => this.getCardNode(item)}
	              	keyExtractor={item => item.sfid}
            	/>
        	);
	  	}else if(loading){
	  		visibleNode = <Loading />
	  	}
	  	else if(data && !data.length && !loading) {
	  		visibleNode = <NoDataFound text={'No GSM Found.'}></NoDataFound>
	  	}

	    return (
	    	<View style={{flex: 1}}>
		       	{visibleNode}
				  
		    </View>
	    )
  	}
}

