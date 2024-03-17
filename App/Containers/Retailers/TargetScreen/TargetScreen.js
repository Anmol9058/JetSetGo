import CircularProgressBar from 'App/Components/CircularProgressBar'
import Loading from 'App/Components/Loading'
import Separator from 'App/Components/Separator'
import SingleInfo from 'App/Components/SingleInfo'
import DashboardActions from 'App/Stores/Dashboard/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import _ from 'lodash';
import { Text, Icon } from 'native-base'
import React,{Component} from 'react';
import GenericIcon from 'App/Components/GenericIcon';
import { FlatList, Dimensions } from 'react-native'
import { View, StyleSheet ,ScrollView,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
// import Style from './DashboardScreenStyle'
//import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';


import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { VictoryBar, VictoryChart, VictoryTheme,VictoryGroup } from "victory-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class Targets extends Component {


    componentDidMount() {

        this.fetchCall();
    }


    fetchCall() {
        const{
            getTargetTeam,
            data,
            agentid,searchFilters,
            user_details,
        }=this.props
       // console.log(searchFilters);
       // console.log(getTargetTeam);
       getTargetTeam({
          team_id__c:user_details.sfid,
          Month__c:searchFilters['selectedMonth'],
          Year__c:(new Date(HelperService.getCurrentTimestamp())).getFullYear(),

       });
    
    }
   
	onMonthChange(month) {
		const {
			token,
			selectedRetailer,
			searchFilters,
      changeSearchFilters,
	  getTargetTeam,
    user_details,
    
			
		} = this.props;

		changeSearchFilters({
			edited_field: 'selectedMonth',
			edited_value: month
		});
	//	let sfid = selectedRetailer.id;
		let requestParams = {
			Year__c: (new Date(HelperService.getCurrentTimestamp())).getFullYear() ,
            dealer__c: selectedRetailer.id,
            Month__c:  HelperService.getMonthMappingFullName(month),
      // `${searchFilters['selectedYear']}-${month+1}-${HelperService.getCurrentDate()}`,
		//	token,
		
		}

      getTargetTeam(requestParams);
    }
     
      
    

  render(){
const{
    data,
    searchFilters
}=this.props;
//console.log( HelperService.convertToGraphableListFormat({list:data,id_key:'product_name'==null?'actual_1__c':'product_name',label_key:'target_in_value__c'}));
//console.log( HelperService.convertToGraphableListFormat({list:data,id_key:'product_name'==null?'actual_1__c':'product_name',label_key:'actual_2__c'}));

let monthPickerNode = (
  <View
    style={styles.monthPicker}>
    <Text style={styles.dateText}>{HelperService.getMonthMappingName(searchFilters['selectedMonth'])}
    </Text>
  </View>
);
let visiblePickerNode = [];
	
visiblePickerNode = (<View style={{ flexDirection: 'row', width: wp('43%'), marginLeft:'4%' }}>
  <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getPreviousMonth(searchFilters['selectedMonth']))}>
    <GenericIcon
      name={'keyboard-arrow-left'}
      //show={true}
      style={styles.dateChangeIcon}
    />
  </TouchableOpacity>
  {monthPickerNode}
  <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getNextMonth(searchFilters['selectedMonth']))}>
    <GenericIcon
      name={'keyboard-arrow-right'}
      //show={true}

      style={styles.dateChangeIcon}
    />
  </TouchableOpacity>
</View>);

        
        return (
            <ScrollView style={{flex:1,marginTop:'-95%'}}>
              
              <View style={{justifyContent:'center'}}>
        <Text style={{ fontWeight: 'bold',textAlign:'center',fontSize:hp('2.5%') }}>Target VS Actual</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp('0%'), marginTop:hp('0%') }}>
					
						
					{visiblePickerNode}

            <View style={{ borderWidth: 1, borderColor: 'black', height: 70, width: 120,marginLeft:wp('12%') }}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{ padding: 10, fontWeight: 'bold' }}>Target</Text>
                        <View style={{width:15,height:15,backgroundColor:'#20d236',marginTop:15}}></View>
                        
                        
                        </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:10, fontWeight: 'bold' }}>Actual</Text>
                        <View style={{width:15,height:15,backgroundColor:'#f60957',}}></View>
                        
                        
                        </View>
                       
                    </View></View>


                    <View style={{marginTop:'0%',marginLeft:'5%'}}>
                    <VictoryChart
                         theme={VictoryTheme.material}
                         width={350}
                         height={400}
                         domainPadding={{ x:[40,20]}}
                        // domain={{x: [0, 100], y: [0, 1]}}
                        
                                    >
                            <VictoryGroup offset={20}>
                            <VictoryBar horizontal
                            // fixLabelOverlap={true}
                        //     minDomain={{ x: 2 }}
                          //barWidth={({ index }) => index * 2 + 20}
                          labels={({ datum }) => `${datum.y}`}
                            style={{
                              //  marginBottom:10,
                            data: { fill: "#f60957",width:20}
                                }}
                                data={data&&data.length?HelperService.convertToGraphableListFormat({list:data,id_key:'product_name'?'product_name':'product_name'=='AAA',label_key:'actual_1__c'}):[]}

                        />
                        <VictoryBar 
                       // domainPadding={{ x: 40}}
                      // fixLabelOverlap={true}
                    //   minDomain={{ x: 2 }}
                      //  barWidth={({ index }) => index * 2 + 20}
                      labels={({ datum }) => `${datum.y}`}
                        style={{
                          data: { fill: "#20d236",width:20 }
                             }}
                        
                         data={data&&data.length?HelperService.convertToGraphableListFormat({list:data,id_key:'product_name'?'product_name':'product_name'=='AAA',label_key:'target_in_quantity__c'}):[]}
                             
                       />



</VictoryGroup>

</VictoryChart>         
       </View > 




               
            </ScrollView>

           
        );
    }

}


const mapStateToProps = (state) => ({
    token: state.user.token,
    data: state.dashboard.data.TargetTeam,
    agentid: state.user.sfid,
    user_details: state.user.user_details,
    selectedRetailer: state.retailers.selectedRetailer,
    searchFilters: state.dashboard.searchFilters,
});

const mapDispatchToProps = (dispatch) => ({
    getTargetTeam: (params) => dispatch(DashboardActions.getTargetTeam(params)),
    changeSearchFilters: (params) => dispatch(DashboardActions.updateSearchFilters(params)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Targets) 


const styles = StyleSheet.create({
    chart: {
        marginBottom: 30,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        width: 375,
        alignSelf: 'center', marginTop: 25,
    },
  	monthPicker: {
      alignSelf: 'center',
      backgroundColor: Colors.primary,
      borderRadius: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      width: wp('20%'),
    },
    dateChangeIcon: {
      color: Colors.primary,
      alignSelf: 'center',
      paddingHorizontal: wp('1%'),
      fontSize: wp('8.5%')
    },
    
    dateText: {
      fontFamily: ApplicationStyles.textMediumFont,
      color: '#ffffff',
      fontSize: wp('2.8%'),
      textTransform: 'capitalize'
    },
  
});
