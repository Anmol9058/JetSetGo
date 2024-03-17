import React, { Component } from 'react'
import { View, Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import Style from './RetailerInfoStyle'
import RetailersActions from 'App/Stores/Retailers/Actions'


import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';



{/* <ScrollableTab tabsContainerStyle={Style.tabHeading} underlineStyle={Style.tabUnderLine} style={Style.mainTabs} /> */}

class RetailerTab extends React.Component {
  render() {
    const {
      isASM,
      searchFilters,
      changeSearchFilters,
      selectedRetailer
    } = this.props
    return (
      
     searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?       
    <Tabs 
    
     renderTabBar={() => (
        <ScrollableTab tabStyle={{ backgroundColor: "white" , }} />
     )}
      onChangeTab={(tab) => changeSearchFilters({ edited_field: 'selectedTab', edited_value: tab.i })} tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs} page={searchFilters['selectedTab']
     
    } 
     >

        <Tab selected={searchFilters['selectedTab'] == 0} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading}><Text style={Style.tabText}> Info</Text></TabHeading>}>
        </Tab>

        {
          <Tab selected={searchFilters['selectedTab'] == 1} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading}><Text style={Style.tabText}>Orders</Text></TabHeading>}>
         </Tab>
      }
       
       {/* {
    searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?       []: 
          

   
        } */}
       {

searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?          <Tab selected={searchFilters['selectedTab'] == 2} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Complaint</Text></TabHeading>}>
        </Tab>:[]
    //     <Tab selected={searchFilters['selectedTab'] == 2} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Target</Text></TabHeading>}>
    // </Tab>
        
      }



        {
// searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?
  <Tab selected={searchFilters['selectedTab'] == 3} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Target</Text></TabHeading>}>
          </Tab>
          
        }
        {

  searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?<Tab selected={searchFilters['selectedTab'] == 3} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Credit Limit</Text></TabHeading>}>
          </Tab>:[]
          
        }
        
        {
    searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?<Tab selected={searchFilters['selectedTab'] == 4} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Outstanding</Text></TabHeading>}>
          </Tab>:[]
          
        }
        {/* {
          searchFilters['type'] == 'Retail_Distributor' || searchFilters['type'] == 'Wholesaler' ? <Tab selected={false} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Outstanding</Text></TabHeading>}>
          </Tab> : []
        } */}
       

      </Tabs>

:
    
<Tabs 

 
  onChangeTab={(tab) => changeSearchFilters({ edited_field: 'selectedTab', edited_value: tab.i })} tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs} page={searchFilters['selectedTab']
 
} 
 
  >

    <Tab selected={searchFilters['selectedTab'] == 0} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading}><Text style={Style.tabText}> Info</Text></TabHeading>}>
    </Tab>

    {
      <Tab selected={searchFilters['selectedTab'] == 1} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading}><Text style={Style.tabText}>Orders</Text></TabHeading>}>
     </Tab>
  }
   
   {/* {
searchFilters['type']=='Retail_Distributor' || searchFilters['type']=='Wholesaler'?       []: 
      


    } */}
   {

     
//     <Tab selected={searchFilters['selectedTab'] == 2} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Target</Text></TabHeading>}>
// </Tab>
    
  }



    {/* {
      searchFilters['type'] == 'Retail_Distributor' || searchFilters['type'] == 'Wholesaler' ? <Tab selected={false} underlineStyle={Style.tabUnderLine} heading={<TabHeading style={Style.tabHeading} ><Text style={Style.tabText}>Outstanding</Text></TabHeading>}>
      </Tab> : []
    } */}
   

  </Tabs>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.user_details.designation__c,
  psmList: state.user.psmList.concat([{ id: '', name: 'All' }]),
  searchFilters: state.retailers.retailerSearchFilters,
  selectedRetailer: state.retailers.selectedRetailer,
  //retailerSearchFilters: state.retailers.retailerSearchFilters,

});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerTab)