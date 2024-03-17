import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Spinner } from 'native-base';
import NavigationService from 'App/Services/NavigationService'

import SelectionButton from 'App/Components/SelectionButton';
import {ApplicationStyles, Colors} from 'App/Theme';
import GenericIcon from 'App/Components/GenericIcon';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MenuInfoTuple from  './MenuInfoTuple'
import Bookorder from './../Bookorder/bookorder'
import UserActions from 'App/Stores/User/Actions'

class MenuScreen extends Component {

    componentDidMount() {
			
	}

	fetchCall() {
	
    }
    submit(){
        const {
          logoutUser
        } = this.props;
    
          logoutUser({
            //user_logged_in: false,
          });
      }
 

    render() {
        const {
            data, 
            loading
        } = this.props;
        
       
        return (
           
            <View style={Styles.mainContainer}>
                < MenuInfoTuple
                data={data}
            loading={loading}
                onPressLogoout={()=>this.submit()}
                />
                <View style={{...ApplicationStyles.container,}}>
                 {   
                //  <SelectionButton 
                //        title="Orders" 
                //        style={{marginTop:'10%'}}
                //        icon={'shopping-cart'}
                //       //  onPress={() => NavigationService.navigate('Bookorder')}
                //    />
                 }
               

                   {/* {
                    <SelectionButton 
                        icon={'account-balance-wallet'}
                        title="Expense" 
                        style={{marginTop:'10%'}}
                        onPress={() => NavigationService.navigate('ExpenseMenuTabScreen')}
                      
                     />
                    } */}

                  {
                   <SelectionButton 
                      icon={'event-note'}
                       title="Survey" 
                        style={{marginTop:'10%'}}
                        onPress={() => NavigationService.navigate('SurveyListScreen')}
                    />
                  }
                  { 
                  <SelectionButton 
                        icon={'event-available'}
                        title="Product Catalogue"
                        onPress={() => NavigationService.navigate('ProductCategoryScreen')}
                        
                    />
                  }
                 {
                 // <SelectionButton 
                       // icon={'local-offer'}
                        //title="Schemes"
                        
                   // />
                 }
                </View>
                </View>
           
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.user.user_details,
    loading:          state.user.userLogoutIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: (data) => dispatch(UserActions.logoutUser(data)),
  
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MenuScreen)


const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp('0%') ,
          elevation: 10
     
    },
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
    textContainer: {
       // alignSelf: 'flex-start',
       // / paddingLeft: wp('8%')
    },
    countText: {
        color: Colors.grey,
        fontSize: wp('3%'),
        marginBottom: hp('.5%'),
        marginTop: hp('1%'),
        fontFamily: ApplicationStyles.textMsgFont,
    },
    refreshIcon: {
        color: Colors.primary, 
        fontSize: wp('5.5%'),
        alignSelf: 'center', 
        padding: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2
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


