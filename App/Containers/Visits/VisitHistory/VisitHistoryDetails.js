import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, TouchableOpacity, Text,StyleSheet } from 'react-native'
import HistoryTuple from './HistoryTuple'
import HistoryDetailsTupleStyle from './HistoryDetailsTuple/HistoryDetailsTupleStyle'
import VisitsActions from 'App/Stores/Visits/Actions'
import { HelperService } from 'App/Services/Utils/HelperService'
import _ from 'lodash'
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import NavigationService from 'App/Services/NavigationService'
import GenericIcon from 'App/Components/GenericIcon'
import HistoryDetailstuple from './HistoryDetailsTuple/HistoryDetailsTuple'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { ScrollView } from 'react-navigation'
import Remarkinfo from './HistoryDetailsTuple/RemarkInfo'
import Stockinfo from './HistoryDetailsTuple/Stockinfo'
class VisitHistoryDetails extends Component {
  
 
    componentDidMount() {
        this.getOrders();
      }
    
      getOrders(params) {
        const {
          fetchHistory,
          token,
        } = this.props
    
        // let requestParameter = {}
            fetchHistory({
                token,
            })
        
      };
      getRemarkNode(item){
        return <Remarkinfo data={item} id={item.id}/>
      }
      
      getStockNode(item){
        return <Stockinfo data={item} id={item.id}/>
      }
      
      getCardNode(item) {
        return <HistoryDetailstuple data={item} id={item.Id} />
      }
    
      render() {
        const { loader, VisitHistory} = this.props
    const{item}=this.props.navigation.state.params 
        // console.log('history123', item.visit_info__c.length)
        let visibleNode = []
        let visibleRemarkNode=[]
        let visibleStockNode=[]

        //Stock info
        if (item.visit_info__c && item.visit_info__c.length   ) {
          //   console.log('history', VisitHistory)
            visibleStockNode = (
              <FlatList
                data={item.visit_info__c}
                renderItem={({ item }) => this.getStockNode(item)}
                keyExtractor={(item) => item.Id}
                onRefresh={() => this.getOrders()}
                refreshing={loader}
              />
            )
          } else if (loader) {
            visibleStockNode = <Loading />
          } else if (item.visit_info__c && !item.visit_info__c.length && !loader) {
            // console.log('history', VisitHistory)
            visibleStockNode = <NoDataFound style={{marginBottom:"-55%"}} text={'No Data Found'} />
          }

        //Remark 
        if (item.visit_info__c && item.visit_info__c.length) {
          //   console.log('history', VisitHistory)
            visibleRemarkNode = (
              <FlatList
                data={item.visit_info__c}
                renderItem={({ item }) => this.getRemarkNode(item)}
                keyExtractor={(item) => item.Id}
                onRefresh={() => this.getOrders()}
                refreshing={loader}
              />
            )
          } else if (loader) {
            visibleRemarkNode = <Loading />
          } else if (item.visit_info__c && !item.visit_info__c.length && !loader) {
            // console.log('history', VisitHistory)
            visibleRemarkNode =  <NoDataFound style={{marginBottom:"-55%"}} text={'No Data Found'} />
          }

        //Competitor Info
        if (item.visit_info__c && item.visit_info__c.length   ) {
        //   console.log('history', VisitHistory)
          visibleNode = (
            <FlatList
              data={item.visit_info__c}
              renderItem={({ item }) => this.getCardNode(item)}
              keyExtractor={(item) => item.Id}
              onRefresh={() => this.getOrders()}
              refreshing={loader}
            />
          )
        } else if (loader) {
          visibleNode = <Loading />
        } else if (item.visit_info__c && !item.visit_info__c.length && !loader) {
          // console.log('history', VisitHistory)
          visibleNode = <NoDataFound style={{marginBottom:"-55%"}} text={'No Data Found'} />
        }
        return <View>
            <GenericIcon
                    name={'arrow-back'}
                    onPress={NavigationService.goback}
                    style={Styles.backArrow}
                  />
                  <ScrollView>
            <Text style={{color:Colors.primary,fontSize:22,marginLeft:'8%'}}>Competitor Information</Text>
            {visibleNode}
            <Text style={{color:Colors.primary,fontSize:22,marginLeft:'12%'}}>Stock Information</Text>
            <View style={{flexDirection: 'row'}}>
          <Text style={{margin:'5%',marginLeft:'15%',color: Colors.clr66}}>Product Name</Text>
          <Text style={{margin:'5%',color: Colors.clr66}}>Quantity(MT)</Text>
            </View>
            <View style={{margin:10}}>
            {visibleStockNode}
            </View>
            <Text style={{color:Colors.primary,fontSize:22,marginLeft:'12%',marginTop:'10%'}}>Remarks</Text>
            <View style={{marginBottom:60}}>
            {visibleRemarkNode}
            </View>
            {/* </View> */}
            </ScrollView>
            </View>
      }
    }
    
    const mapStateToProps = (state) => ({
      token: state.user.token,
    //   ? state.visits.History && state.visits.History.data && state.visits.History.data.length > 0
    //   : []
      VisitHistory: state.visits.History &&  state.visits.History.data &&  state.visits.History.data.length>0 ?  state.visits.History.data:[],
      retailersList: state.retailers.retailersList,
      dealersList: state.retailers.dealersList,
      loader: state.visits.fetchHistoryLoader,
      visitId: state.visits.executeVisitData.Id,
      type: state.visits.type,
      selectedRetailer: state.retailers.selectedRetailer,
      selectedInfluencer: state.influencers.selectedInfluencer,
      selectedSite: state.sites.selectedSite,
      //  monthNumber: state.visits.monthNumber,
    })
    
    const mapDispatchToProps = (dispatch) => ({
      fetchHistory: (params) => dispatch(VisitsActions.fetchHistory(params)),
    })
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(VisitHistoryDetails)
    
    const Styles = StyleSheet.create({  
    backArrow: {
        color: Colors.button,
        paddingLeft: 5,
        fontSize:30,
        marginTop:'3%'
      },
      textContainer:{
        width: '85%',
        backgroundColor: Colors.lightGrey,
        borderColor: Colors.primary,
        padding: 15,
        marginLeft:'10%',
        elevation:10,
        // alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 5,
        marginTop: 7,
      }
    }); 

// export default VisitHistoryDetails
