import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { Icon, Input, Button } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './Style'
import SurveyTuple from 'App/Containers/Survey/SurveyTuple'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import SurveyActions from 'App/Stores/Surveys/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import GenericIcon from 'App/Components/GenericIcon'
import SitesActions from 'App/Stores/Sites/Actions';
import InfluencersActions from 'App/Stores/Influencers/Actions';
import SitesTuple from 'App/Containers/Sites/SitesTuple';
import InfluencersTuple from 'App/Containers/Influencers/InfluencerTuple';
import _ from 'lodash';



class SurveyListScreen extends Component {
  componentDidMount() {
    this.fetchSurveysCall();
   }

  

  fetchSurveysCall() {
    const {
      token,
      user_details,
      fetchSurveys
    } = this.props;

   // console.log(user_details);
    fetchSurveys({
      token,
     area__c:user_details.zone__c
      
    });
  }
  getSurveyCardNode(data) {
    const {
        agentAreas,
        startSurvey,
        agentTransport,
    } = this.props;
  
//console.log(data);
    return (
     // console.log(data);
      <SurveyTuple
        data={data[0]}
        
        id={data[0].sfid}
        // areas={agentAreas}
        // transport={agentTransport}
        onPress={() => startSurvey(data)}
     />
     
    );
  
  }

  
  filterResults(list) {
    const {
      city,
      agentTransport,
    } = this.props;
    
   // console.log("sssslist",list)
   let filteredList=[]
   city.map((obj)=>{
     agentTransport.map((obj2)=>
     {
       if(obj.id==obj2.City__c){
      list.map((obj1)=>{
        if(obj1.Region__c==obj2.Region__c)
        {
          filteredList.push(obj1)
        }
      })}}
     )  
    } )
    filteredList = HelperService.removeDuplicateVisits(filteredList)
     return filteredList 
   
   
  }
  onPressCard() {
  
      NavigationService.navigate('')
       
  }

  render() {
    const {
        surveyList,
        getSurveysLoader,
        submit
    } = this.props;
    
   // console.log(Object.values(surveyList));
// const {
//         surveyList,
//         getSurveysLoader,
//     } = this.props;

      // const surveyList = [{

      //       'Id':'1',
      //       'Name':'00Survey01',
      //       'From_Date__c':'01/03/2021',
      //       'To_Date__c':'01/07/2021',
      //       'month__c':'June',
      //       'Region__r':''
      //     },{
      //       'Id':'2',
      //       'Name':'00Survey21',
      //       'From_Date__c':'01/03/2021',
      //       'To_Date__c':'01/07/2021',
      //       'month__c':'June',
      //       'Region__r':''
      //     }];
      //      console.log("surveyList",surveyList);
    let visibleNode = [];

   
      if ( surveyList && Object.values(surveyList)) {
        let filteredSurveysList = Object.values(surveyList);
        if (filteredSurveysList.length) {
          visibleNode = (
            <FlatList
              key={'Surveys'}
              data={filteredSurveysList}
              renderItem={({ item }) => this.getSurveyCardNode(item)}
              keyExtractor={item => item.sfid}
               onRefresh={() => this.fetchSurveysCall()}
               refreshing={getSurveysLoader}
            />
          );
        } else {
          visibleNode = <NoDataFound text={'No Surveys Found'} />
        }
      } else if (getSurveysLoader) {
        visibleNode = <Loading />
      } else if (surveyList && !surveyList.length && !getSurveysLoader) {
        visibleNode =(
          <NoDataFound text={'No Surveys Found.'}>
            <GenericIcon
              name={'refresh'}
              onPress={() =>this.fetchSurveysCall()}
              style={{ color: Colors.button, fontSize: 35, alignSelf: 'center', padding: 10 }}
            />
          </NoDataFound>
        )
      }
    



    



    return (
      <View style={Style.container}>
        <View>
          {visibleNode}
        </View>
        
    
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  user_details: state.user.user_details,
  offset: state.retailers.retailersOffset,
  limit: state.retailers.retailersLimit,
  // agentAreas: state.user.agentAreas,
   surveyList: state.survey.surveyList,
   getSurveysLoader: state.survey.getSurveysLoader,
  // city: state.user.agentAreas,
  // agentTransport: state.user.agentTransport,


  
});

const mapDispatchToProps = (dispatch) => ({
  fetchSurveys: (params) => dispatch(SurveyActions.getSurveys(params)),
  // startSurvey: (params) => NavigationService.navigate('SurveyFormScreen',{data:item}),
  startSurvey: (params) => dispatch(SurveyActions.startSurvey(params))
  
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(SurveyListScreen);