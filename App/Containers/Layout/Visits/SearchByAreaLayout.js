import React from 'react'
import {View, StyleSheet, Dimensions } from 'react-native'
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
import VisitsActions from 'App/Stores/Visits/Actions'
import SearchBar from 'App/Components/SearchBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class SearchByAreaLayout extends React.Component {
  	render() {
  		const {
  			agentAreas,
  			searchByAreaFilters,
			  children,
			  agentCity,
			  changeSearchByAreaFilters,
			 
			  user_details
  		} = this.props;

	    return ( 
	    	<View>
	    		<Header transparent style={Styles.header}>
				<View style={{paddingTop: hp('0.5%'), paddingBottom: hp('1%')}}>
       <BackArrowButton />
       </View>
	    		
	    			<SearchBar
				            placeholder={`Search Name`}
				            onInputChange={(text) => changeSearchByAreaFilters({ edited_field: 'name', 'edited_value': text })}
				            onInputSubmit={(text) => changeSearchByAreaFilters({ edited_field: 'name', 'edited_value': text })}
				            onInputClear={(text) =>  changeSearchByAreaFilters({ edited_field: 'name', 'edited_value': '' })}
				            value={searchByAreaFilters['searchValue']}
				            ContainerStyles={Styles.searchContainer}
				          />

		                <SearchableDropdown 
		                  dataSource={user_details.business_channel__c == 'Wholesale' ? searchByAreaFilters['party_type']=='Wholesaler'?agentAreas: this.props.cityAllList: searchByAreaFilters['party_type']=='Retailer'? agentCity :agentAreas} 
		                  placeHolderText={'Select By Area'} 
		                  selectedValue={searchByAreaFilters['area']} 
		                  onChange={(areaCode) => changeSearchByAreaFilters({edited_field: 'area', edited_value: areaCode})} 
		                  placeholder={'Type or Select Area'} 
		                  invalid={false}
		                  customPickerStyles={Styles.pickerStyles} 
		                />
		              

		               
	         	</Header>
	    		{children}
	    	</View>
	    )
  	}
}


const mapStateToProps = (state) => ({
  agentAreas: [{id: '', name: 'All'}].concat(state.user.agentAreas),
  searchByAreaFilters: state.visits.unplannedVisit.searchByAreaFilters,
  agentCity: [{ id: '', name: 'All' }].concat(state.user.agentCity),
  cityAllList : [{ id: '', name: 'All' }].concat(state.common.cityAllList),
	user_details: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
	changeSearchByAreaFilters:(params) => dispatch(VisitsActions.changeSearchByAreaFilters(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchByAreaLayout)

const Styles = StyleSheet.create({
	header: {
		height: Platform.OS === 'ios' ?hp('18%'):hp('24%'),
		paddingTop: Platform.OS === 'ios' ?hp('-2%'):hp('4%'),
		paddingHorizontal: wp('1%'),
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	searchParamContainer: {
		//flexDirection: 'row', 
		//marginBottom: '4%'
	},
	pickerStyles: {
		marginTop: 5,
		backgroundColor: 'white',
    paddingVertical: 8,
 
		paddingHorizontal: '8%',
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
		borderRadius: 25,
		elevation: 5,
		marginLeft:'3%'
	},
	searchContainer: {
		paddingVertical: 0,
		width: '88%',
		borderRadius: 25,
		paddingHorizontal: 20,
		elevation: 10,
		backgroundColor: 'white',
		fontSize: wp('3.8%'),
		fontWeight:'700',
		color: Colors.blue,
		alignSelf:'center',
		alignItems:"center",
		justifyContent:"center",
		//marginBottom:'2.5%',
		//marginTop:'2.5%',
		height:'28%'
	},
	 searchFilterContainer: {
    marginTop: hp('.5%'),
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchFilterTypeBox: {
    marginHorizontal: wp('1%'),
    marginBottom: hp('1%'),
    borderWidth: 1.5,
    width: wp('42%')
  },
  searchFilterTypeText: {
    fontSize: wp('3.8%'),
    fontFamily: ApplicationStyles.textMediumFont
  },
});
