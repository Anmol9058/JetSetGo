import BlueButton from 'App/Components/BlueButton';
import InputText from 'App/Components/FormInput/InputText';
import GenericIcon from 'App/Components/GenericIcon';
import ImagePicker from 'App/Components/ImagePicker';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import Select from 'App/Components/Select';
import { SUBMIT } from 'App/Constants';
import VisitsActions from 'App/Stores/Visits/Actions';
import { CheckBox, Label } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity,Keyboard,TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Style from './VisitFormStyles';
import VisitInfoFormEntity from './VisitInfoFormEntity'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  AddStockFormEntity from './AddStockFormEntity'
import _ from 'lodash';
import NavigationService from 'App/Services/NavigationService'

class UpdateStockForm extends Component {

  componentDidMount() {
    const {
      token,
      //getCompetitor,
      getStock,

    } = this.props;

  //  getCompetitor({token})
   // getStock({token})
    //this.fetchProductsCall();
  }
  submit(){
		const { 
			submitForm, 
			form,
      token,
      executeVisitData,
		
		} = this.props;

		Keyboard.dismiss(); 
		submitForm({
			form,
      token,
      visit__c:executeVisitData.sfid
		});
	}

  render() {
    const {
      add,
      form,
      loader,
      validation,
      changeForm,
      removeForm,
      addForm,
      submitFormloading ,
      stockData,
      submitForm,
      token,
      
    } = this.props;
    let brandsNode= [];

		if (stockData.length) {
			stockData.map((obj, index) => {
        		brandsNode.push(<AddStockFormEntity form={obj} key={obj.sfid} show={true} changeForm={(params) => changeForm({...params, id: obj.id})}
            submitForm={(params)=> submitForm({...params, token})}
            />)
        	});
		}

    return (
      <View style={Style.addInfoContainer}>
    {  //  <ScrollView>
          
            //visitInfoFormMultiple.map((obj) => {
            //  return(
              //  <VisitInfoFormEntity 
                //  form={obj} 
                 // key={obj.id} 
                 // validation={{}} 
                 // retailerCompetitors={retailerCompetitors} 
                 // visibilityLevelList={visibilityLevelList}
                 // productCategoryDisplayList={productCategoryDisplayList}
                 // changeForm={(params) => editVisitInfoEntity({...params, id: obj.id})}
                 // removeForm={() => removeVisitInfoEntity(obj.id)}
                ///>
             // )
           // })
          
       // </ScrollView>
      }
      <View style={{backgroundColor:Colors.white, borderWidth:1, borderColor:Colors.black, marginTop:'5%', height:hp('70%'), marginLeft:'2%', marginRight:'2%'}}>
     

              <TouchableHighlight
								style={{ paddingTop: 2, position: 'absolute', right: 0, paddingRight: 8 }}
                onPress={NavigationService.goback}
                >
                <GenericIcon name={'close-circle'} 
                show={true}
                style={{ fontSize: 35, color: Colors.button }} />
							</TouchableHighlight> 

              
      <Text style={Style.AddformHeading}>{' Edit  Stock'}</Text>
      <ScrollView>
      {brandsNode}
      </ScrollView>
      
       
        </View>
     
            
      { //<View style={Style.action}>
           // <BlueButton
           //   style={Style.button}
              //rounded
             // large
           //   title={SUBMIT}
             // disabled={loader}
           //   loading={loader}
            //  onPress={() => add(visitInfoFormMultiple)}
           // />
      //  </View>
    }
        
      </View>
    )
  }
}



const mapStateToProps = (state) => ({
  token: state.user.token,
  form: state.visits.AddStockForm,
  loader: state.visits.addVisitInfoLoader,
  validation: state.visits.visitInfoFormValidation,
  visibilityLevelList: state.visits.visibilityLevelList,
  retailerCompetitors: state.retailers.retailerCompetitors,
  visitInfoFormMultiple: state.visits.visitInfoFormMultiple,
  productCategoryDisplayList: state.products.productCategoryDisplayList,
  submitFormloading 			: state.visits.StockSubmitLoader,
  executeVisitData:    state.visits.executeVisitData,
  competitorData: state.visits.visitCompetitor,
  competitorLoader: state.visits.getVisitCompetitorLoader,
  stockData: state.visits.visitStock,
  stockLoader: state.visits.getVisitStockLoader,
  Competitors: state.retailers.retailerCompetitors,
});

const mapDispatchToProps = (dispatch) => ({
  add: (params) => dispatch(VisitsActions.addVisitInfo(params)),
  submitForm: (params) 	   => dispatch(VisitsActions.submitUpdateStockForm(params)),
  changeForm: (params) 	   => dispatch(VisitsActions.changeUpdateStockForm(params)),
  addForm:(params)     	   => dispatch(VisitsActions.addStockForm(params)),
  removeForm: (params)       => dispatch(VisitsActions.removeStockForm(params)),
  getStock: (params) => dispatch(VisitsActions.getStock(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UpdateStockForm)