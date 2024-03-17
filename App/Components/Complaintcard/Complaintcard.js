import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip';
import ImageSlider from 'App/Components/ImageSlider';
import CommonActions from 'App/Stores/Common/Actions';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import NavigationService from '../../Services/NavigationService';
import { ApplicationStyles, Colors, Metrics } from '../../Theme';

class Complaintcard extends Component{
    render() { 

      const {
        data,date,ticketno,category,
  dark = false,sub_category,
  openModal
     
      } = this.props
      
   return(
     <TouchableOpacity onPress={()=>NavigationService.navigate('ComplaintsSecondScreen',{data:data} )}>
     <View style={{flex:1,marginTop:3,marginBottom:7}}>
   <View style={dark ? Style.darkCard : Style.card}>
        <View>
<GenericDisplayCardStrip label={'Date:'} value={date}     />
<GenericDisplayCardStrip label={'Ticket No:'} value={ticketno}    />
<GenericDisplayCardStrip label={'Order No:'} value={data.order_name}    />
{data.invoice_name?<GenericDisplayCardStrip label={'Invoice No:'} value={data.invoice_name}    />:[]}
<GenericDisplayCardStrip label={'Category:'} value={category}     />
<GenericDisplayCardStrip label={'Sub-Category:'} value={sub_category}    />


<GenericDisplayCardStrip key={'Attachment:'} label={'Attachment:'} value={<Text style={data.complaint_url&&data.complaint_url.length ? {textDecorationLine: 'underline', color: '#1890ff'} : {}} onPress={() => {
                            return openModal({
                                    content:<View style={{flex: 1}}><ImageSlider images={data.complaint_url&&data.complaint_url.length ? data.complaint_url : []} /></View>, 
                                    heading: 'Preview', 
                                    bodyFlexHeight: .7
                            })}}>{data.complaint_url? 'View' : 'No file'}</Text>}/>





        </View>
    </View>
    </View>
</TouchableOpacity>

   );

                          }
}
const mapStateToProps = (state) => ({
  id: state.user.id,
  token: state.user.token
});

const mapDispatchToProps = (dispatch) => ({
    openModal:(params)           => dispatch(CommonActions.openModal(params)),
    closeModal:(params)           => dispatch(CommonActions.closeModal(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Complaintcard)






const Style = StyleSheet.create({
    card: {
      ...Metrics.normalPadding,
      backgroundColor: Colors.lightGrey,
      borderRadius: 10,
      marginTop: 20,
      width: Dimensions.get('window').width - 30,
      elevation: 3,
      alignSelf: 'center'
    },
    darkCard: {
      ...Metrics.normalPadding,
      width: wp('92%'),
      backgroundColor: Colors.label,
      borderRadius: 10,
      margin: 5,
      elevation: 3,
      alignSelf: 'center'
    },
    darkDetail: {
      fontSize: wp('3.5%'),
      color: Colors.clrF1F9FF,
      fontFamily: ApplicationStyles.textMsgFont
    },
    darkTitle: {
      color: Colors.white,
      fontFamily: ApplicationStyles.textMsgFont,
      fontSize: wp('4.5%'),
      marginBottom: 5,
      textTransform: 'uppercase',
    },
    trashButtonIcon: {
      color: Colors.error,
      fontSize: wp('6%'),
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
      right: 10,
      padding: 5,
      marginBottom:5,
    },
  
    darkTtl: {
      color: Colors.clrF1F9FF,
      fontSize: wp('3.5%'),
      fontFamily: ApplicationStyles.textFont
    },
    detail: {
      color: Colors.clr66,
      fontSize: 15,
      fontFamily: ApplicationStyles.textMsgFont
    },
    strip: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: Colors.primary,
      fontFamily: ApplicationStyles.textMsgFont,
      fontSize: 18,
      marginBottom: 5,
      textTransform: 'uppercase',
    },
    ttl: {
      color: Colors.clr66,
      fontSize: 15,
      fontFamily: ApplicationStyles.textFont
    },
    countBadge: {
      backgroundColor: Colors.button,
      borderRadius: hp('3%'),
      padding: 0,
      height: hp('3%'),
      width: hp('2.8%'),
      position: 'absolute'
    },
    countBadgeText: {
       color: Colors.white,
       fontSize: hp('2%'),
    }
  })