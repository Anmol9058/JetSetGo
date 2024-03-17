import React from 'react'
import { connect } from 'react-redux'
import {View, StyleSheet } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right} from 'native-base';
import NavigationService from 'App/Services/NavigationService'
import BackArrowButton from 'App/Components/BackArrowButton'
import {Colors, ApplicationStyles } from 'App/Theme'


class SelectedPlannedVisitsLayout extends React.Component {
  render() {
    return ( 
    	<View>
    		<Header style={Styles.header}>
            		
            	<Body style={Styles.headerBody}>
            	<View  style={{alignSelf: 'flex-start'}}>
            	<BackArrowButton />
            	</View>
            	<View style={{alignSelf: 'center',}}>
	            <Title style={{alignSelf: 'flex-end', fontFamily: ApplicationStyles.textMsgFont, fontSize: 20, color: Colors.button, marginLeft: 30, fontWeight:'bold'}}>
	            	{(this.props.selectedPlannedVisits && this.props.selectedPlannedVisits.length ? 'Planned Visits: ' + (this.props.selectedPlannedVisits.length) : [])}
	            </Title>
	            </View>
          </Body>
         
         	</Header>
    		{this.props.children}
    	</View>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedPlannedVisits		: state.visits.planVisit.selectedPlannedVisits
});

const mapDispatchToProps = (dispatch) => ({
	changePlannedSelectedDate:(params) 			  => dispatch(VisitsActions.changePlannedSelectedDate(params)),
	changeAddPlannedVisitsSearchFilters: (params) => dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedPlannedVisitsLayout)


const Styles = StyleSheet.create({
  header:{
      backgroundColor: Colors.white, 
      borderBottomWidth: 0,
      alignItems: 'center',
      justifyContent: 'center'
  },
  headerBody: {
  	alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%'
  }
});
