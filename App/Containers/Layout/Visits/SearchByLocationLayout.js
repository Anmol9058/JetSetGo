import React from 'react'
import { Platform, View, ActivityIndicator, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right} from 'native-base';
import NavigationService from 'App/Services/NavigationService'
import WhiteButton from 'App/Components/WhiteButton'
import BackArrowButton from 'App/Components/BackArrowButton'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import {Colors } from 'App/Theme'


class SearchByLocationLayout extends React.Component {
  	render() {
	    return ( 
	    	<View>
	    		<Header style={Styles.header}>
	            	<Left>
	            		<BackArrowButton />
	            	</Left>
	            	<Body>
	            		<Title></Title>
	          		</Body>
	          		<Right>
			            <Button transparent>
			              <Text></Text>
			            </Button>
	          		</Right>
	         	</Header>
	    		{this.props.children}
	    	</View>
	    )
  	}
}



const mapStateToProps = (state) => ({
  agentAreas: [{id: '', name: 'All'}].concat(state.user.agentAreas)
})

export default connect(
  mapStateToProps
)(SearchByLocationLayout)

const Styles = StyleSheet.create({
  header:{
      backgroundColor: Colors.white, 
      borderBottomWidth: 0
  }
});
