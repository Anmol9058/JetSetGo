import React, { Component } from "react";
import {View,TouchableOpacity,Text, ScrollView, TextInput} from "react-native";
import Style from "./ComplaintsSecondScreenStyle";
import BackArrow from "App/Components/BackArrowButton/BackArrowButton";

import { Badge, Button } from "native-base";
import { Colors, ApplicationStyles } from 'App/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextArea from 'App/Components/FormInput/TextArea';
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import { connect } from "react-redux";
import CommonActions from 'App/Stores/Common/Actions';
import ImageSlider from 'App/Components/ImageSlider';
import { HelperService } from 'App/Services/Utils/HelperService';
import GenericIcon from 'App/Components/GenericIcon';
class ComplaintsSecondScreen extends Component{
    componentDidMount() {
      //  this.fetchCall()
      }
    
    
      fetchCall() {
        const {
          openModal
         
        } = this.props
    
        openModal({});
     
      }


render(){

    const{
        data,
    }=this.props.route.params;

    const{
        openModal,
    }=this.props
  //  console.log(data.attachments__c?data.attachments__c.split(' '): '0');

    return(
       <ScrollView  showsVerticalScrollIndicator={false}
       >
        <View style={Style.container2}>

            <View style={{width:wp('10'),height:30,backgroundColor:'#fff'}}>

            <TouchableOpacity >

             < BackArrow style={{ marginLeft: 10, marginTop: 20 }}
             onPress={() => {navigation.goBAck() }}

             />
             </TouchableOpacity>
             </View> 

                
         <View style={{alignItems:'center',marginTop:31}}>
       
         <Text style={{fontSize:26,color:'#000000',marginLeft:24}}>Complaint</Text>
        
        </View>

<View style={{marginTop:10,justifyContent:'center'}}>

<Text style={Style.text_}>Date</Text>
    <View style={Style.box1} >
    <Text > {HelperService.dateReadableFormat(data.date_raised__c)}</Text>
							
	</View>

    <Text style={Style.text_}>Ticket No.</Text>
    <View style={Style.box1} >
    <Text > {data.name}</Text>
							
	</View>
<Text style={Style.text_}>Category</Text>

    
   
    <View style={Style.box1} >
   
    <Text > {data.complaint_type_name} </Text>
							
	</View>
    
   
 			
    <Text style={Style.text_}>Sub Category</Text>
    <View style={Style.box1} >
    <Text > {data.complaint_sub_type_name}</Text>
							
	</View>
 
   
   
   

   
    
       <Text style={Style.text_}>Order no.</Text>
       <View style={Style.box1} >
    
    <Text >{data.order_name}</Text>
							
	</View>


    <Text style={Style.text_}>Invoice no.</Text>
    <View style={Style.box1} >
    <Text > {data.invoice_name} </Text>
							
	</View>

    </View>
     
    <Text style={Style.text_}>Description</Text>
    
    <View style={Style.box} >
    <Text > {data.description__c} </Text>
							
	</View>

    </View>


<View style={{width:'90%',alignSelf:'center',marginTop:30,marginBottom:20}}>
<GenericDisplayCardStrip key={'Attachment:'} label={'Attachment:'} value={<Text style={data.complaint_url&&data.complaint_url.length ? {textDecorationLine: 'underline', color: '#1890ff'} : {}} onPress={() => {
                            return openModal({
                                    content:<View style={{flex: 1}}><ImageSlider images={data.complaint_url&&data.complaint_url.length ? data.complaint_url : []} /></View>, 
                                    heading: 'Preview', 
                                    bodyFlexHeight: .7
                            })}}>{data.complaint_url? 'View' : 'No file'}</Text>}/>
</View>


 
       
             </ScrollView>

    );
}

}
const mapStateToProps = (state) => ({
    id: state.user.id,
    token: state.user.token
  });
  
  const mapDispatchToProps = (dispatch) => ({
       openModal:(params)		   => dispatch(CommonActions.openModal(params)),
      closeModal:(params)		   => dispatch(CommonActions.closeModal(params))
  })
  
export default connect(mapStateToProps,mapDispatchToProps)( ComplaintsSecondScreen);