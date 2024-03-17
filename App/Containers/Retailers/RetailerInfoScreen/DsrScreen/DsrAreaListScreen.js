import React, { Component } from 'react'
import WhiteButton from 'App/Components/WhiteButton';
import { View, ScrollView, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './Styles'
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommonActions from 'App/Stores/Common/Actions';
import GenericDisplayCard from 'App/Components/GenericDisplayCard'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import NewAreaForm from './NewAreaForm'



class DsrAreaListScreen extends Component {
  componentDidMount() {
  
      this.fetchDsrCall();
    


    

    
  }

  fetchDsrCall() {
    const {
      token,
      agentid,
      fetchDsr,
    } = this.props;

    fetchDsr({
      token,
      sfid:this.props.selectedRetailer.id ,

     
    });
  }

  

  
  

  
 


  getPartiesDataNode1()
  {
    const {
        loader,
        data
      } = this.props;

   
    let visibleNode = [];

    if (data && data.length) {
      if (data.length) {
        visibleNode = (
          <FlatList
            data={data}
            renderItem={({ item }) => 
                <GenericDisplayCard dark={false}
                  style={{ width: '98%', elevation: 0}}
                 // heading={item.team_member_name__c|| 'No Name'}
                  //showTextAvatar={true}
                  //onPress={() => NavigationService.navigate('CustomerInfoScreen')}
                  content={[
                  
                      <GenericDisplayCardStrip key={'Employee Code' + item.name} label={'Area:'} value={item.manager_employee_code__c}/> ,
                     
                      
                    
              ]}
            />}
            keyExtractor={item => item.sfid}
            
            refreshing={loader}
            onRefresh={() => this.fetchDsrCall()}
            ListEmptyComponent={() => <NoDataFound text={'No DSR Found'} />}
          />
        );
      } else {
        visibleNode =<NoDataFound text={'No DSR Found'} />
      }
    } else if (loader) {
      visibleNode = <Loading/>
    } else if ((!data || (data && !data.length) && !loader)) {
      visibleNode = <NoDataFound text={'No DSR  Found'} />
    }

    return visibleNode;
      
     
  }


  
  onPressCard() {
   

    
        NavigationService.navigate('NewDsrScreen')
        
  }

  

  

  render() {
  
    const {  

      clearDsrAreaForm ,
      openModal
    } = this.props;
   


    return (
      <View style={Style.container}>
       
     
      {  this.getPartiesDataNode1()}
     
     <TouchableOpacity
          style={Style.plusIcon}
         onPress={() => {
            return openModal({
                    content: <NewAreaForm id={form.id} />, 
                    heading: 'Add Area', 
                    bodyFlexHeight: .5,
                    close: () =>clearDsrAreaForm()
            })}}
          
          
          
          >
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
 
  data: state.retailers.dsrList,
  loader: state.retailers.fetchDsrLoader,
  selectedRetailer: state.retailers.selectedRetailer,
 
  
});

const mapDispatchToProps = (dispatch) => ({
  
fetchDsr: (params) => dispatch(RetailersActions.fetchDsr(params)),
clearDsrAreaForm : (params) => dispatch(RetailersActions. clearDsrAreaForm (params)),
openModal:(params)	=> dispatch(CommonActions.openModal(params)),

 
  
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DsrAreaListScreen)
