import SearchBar from 'App/Components/SearchBar'
import SearchableDropdown from 'App/Components/SearchableDropdown'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { ApplicationStyles, Colors } from 'App/Theme'
import { Header } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'


class RetailerListLayout extends React.Component {
  onAreaChange(areaCode) {
    this.props.updateSearchFilters({ edited_field: 'area', 'edited_value': areaCode });
  }

  render() {
    const {
      agentAreas,
      retailerSearchFilters,
      updateSearchFilters,
      agentCity,
      cityAllList,
      user_details,
      dealersSearchList
    } = this.props;

    let selectNode = [];
    let selectNodeDataSource = [];
    let placeholder = 'Select Area..'
    let changingValue = retailerSearchFilters['area']

console.log(agentAreas,retailerSearchFilters,"changingValuechangingValue");

    let onChangeCallback = (value) => updateSearchFilters({ edited_field: 'area', 'edited_value': value });

    if (user_details.business_channel__c == 'Wholesale') {
      if (retailerSearchFilters['type']=='Wholesaler'||retailerSearchFilters['type']=='Direct_Customer') {
        selectNodeDataSource = agentAreas;
      }else {
        selectNodeDataSource = cityAllList;
      }
    }else { //'Retail'
      if(retailerSearchFilters['type']=='Retailer'){
        //changingValue=''
       // updateSearchFilters({ edited_field: 'distributor', 'edited_value': ''});
       //onChangeCallback = (value) => updateSearchFilters({ edited_field: 'area', 'edited_value': ''});
        selectNodeDataSource = dealersSearchList;
        placeholder = 'Select Distributor...'
       changingValue =  retailerSearchFilters['distributor'];
        onChangeCallback = (value) => updateSearchFilters({ edited_field: 'distributor', 'edited_value': value });
      }else {
        selectNodeDataSource = agentAreas;
      }
    }
console.log(selectNodeDataSource,"selectNodeDataSourceselectNodeDataSource");

    return (
      <View>
        <Header style={Styles.header}>
          <SearchBar
            placeholder={`Search by ${retailerSearchFilters['searchBy']}`}
            onInputChange={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            onInputSubmit={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            onInputClear={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
            value={retailerSearchFilters['searchValue']}
            ContainerStyles={Styles.searchContainer}
          />
          <View style={Styles.searchableDropdownContainer}>
            <View>
              <SearchableDropdown
                dataSource={selectNodeDataSource}
                placeHolderText={placeholder}
                selectedValue={changingValue}
                onChange={onChangeCallback}
                placeholder={placeholder}
                invalid={false}
                customPickerStyles={Styles.picker}
                key={changingValue + retailerSearchFilters['type'] + user_details.business_channel__c}
              />
            </View>
          </View>
          <View style={Styles.searchFilterContainer}>
                   
          </View>
        </Header>
        {this.props.children}
      </View>
    )
  }
}




const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  agentAreas: [{ id: '', name: 'All' }].concat(state.user.agentAreas),
  agentCity: [{ id: '', name: 'All' }].concat(state.user.agentCity),
  retailerCompetitors: state.retailers.retailerCompetitors,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  dealersSearchList:  [{ id: '', name: 'All' }].concat(state.retailers.dealersSearchList),
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  fetchDealersLoader: state.retailers.fetchDealersLoader,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  cityAllList : [{ id: '', name: 'All' }].concat(state.common.cityAllList),
	user_details: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
  openMoreFiltersOption: () => dispatch(RetailersActions.openMoreFiltersOption()),
  closeMoreFiltersOption: () => dispatch(RetailersActions.closeMoreFiltersOption()),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerListLayout)

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
   
    flexDirection: 'column',
  
    
    paddingTop: 20,
    paddingBottom: 5,
   
    paddingLeft: 10,
    paddingRight: 10,
    elevation:10,
    backgroundColor: 'white',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
  },
  searchContainer: {
    paddingVertical: 10,
    width: '88%',
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 10,
    backgroundColor: 'white',
    fontSize: wp('4.8%'),
    fontWeight:'700',
    color: Colors.blue,
    height:'36%'
  },
  searchableDropdownContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60
  },
  picker: {
    marginTop: 16,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: '8%',
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 10,
    marginLeft:'6.5%',
    height:'70%'
    
  },
  searchFilterContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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
