import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableHighlight, Alert } from 'react-native'
import { Icon, Input, } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './RetailerInfoStyle'
import RetailerInfoTuple from 'App/Containers/Retailers/RetailerInfoTuple'
import LayoutScreen from 'App/Containers/Layout/LayoutScreen'
import NavigationService from 'App/Services/NavigationService'
import WhiteButton from 'App/Components/WhiteButton'
import { Colors, ApplicationStyles } from 'App/Theme'
import { HelperService } from 'App/Services/Utils/HelperService';
import InfoDisplay from 'App/Components/InfoDisplay'
import RetailersActions from 'App/Stores/Retailers/Actions'
import Loading from 'App/Components/Loading'
import { Header } from 'App/Components/Header'
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RetailerTab from './RetailerTab'
import RetailerOrdersListScreen from '../RetailerOrdersListScreen'
import ComplaintsScreen from '../Complaints'
import CommonActions from 'App/Stores/Common/Actions';
import UpdateRetailer from '../NewRetailer/UpdateRetailer';
import DsrListScreen from './DsrScreen/DsrListScreen'
// import SpeedoMeter from 'App/Components/SpeedoMeter'
import CreditLimit from 'App/Containers/CreditLimit'
import Outstanding from '../Outstanding/Outstanding'
import Complaints from '../Complaints/index'
import DealerOrdersListScreen from '../DealerOrdersListScreen/DealerOrdersListScreen'
import ProductActions from 'App/Stores/Products/Actions'
import VisitsActions from 'App/Stores/Visits/Actions'
import TargetScreen from "../TargetScreen/TargetScreen";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class RetailerInfoScreen extends Component {
  componentWillUnmount() {
    // this.props.clearForm();
 }
  async updateLocation() {
    this.props.updateRetailerLocationLoading();
    let location = await HelperService.requestLocation();
    if (location == 'DENIED') {
      Alert.alert("Location permission is required to proceed.",
        "Go App Permissions and Turn on Location Permission for JK Paper."
      );
      this.props.updateRetailerLocationLoadingStop();// stops btn loading
      return;
    } else if (!location) {
      this.props.updateRetailerLocationLoadingStop();
      return;
    }

    this.props.updateRetailerLocation({
      lat: Number(location.latitude),
      long: Number(location.longitude),
      token: this.props.token,
      // agentid: this.props.agentid,
      seller_id: this.props.selectedRetailer.id + ''
    });
  }

  onPressCard() {
    this.props.openModal({

      content: <UpdateRetailer
      // onSubmit={(params) => {this.props.updateExpense(params)}}
      />,
      heading: 'Update',
      bodyFlexHeight: 1
    })



  }


  render() {
    const {
      selectedRetailer,
      retailersList,
      stateList,
      city,
      searchFilters,
      fetchRetailerArea,
      fetchRetailerAreaLoading,
      agentAreas,
      agentBeat,
      dealersList
    } = this.props;

    const {
      id,
      data
    } = selectedRetailer

   // console.log(fetchRetailerArea);


    if (!data) {
      return (
        <View style={Style.parentContainer}>
          <Loading />
        </View>
      );
    }
    //console.log(dealersList)
    let selectedTabNode = [];

      switch (this.props.searchFilters['selectedTab']) {
        case 0:
          selectedTabNode = <RetailerInfoTuple  item={data}  areas={agentAreas} beat={agentBeat} dealer={dealersList} onPress={() => this.onPressCard() } businessChannel={this.props.user_details.business_channel__c}/>
          break
          case 1:
            selectedTabNode = <DealerOrdersListScreen/>
            break 
          case 2:
            selectedTabNode = searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?   
            
            <Complaints/>:[]
            // <Complaints/>:<TargetScreen  />
            break 
          case 3:
            selectedTabNode = searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?   
            
          <TargetScreen />:<TargetScreen/>
            // <Complaints/>:<TargetScreen  />
            break 
          case 4:
        selectedTabNode = <CreditLimit />
        break
      case 5:
        selectedTabNode = <Outstanding />
        break

      }
  

    return (
      <View style={Style.parentContainer}>
           <Header title={`${data.account_type__c.replace('_', ' ')}  Profile`} />
           <View style={Style.view1}>
        <View style={Style.view3}>
     {data.account_type__c=='Retailer'?
      <Button
            theme={{roundness: 18}}
            color={Colors.blue}
           // icon="phone"
            mode="contained"
            uppercase={false}
            style={{width:'40%', marginLeft:'60%'}}
            onPress={() =>{NavigationService.navigate( data.account_type__c=='Retailer'?'VisitBookOrder':'VisitBookOrderHeader') ,{id:data.sfid};
            
           this.props.clearProductFilter() 
          this.props.clearOrderHeaderForm()
           this.props.clearVisitExecution()
          this.props.clearCart()
          this.props.clearAddOrderLineData()
          
         }}>
          <Text>Book Order</Text>
        </Button>:[]
  }
 
          <Text style={Style.text1}>{data.name ? data.name : 'NA'}</Text>
          <Text style={Style.grey}>{`${
            data.billingstreet ? data.billingstreet : 'NA'
          }, ${data.city__c ? HelperService.getNameFromSFID(city, data.city__c || 'None') : 'NA'}, ${
            data.state__c? HelperService.getNameFromSFID(stateList, data.state__c || 'None') : 'NA'
          }`}</Text>
          {/* <Text style={styles.grey}>Category B</Text> */}
        </View>
        <View style={Style.view2}>
          <Button
            theme={{roundness: 18}}
            color={Colors.blue}
            icon="phone"
            mode="contained"
            uppercase={false}
            onPress={() => HelperService.callNumber(data.phone)}>
            <Text>Call</Text>
          </Button>
          <WhiteButton
            selected={false}
            title={'Update Location'}
            disabled={this.props.updateRetailerLocationLoader}
            loading={!!this.props.updateRetailerLocationLoader}
            onPress={() => this.updateLocation()}
            style={{ ...Style.actionButton, ...Style.locationAction }}
            textStyle={Style.actionButtonText}
          />

          <Button
            theme={{roundness: 18}}
            color={Colors.blue}
            icon={() => (
              <FontAwesome size={18} color="white" name="location-arrow" />
            )}
            mode="contained"
            uppercase={false}
            onPress={() =>{
              (data.location__latitude__s&&data.location__longitude__s)   ?  HelperService.showDirectionInGoogleMaps(data.location__latitude__s, data.location__longitude__s):HelperService.showToast({ message: 'Geo Location Not Available', duration: 2000, buttonText: 'Okay' });}
            }>
            Direction

          </Button>

          </View>
        </View>
      
<ScrollView 
//horizontal={true}
>
        <RetailerTab />
        </ScrollView>

        {selectedTabNode}


      {  fetchRetailerAreaLoading    ?    <View style={{ justifyContent: "center", alignItems: "center", position: "absolute", top: 260, height: hp("5%"), width: "100%" }}>
                        <Loading />
                    </View>
      :[]}

      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  selectedRetailer: state.retailers.selectedRetailer,
  fetchRetailerAreaLoading:state.common.fetchRetailerAreaLoading,
  updateRetailerLocationLoader: state.retailers.updateRetailerLocationLoader,
  retailerCompetitors: state.retailers.retailerCompetitors,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  agentAreas: state.user.agentAreas,
  token: state.user.token,
  agentid: state.user.id,
  searchFilters: state.retailers.retailerSearchFilters,
  stateList: state.common.stateList,
  city: state.common.cityList,
  agentBeat: state.common.agentBeat,
  dealersList: state.retailers.dealersSearchList,
  user_details: state.user.user_details,

});

const mapDispatchToProps = (dispatch) => ({
  updateRetailerLocation: (params) => dispatch(RetailersActions.updateRetailerLocation(params)),
  updateRetailerLocationLoading: () => dispatch(RetailersActions.updateRetailerLocationLoading()),
  updateRetailerLocationLoadingStop: () => dispatch(RetailersActions.updateRetailerLocationLoadingStop()),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  closeModal: (params) => dispatch(CommonActions.closeModal(params)),
  fetchRetailerArea: (params) => dispatch(CommonActions.fetchRetailerArea(params)),
  clearProductFilter: () => dispatch(ProductActions.clearProductFilter()),
  clearOrderHeaderForm: () => dispatch(VisitsActions.clearOrderHeaderForm()),
  clearCart: () => dispatch(VisitsActions.clearCart()),
  clearVisitExecution: () => dispatch(VisitsActions.clearVisitExecution()),
  clearAddOrderLineData: () => dispatch(RetailersActions.clearAddOrderLineData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerInfoScreen)

