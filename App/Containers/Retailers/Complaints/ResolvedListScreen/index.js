import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import RetailersActions from 'App/Stores/Retailers/Actions'
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import SitesActions from 'App/Stores/Sites/Actions';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Style from './Style';
import { HelperService } from 'App/Services/Utils/HelperService';
// import IssueTuple from '../IssueTuple';
import Complaintcard from "App/Components/Complaintcard";
import GenericIcon from 'App/Components/GenericIcon'
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from "react-native-responsive-screen"
import lodash from "lodash"

class ResolvedListScreen extends Component {
    componentDidMount() {
       
      this.fetchIssuesCall();
         }

    fetchIssuesCall() {
      const{
        fetchcomplaint,
        complaintdata,
        selectedRetailer
      }=this.props
      fetchcomplaint({Customer_name__c:selectedRetailer.id});
        
    }
    getIssueCardNode(item){
const{
token,agentid

}=this.props;
return(
<Complaintcard
data={item}
date={HelperService.dateReadableFormat(item.createddate)}
ticketno={item.name}
dark={false}
category={item.complaint_type_name}
sub_category={item.complaint_sub_type_name}
/>

);
 }
   
  

    getDataNode() {
        const {
            complaintdata,
            loader ,
            agentAreas,
            selectedRetailer
        } = this.props;
       
          
          let visibleNode = [];
      
          if (complaintdata.Resolved&&complaintdata.Resolved.length) {
  
          
          
             let filteredClaimList=complaintdata.Resolved
              
           
            if (filteredClaimList.length) {
              visibleNode = (
                <FlatList
                showsVerticalScrollIndicator={false}
                  data={filteredClaimList}
                  renderItem={({ item }) => 
                  this.getIssueCardNode(item)

                 

                  }
                  keyExtractor={item => item.sfid}
                  refreshing={loader}
                  onRefresh={() => this.fetchIssuesCall()}
                />
              );
            } else {
              visibleNode =<NoDataFound text={'No Issues Found'} />
            }
          } else if (loader) {
            visibleNode = <Loading/>
          } else if ((!complaintdata || (complaintdata && !complaintdata.length) && !loader)) {
            visibleNode = (    <NoDataFound text={'No Issues Found'}>
            <GenericIcon 
              name={'refresh'}
              onPress={() => this.fetchIssuesCall()}
              style={Style.refreshIcon}
            />
          </NoDataFound>)
          }
      
          return visibleNode;
        }
  
  
  
    render() {
        const {
           complaintdata,
            selectedRetailer
        } = this.props;
         
       
    
        return (
          <View style={{flex:1}}>
          <TouchableOpacity onPress={NavigationService.goback}>
          <GenericIcon
            name={'arrow-back'}
            style={Style.backIcon}
          />
          </TouchableOpacity>
            <View style={Style.container}>
               
                
                <View >
                {this.getDataNode()}
                </View>
              
            </View></View>
        )
    }
}



const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    agentAreas: state.user.agentAreas,
   // data: state.retailers.issueList,
   selectedRetailer: state.retailers.selectedRetailer,
   complaintdata:state.retailers.agentComplaints,
   loader: state.retailers.fetchComplaintsLoading,
   
});

const mapDispatchToProps = (dispatch) => ({
    //selectSite: (params) => dispatch(SitesActions.selectSite(params)),
   // fetchIssues: (params) => dispatch(RetailersActions.fetchIssues(params)),
   fetchcomplaint:(params) => dispatch(RetailersActions.fetchComplaints(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResolvedListScreen)