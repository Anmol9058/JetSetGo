import React, { Component } from 'react'
import WhiteButton from 'App/Components/WhiteButton';
import { View, ScrollView, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './RetailerListStyle'
import RetailerTuple from 'App/Containers/Retailers/RetailerTuple'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import SitesActions from 'App/Stores/Sites/Actions';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import SitesTuple from 'App/Containers/Sites/SitesTuple';
import InfluencersTuple from 'App/Containers/Influencers/InfluencerTuple';
import { stat } from 'react-native-fs'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CommonActions from 'App/Stores/Common/Actions';
import _ from 'lodash';



class RetailerListScreen extends Component {
  componentDidMount() {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      updateSearchFilters,
      countMapping,
      fetchRetailerArea,
      token,
    } = this.props;

    
    let value = Object.keys(countMapping)[0]

    if (retailersList && !_.isEmpty(retailersList)){
      updateSearchFilters({ edited_field: 'type', 'edited_value': value })
      updateSearchFilters({ edited_field: 'editOrder', 'edited_value': '' })
      //fetchRetailerArea({
        //token,
        //partyType: value,
        this.props.clearSelectRetailer();
         this.props.clearEditOrderLineData()
      //});
    } else {
      this.fetchRetailersCall();
    }

  }

  fetchRetailersCall() {
    const {
      token,
      agentid,
      fetchRetailers
    } = this.props;

    fetchRetailers({
      token,
      agentid,

    });
  }


  
  filterResults(list) {
    

    let retailerSearchFilters = this.props.retailerSearchFilters;
    
    let filteredList = HelperService.searchTextListFilter(list, 'name', retailerSearchFilters['searchValue']);
  //   if(retailerSearchFilters['type']!='Retailer')
  //  {
    filteredList = HelperService.searchTextListFilter(filteredList, 'area__c', retailerSearchFilters['area']);
  //  }
  //   filteredList = HelperService.sortListFilter(filteredList, 'Name', 'ASC');
  //  if(retailerSearchFilters['type']=='Retailer')
  //  {
  //   filteredList = HelperService.searchTextListFilter(filteredList, 'parentid', retailerSearchFilters['distributor']);
  //  }
    return filteredList;
  }

  onSelectRetailer(params) {
    this.props.updateSearchFilters({ edited_field: 'selectedTab', edited_value: 0 })
    NavigationService.navigate('RetailerInfoScreen', params);
    this.props.selectRetailer(params);
     this.props.fetchRetailerArea({ token :this.props.token, id:params.data.parentid});
     
   
    // console.log( this.props.fetchRetailerArea({ token :this.props.token, city:params.data.parentid})
    // );
   

  }



  getRetailerCardNode(data) {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      updateSearchFilters,
      countMapping,
      fetchRetailerArea,
      token,
      partiesMapping
    } = this.props;

    let count = data[1]

    Object.keys(partiesMapping).map((key) => {
      if (key == data[0]) {
        let filteredPartiesList = this.filterResults(Object.values(partiesMapping[key]));
        count = filteredPartiesList.length
      }
    });

    return (
      <WhiteButton
        title={data[0].replace('_', ' ') + '(' + count + ')'}
        style={{ ...Style.actionButton, ...Style.customSelectedStyleCorpBlue }}
        textStyle={Style.actionButtonText}
        onPress={() => {
          updateSearchFilters({ edited_field: 'type', 'edited_value': data[0] })
          updateSearchFilters({ edited_field: 'selectedTab', 'edited_value': 0 })

         
        }}
        selected={retailerSearchFilters['type'] == data[0]}
        customSelectedStyle={{ ...Style.customSelectedStyleCorpBlue, ...Style.selected }}
        customSelectedTextStyle={Style.customSelectedTextStyle}
      />
    );
  }


  getPartiesDataNode() {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      countMapping,
      partiesMapping,

    } = this.props;

    let visibleNode = [];



    if (retailersList.success) {
      let filteredRetailersList = Object.entries(countMapping);


      if (filteredRetailersList.length) {
        visibleNode = (
          <FlatList
            horizontal
            key={'Retailers'}
            data={filteredRetailersList}
            renderItem={({ item }) => this.getRetailerCardNode(item)}
            keyExtractor={item => item.toString()}
            onRefresh={() => this.fetchRetailersCall()}
            refreshing={fetchRetailersLoader}
          />
        );
      } else {
        visibleNode = <NoDataFound text={'No Parties Found'} >
          <Icon
            name={'refresh'}
            onPress={() => this.fetchRetailersCall()}
            style={{ color: Colors.button, fontSize: 16, alignSelf: 'center', padding: 10 }}
            type={'FontAwesome'}
          />
        </NoDataFound>
      }
    } else if (fetchRetailersLoader) {
      visibleNode = <Loading />
    } else if (retailersList && !fetchRetailersLoader) {
      visibleNode = <NoDataFound text={'No Parties found.'}>
        <Icon

          name={'refresh'}

          onPress={() => this.fetchRetailersCall()}
          style={{ color: Colors.button, fontSize: 25, alignSelf: 'center', padding: 10 }}
          type={'FontAwesome'}
        />
      </NoDataFound>
    }


    return visibleNode

  }


  getPartiesDataNode1() {
    const {
      retailersList,
      retailerSearchFilters,
      fetchRetailersLoader,
      countMapping,
      user_details,
      partiesMapping,
    } = this.props;

    let visibleNode = [];
    Object.keys(partiesMapping).map((key) => {
      if (key == retailerSearchFilters['type']) {
        let filteredPartiesList = this.filterResults(Object.values(partiesMapping[key]))
        if (filteredPartiesList.length) {
          visibleNode = (

            <FlatList

              key={'Retailers'}
              data={filteredPartiesList}
              renderItem={({ item }) => <RetailerTuple
                item={item}
                id={item.sfid}
                // user_detail={user_details.business_channel__c == 'Retail'? 'Last Order Value':'Last Order Value'}
                user_detail={ "Last Order Value"}
                onPress={() => this.onSelectRetailer({ id: item.sfid, data: item, })}
              />}
              keyExtractor={item => item.sfid}
              onRefresh={() => this.fetchRetailersCall()}
              refreshing={fetchRetailersLoader}
              ListEmptyComponent={() => <NoDataFound text={'No Parties Found'} />}
            />
          );
        } else {
          visibleNode = <NoDataFound text={'No Parties Found'} />
        }
      }
    }

    )


    return visibleNode


  }



  onPressCard() {
    const {
      retailerSearchFilters
    } = this.props;
    NavigationService.navigate('NewRetailer');
  }





  render() {

    const {

      retailerSearchFilters,

    } = this.props;



    return (
      <View style={Style.container}>
        <View style={{ height: '16%', backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center'}}>
          {this.getPartiesDataNode()}

        </View>

        {  this.getPartiesDataNode1()}


        <TouchableOpacity
          style={Style.plusIcon}
          onPress={() => this.onPressCard()}>
          <GenericIcon
            name={'add'}
            style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
          />
        </TouchableOpacity>

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  user_details: state.user.user_details,
  agentAreas: state.user.agentAreas,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  isConnected: state.network.isConnected,
  retailersList: state.retailers.retailersList,
  countMapping: state.retailers.countMapping,
  partiesMapping: state.retailers.partiesMapping,
 


});

const mapDispatchToProps = (dispatch) => ({
  selectRetailer: (params) => dispatch(RetailersActions.selectRetailer(params)),
  selectDealer: (params) => dispatch(RetailersActions.selectDealer(params)),
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  extractFormData: (params) => dispatch(RetailersActions.extractFormData(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  updateSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
  fetchRetailerArea: (params) => dispatch(CommonActions.fetchRetailerArea(params)),
  clearEditOrderLineData: (params) => dispatch(RetailersActions.clearEditOrderLineData(params)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerListScreen)

