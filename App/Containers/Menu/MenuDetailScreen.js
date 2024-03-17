import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity,ScrollView,Dimensions } from 'react-native';
import {Spinner } from 'native-base';
import NavigationService from 'App/Services/NavigationService'

import SelectionButton from 'App/Components/SelectionButton';
import {ApplicationStyles, Colors} from 'App/Theme';
import GenericIcon from 'App/Components/GenericIcon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuInfoTuple from  './MenuInfoTuple'
import { TextInput,} from "react-native-paper";
import AgentInfo from 'App/Components/AgentInfo';


class MenuDetailScreen extends Component {

    componentDidMount() {
			
	}

	fetchCall() {
	
	}
 

    render() {
        const {
            data,
            businessChannel,
            psmList 
        } = this.props;
        
     

        return (
           
            <View style={Styles.mainContainer}>
                <MenuInfoTuple
                data={data} 
                Show={true}
                />
               

        <ScrollView style={{...Styles.box,}}>
          <AgentInfo heading={'SFA Code'} value={data.name} />
          <AgentInfo heading={'Designation'} value={data.designation__c?data.designation__c:'NA'} />
          <AgentInfo heading={'Manager'} value={data.team_manager_name?data.team_manager_name:'NA'} />
          <AgentInfo heading={'ZSM'} value={data.manager_name?data.manager_name:'NA'} />
         
       {  businessChannel=='Wholesale'|| psmList&&psmList.length?[]:
       <>
          <View>
	   		<Text style={{	fontSize: wp('5%'),
  	fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.primary,
    marginTop: hp('4%'),
    marginBottom:hp('0%')}} >{'Area'}</Text>
	   	</View>
       <View style={{...Styles.textContainer}}>
  {  data.team_area_result&&data.team_area_result.length&&data.team_area_result[0].area? data.team_area_result[0].area.map((obj,index)=><Text style={{...Styles.value, marginTop:'3%'}}>{index+1} {obj.area_name__c}</Text>  ):[]}
     </View>
     </>
    }

     <View>
	   		<Text style={{	fontSize: wp('5%'),
  	fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.primary,
    marginTop: hp('5%'),
    marginBottom:hp('0%')}} >{'City'}</Text>
	   	</View>
       <View style={{...Styles.textContainer, marginBottom:'1%'}}>
  {  data.team_area_result&&data.team_area_result.length&&data.team_area_result[0].city? data.team_area_result[0].city.map((obj,index)=><Text style={{...Styles.value, marginTop:'5%'}}>{index+1} {obj.area_name__c}</Text>  ):[]}
     </View>
        </ScrollView>
                </View>

                
           
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.user.user_details,
    businessChannel	: state.user.user_details? state.user.user_details.business_channel__c:'',
    psmList               	: state.user.psmList
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MenuDetailScreen)


const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp('0%') ,
       
       
         
     
    },
    input: { marginVertical: 10, width:'80%' , height:'7.5%', backgroundColor:Colors.white},

    progressContainer: {
        width: wp('90%'), 
        alignItems: 'center', 
        justifyContent: 'center',
        alignSelf: 'center',
        height: hp('14%'), 
        backgroundColor: Colors.lightGrey,
        marginBottom: hp('8%'),
        borderRadius: wp('1.5%'),
        position: 'relative'
    },
    value: {
        fontSize: wp('4%'),
        fontFamily: ApplicationStyles.textMsgFont,
        color: Colors.primary
    },
    box: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 30,
        marginVertical: 5,
        padding: 15,
        borderRadius: 10,
        position: 'relative'
      },
      textContainer: {
        width: '100%',
        backgroundColor: Colors.lightGrey,
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 7 ,

        //marginBottom:"5%"
    },
    name: {
        color: Colors.darkGrey,
        fontSize: wp('3.8%'),
        fontFamily: ApplicationStyles.textMsgFont,
        textTransform: 'capitalize',
        marginBottom: hp('.1%'),
    },

    info: {
        color: Colors.darkGrey,
        fontSize: wp('3.3%'),
        fontFamily: ApplicationStyles.textMsgFont,
        textTransform: 'capitalize',
        marginBottom: hp('.1%'),
    },
    
    countText: {
        color: Colors.grey,
        fontSize: wp('3%'),
        marginBottom: hp('.5%'),
        marginTop: hp('1%'),
        fontFamily: ApplicationStyles.textMsgFont,
    },
    
    loadingIcon: {
        color: Colors.primary, 
        fontSize: wp('4%'),
        alignSelf: 'center', 
        position: 'absolute',
        right: wp('2.3%'),
        top: -hp('2.3%'),
        zIndex: 2
    }
});

