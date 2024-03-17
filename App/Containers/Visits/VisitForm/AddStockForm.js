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

class AddStockForm extends Component {

  componentDidMount() {
    const {
      token,
      getStock,

    } = this.props;
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
      visit__c:executeVisitData.sfid ?executeVisitData.sfid :executeVisitData.pg_id__c
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
      
    } = this.props;
    let brandsNode= [];

		if (form.length) {
			form.map((obj, index) => {
        		brandsNode.push(<AddStockFormEntity form={obj} key={obj.id + index} removeForm={(params) => removeForm(params)} changeForm={(params) => changeForm({...params, id: obj.id})}/>)
        	});
		}

    return (
      <View style={Style.addInfoContainer}>
   
      <View style={{backgroundColor:Colors.white, borderWidth:1, borderColor:Colors.black, marginTop:'0%', height:hp('70%'), marginLeft:'2%', marginRight:'2%'}}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
 

              <TouchableHighlight
								style={{ paddingTop: 2, position: 'absolute', right: 0, paddingRight: 8 }}
                onPress={NavigationService.goback}
                >
                <GenericIcon name={'close-circle'} 
                show={true}
                style={{ fontSize: 35, color: Colors.button }} />
							</TouchableHighlight> 

              </View>      
      <Text style={Style.AddformHeading}>{' Add Stock'}</Text>
      <ScrollView>
      {brandsNode}

      <BlueButton
						style={{...Style.button, marginBottom: hp('10%'), marginTop: hp('5%')}}
						rounded
						large
						title={'Save'}
						loading={submitFormloading}
						onPress={() => this.submit()}
					/> 
      </ScrollView>
      <TouchableOpacity
          style={Style.addPlusIcon}
          onPress={() => addForm({id: _.uniqueId(),})}>
          <GenericIcon
            name={'add'}
            style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
          />
        </TouchableOpacity>  
       
     
      
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
  submitForm: (params) 	   => dispatch(VisitsActions.submitStockForm(params)),
  changeForm: (params) 	   => dispatch(VisitsActions.changeStockForm(params)),
  addForm:(params)     	   => dispatch(VisitsActions.addStockForm(params)),
  removeForm: (params)       => dispatch(VisitsActions.removeStockForm(params)),
  getStock: (params) => dispatch(VisitsActions.getStock(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (AddStockForm)