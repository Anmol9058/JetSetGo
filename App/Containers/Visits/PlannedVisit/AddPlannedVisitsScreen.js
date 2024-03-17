import React, { Component } from 'react'
import { View, Alert, ScrollView, FlatList } from 'react-native'
import { Button, Text ,Icon} from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Style from './PlannedVisitStyles'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import PlannedVisitCard from 'App/Containers/Visits/PlannedVisitCard'
import SitesPlannedVisitCard from 'App/Containers/Visits/PlannedVisitCard/SitesPlannedVisitCard'
import InfluencerPlannedVisitCard from 'App/Containers/Visits/PlannedVisitCard/InfluencerPlannedVisitCard'
import Loading from 'App/Components/Loading'
import GenericIcon from 'App/Components/GenericIcon'
import NoDataFound from 'App/Components/NoDataFound'
import RetailersActions from 'App/Stores/Retailers/Actions'
import VisitsActions from 'App/Stores/Visits/Actions'
import SitesActions from 'App/Stores/Sites/Actions';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import EditVisitCard from 'App/Containers/Visits/EditVisitCard';
import CommonActions from 'App/Stores/Common/Actions';
import { Colors } from 'App/Theme'
import _ from 'lodash'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


class AddPlannedVisitsScreen extends React.Component {
  componentDidMount() {
    const {
      retailersList,
       retailerSearchFilters,
       fetchRetailersLoader,
       updateSearchFilters,
       countMapping,
       changePlannedSelectedPSM,
       agentid,
       selectedVisitDate,
       agentAreaPjp,
       token,
       changePlannedStartDate,
        changeAddPlannedVisitsSearchFilters,
        getAreaPjp,
        fetchTodayAreaPjp,
        businessChannel,
        changePlannedSelectedDate
      } = this.props;
      changePlannedSelectedPSM(agentid)
    this.props.clearSelectRetailer();
      let value=Object.keys(countMapping)[0]
   
    if (retailersList && !_.isEmpty(retailersList)) {
      updateSearchFilters({ edited_field: 'type', 'edited_value':value })
    } else {
      this.fetchRetailersCall();
      updateSearchFilters({ edited_field: 'type', 'edited_value':value })
    }
   
      //console.log(HelperService.getCurrentTimestamp())
    fetchTodayAreaPjp({
      token,
      team__c: agentid,
      date:HelperService.getCurrentTimestamp(),
})



    

    
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
    const {
      searchFilters,
      retailerSearchFilters
    } = this.props;
    let filteredList=[]
    if(retailerSearchFilters['type']!='Retailer'){
   
     filteredList = HelperService.searchTextListFilter(list, 'area__c', searchFilters['area']);}
   
     if(retailerSearchFilters['type']=='Retailer')

    {
     
      filteredList = HelperService.searchTextListFilter(list, 'beat__c', searchFilters['beat']);}
    filteredList = HelperService.searchTextListFilter(filteredList, 'name', searchFilters['name']);
    filteredList = HelperService.sortListFilter(filteredList, 'name', 'ASC');
   
    return filteredList;
  }

  fetchDataFromAreaList() {
    const {
      agentAreaPjp,		
      agentBeatPjp,
      agentPjp,
      searchFilters,
    } = this.props;

    let data = '';
    agentPjp.area&&agentPjp.area.length?  agentPjp.area.map((obj) => {
      if(obj.area__c == searchFilters['area']) {
        data = obj.sfid
      }
    }) :[]


    return data;
  }

  fetchDataFromBeatList() {
    const {
      agentAreaPjp,		
      agentBeatPjp,
      agentPjp,
      searchFilters,
    } = this.props;

    let data = '';
   

  
    agentPjp.beat&&agentPjp.beat.length? agentPjp.beat.map((obj) => {
        if(obj.beat__c == searchFilters['beat']) {
          data = obj.sfid
        }
      }):[]
 

    return data;
  }
  
  addall = (params) => {
    const {
    	selectedPlannedVisits,
    	selectedVisitDate,
      retailerSearchFilters,
    	addBulkVisitsToPlan,
      partiesMapping,
      selectedVisitPSM,
      agentid,
      user_details,
      
    } = this.props;

    let pjp = this.fetchDataFromAreaList()
    let pjpBeat= this.fetchDataFromBeatList()
    let filterList= this.filterResults(Object.values(partiesMapping[retailerSearchFilters['type']]))

    addBulkVisitsToPlan({
    	selectedPlannedVisits,
    	selectedVisitDate,
      retailerSearchFilters,
      filterList,
      selectedVisitPSM,
      user_details,
      agentid,
      pjp,
      pjpBeat,
     
     
    })
  }

  isaddall = () => {
    const {
      retailerSearchFilters,
      partiesMapping,
    } = this.props;

    let allAdded = true
    let filterList=[]
    if(partiesMapping[retailerSearchFilters['type']]){
      filterList= this.filterResults(Object.values(partiesMapping[retailerSearchFilters['type']]))
    }
   // if(filterList)
   
    filterList.map((obj)=> { 
      	if(!this.isRetailerAdded(obj)){
      		allAdded = false 
      	}
      })
    
   
   

    return allAdded
  }

  isRemoveall = () => {
    const {
    	selectedPlannedVisits,
    	selectedVisitDate,
      retailerSearchFilters,
      removeBulkVisitsToPlan,
      partiesMapping,
      selectedVisitPSM,
      agentid,
      user_details,
    } = this.props;
    let filterList= this.filterResults(Object.values(partiesMapping[retailerSearchFilters['type']]))
    
   	removeBulkVisitsToPlan({
      selectedPlannedVisits,
    	selectedVisitDate,
      retailerSearchFilters,
      filterList,
     
      selectedVisitPSM,
      agentid,
      user_details,
   	});
  }


 


  onAddClick(params) {
    const {
      agentid,
      selectedVisitPSM,
      selectedVisitDate,
      addVisitToPlan,
      searchFilters,
      user_details,
      agentAreaPjp,
      retailerSearchFilters,
    } = this.props;

// console.log("PARAMS",params);

    let data = {
      "customer_name__c": params.sfid,
    //  "visit_type": "Planned",
      "visit_date__c": selectedVisitDate,
   //   "createddate": HelperService.getCurrentTimestamp(),
      "assigned_by__c":(selectedVisitPSM==agentid) ? 'Self' :'Manager',
      "type__c": params.account_type__c,
      "name": params.name,
      "area__c": params.area__c,
      "flsp__c" :selectedVisitPSM ? selectedVisitPSM :agentid,
      "manager__c": user_details.manager__c,
      "team_manager__c":selectedVisitPSM&&selectedVisitPSM!=agentid? agentid: user_details.team_manager__c,
      "pjp_header__c": this.fetchDataFromAreaList(),	
      "visit_type__c":"Planned"
      
     
    }
    if(retailerSearchFilters['type']=='Retailer') 
    {  data.pjp_header__c=this.fetchDataFromBeatList()} 
    
  


    data = HelperService.decorateWithLocalId(data);
    addVisitToPlan(data)
  }


    onRemoveClick(item) {
      const {
        agentid,
        selectedVisitPSM,
        selectedVisitDate,
        removeVisitFromPlan,
        selectedPlannedVisits
      } = this.props;


      _.map(selectedPlannedVisits, (obj) => {
        if (obj.customer_name__c== item.sfid && HelperService.datesAreOnSameDay(obj.visit_date__c, selectedVisitDate)) {
          id = obj.local_id
        }
      });


      removeVisitFromPlan({id})
  }

  isRetailerAdded(item) {
    const {
      selectedPlannedVisits,
      selectedVisitDate,
      selectedVisitPSM
    } = this.props;
    // console.log(item);
    let isAdded = false;
    _.map(selectedPlannedVisits, (obj) => {
      if (obj.customer_name__c == item.sfid && HelperService.datesAreOnSameDay(obj.visit_date__c, selectedVisitDate)) {
        isAdded = true
      }
    });

    return isAdded;
  }

  getPartiesDataNode()
  {
    const {
      retailersList,
       retailerSearchFilters,
       fetchRetailersLoader,
       countMapping,
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
                ListEmptyComponent={() => <NoDataFound text={'No Parties Found'} />}
              />
            );
          } else {
            visibleNode = <NoDataFound text={'No Parties Found'} />
          }
        } else if (fetchRetailersLoader) {
          visibleNode = <Loading />
        } else if (retailersList  && !fetchRetailersLoader) {
          visibleNode =<NoDataFound text={'No Parties found.'}>
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

  getRetailerCardNode(data) {
   
    const {
      retailersList,
       retailerSearchFilters,
       fetchRetailersLoader,
       updateSearchFilters,
       countMapping,
       partiesMapping
      } = this.props;

      let count = data[1]
      Object.keys(partiesMapping).map((key)=>{
        if(key==data[0]){
          let filteredPartiesList =  this.filterResults(Object.values(partiesMapping[key]));
          count = filteredPartiesList.length
        }
      });
    
    return (
      <WhiteButton
              title={data[0].replace('_', ' ') +'('  +count+ ')'}
              style={{...Style.actionButton, ...Style.customSelectedStyleCorpBlue}}
              textStyle={Style.actionButtonText}
              onPress={() => updateSearchFilters({ edited_field: 'type', 'edited_value': data[0] })}
              selected={retailerSearchFilters['type'] == data[0]}
              customSelectedStyle={{...Style.customSelectedStyleCorpBlue, ...Style.selected}}
              customSelectedTextStyle={Style.customSelectedTextStyle}
            />
    );
  }

  getPartiesDataNode1()
  {
    const {
      retailersList,
       retailerSearchFilters,
       fetchRetailersLoader,
       countMapping,
       partiesMapping,
      } = this.props;
  
      let visibleNode = [];
      Object.keys(partiesMapping).map((key)=>{
       if(key==retailerSearchFilters['type']){
        let filteredPartiesList =  this.filterResults(Object.values(partiesMapping[key]))
        if (filteredPartiesList.length) {
   visibleNode = (
   
    <FlatList
     
      key={'Retailers'}
      data={filteredPartiesList}
      renderItem={({ item }) =>   <PlannedVisitCard
      data={item}
      key={item.sfid}
      id={item.sfid}
     // categoryRatingMapping={categoryRatingMapping}
      onAddClick={() => this.onAddClick(item)}
      onRemoveClick={() => this.onRemoveClick(item)}
      added={this.isRetailerAdded(item)}
      //areas={agentAreas}
     // type={searchFilters['retailer_type']}
    />}
      keyExtractor={item => item.sfid}
     // onRefresh={() => this.fetchRetailersCall()}
    //  refreshing={fetchRetailersLoader}
     // ListEmptyComponent={() => <NoDataFound text={'No Parties Found'} />}
    />
  );}else {
    visibleNode = 
    <View style={{marginTop:'5%'}}>
    <NoDataFound text={'No Parties Found'} />
    </View>
  }
       } }
      
    )
  
      
    return visibleNode
      
     
  }

  displayButton()
  {
    const {
      retailersList,
       retailerSearchFilters,
       fetchRetailersLoader,
       countMapping,
       partiesMapping,
      } = this.props;
  
      let visibleNode = [];
      Object.keys(partiesMapping).map((key)=>{
       if(key==retailerSearchFilters['type']){
        let filteredPartiesList =  this.filterResults(Object.values(partiesMapping[key]))
        if (filteredPartiesList.length) {
   visibleNode = (
   
    <WhiteButton
    selected={false}
    title={!this.isaddall() ? 'ADD ALL' : 'REMOVE ALL'}
    disabled={false}
    loading={false}
    onPress={this.isaddall() ? this.isRemoveall : this.addall}
    style={Style.addActionButton}
    textStyle={Style.addActionButtonText}
  >
    </WhiteButton>
    
   
  );}else {
    visibleNode = 
    []
  }
       } }
      
    )
  
      
    return visibleNode
      
     
  }

  
  render() {
    const {
      retailerSearchFilters,
      partiesMapping,
    } = this.props;

    return (
        <View style={{flex:1, backgroundColor:Colors.lightGrey}}>
           <View style={{height: hp('8%'),backgroundColor:Colors.white }}>
         { this.getPartiesDataNode()}
       
  
        </View>
       
       {this.displayButton()}
    
     
        
       
       
      {  this.getPartiesDataNode1()}
      
        </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid	: state.user.id,
  isConnected: state.network.isConnected,
  agentAreas: [{ id: '', name: 'All' }].concat(state.user.agentAreas),
  retailersOffset: state.retailers.retailersOffset,
  retailersLimit: state.retailers.retailersLimit,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  fetchRetailersLoader: state.retailers.fetchRetailersLoader,
  fetchDealersLoader: state.retailers.fetchDealersLoader,
  searchFilters: state.visits.planVisit.searchFilters,
  categoryRatingMapping: state.common.categoryRatingMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedVisitPSM: state.visits.planVisit.selectedVisitPSM,
  selectedPlannedVisits: state.visits.planVisit.selectedPlannedVisits,
  countMapping:state.retailers.countMapping,
  partiesMapping:state.retailers.partiesMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedVisitPSM: state.visits.planVisit.selectedVisitPSM,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
 
  agentAreaPjp				: state.common.agentAreaPjp, 
  agentPjp				: state.common.agentPjp, 
  agentBeatPjp				: state.common.agentBeatPjp, 
  user_details         : state.user.user_details,
  businessChannel	: state.user.user_details? state.user.user_details.business_channel__c:''
  
});

const mapDispatchToProps = (dispatch) => ({
  fetchRetailers: (params) => dispatch(RetailersActions.fetchRetailers(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
  addVisitToPlan: (params) => dispatch(VisitsActions.addVisitToPlan(params)),
  removeVisitFromPlan:(params) => dispatch(VisitsActions.removeVisitFromPlan(params)),
  updateSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
  clearSelectRetailer: () => dispatch(RetailersActions.clearSelectRetailer()),
  changePlannedSelectedPSM: (params) => dispatch(VisitsActions.changePlannedSelectedPSM(params)),
  changeAddPlannedVisitsSearchFilters: (params) => dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
  getAreaPjp:(params)				=> dispatch(CommonActions.fetchAllAreaPjp(params)),
  fetchTodayAreaPjp:(params) => dispatch(CommonActions.fetchTodayAreaPjp(params)),
  changePlannedSelectedDate: (params) => dispatch(VisitsActions.changePlannedSelectedDate(params)),
  changePlannedStartDate: (params) => dispatch(VisitsActions.changePlannedStartDate(params)),
  addBulkVisitsToPlan: (params) => dispatch(VisitsActions.addBulkVisitsToPlan(params)),
  removeBulkVisitsToPlan: (params) => dispatch(VisitsActions.removeBulkVisitsToPlan(params))

})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlannedVisitsScreen)