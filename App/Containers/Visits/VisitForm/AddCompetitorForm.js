import BlueButton from 'App/Components/BlueButton';
import InputText from 'App/Components/FormInput/InputText';
import GenericIcon from 'App/Components/GenericIcon';
import ImagePicker from 'App/Components/ImagePicker';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import NavigationService from 'App/Services/NavigationService'
import Select from 'App/Components/Select';
import { SUBMIT } from 'App/Constants';
import VisitsActions from 'App/Stores/Visits/Actions';
import { CheckBox, Label } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity ,Keyboard,TouchableHighlight,KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux';
import Style from './VisitFormStyles';
import VisitInfoFormEntity from './VisitInfoFormEntity'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  AddCompetitorFormEntity from './AddCompetitorFormEntity'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash';

class AddCompetitorForm extends Component {
  componentDidMount() {
    const {
      token,
      getCompetitor,
      //getStock,

    } = this.props;

  // getCompetitor({token})
    //getStock({token})
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
      submitFormloading,
      competitorData
     
      
    } = this.props;
    let brandsNode= [];

		if (form.length) {
			form.map((obj, index) => {
        		brandsNode.push(<AddCompetitorFormEntity form={obj} key={obj.id + index} removeForm={(params) => removeForm(params)} changeForm={(params) => changeForm({...params, id: obj.id})}/>)
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
      <View style={{backgroundColor:Colors.white, borderWidth:1, borderColor:Colors.black, marginTop:'0%',  marginLeft:'2%', marginRight:'2%'}}>
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
      <Text style={Style.AddformHeading}>{' Add Competitor'}</Text>
      <KeyboardAwareScrollView
  
  >
     
      {brandsNode}
   
      <BlueButton
						style={{...Style.button, marginTop:'0%', marginBottom:hp('10%')}}
						rounded
						large
						title={'Save'}
						loading={submitFormloading}
						onPress={() => this.submit()}
					/> 
        
        </KeyboardAwareScrollView>
      <TouchableOpacity
          style={Style.addPlusIcon}
          onPress={() => addForm({id: _.uniqueId()})}>
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
  form: state.visits.AddCompetitorForm,
  loader: state.visits.addVisitInfoLoader,
  validation: state.visits.visitInfoFormValidation,
  visibilityLevelList: state.visits.visibilityLevelList,
  retailerCompetitors: state.retailers.retailerCompetitors,
  visitInfoFormMultiple: state.visits.visitInfoFormMultiple,
  productCategoryDisplayList: state.products.productCategoryDisplayList,
  submitFormloading 			: state.visits.CompetitorSubmitLoader,
  executeVisitData:    state.visits.executeVisitData,
  competitorData: state.visits.visitCompetitor,
  competitorLoader: state.visits.getVisitCompetitorLoader,
  stockData: state.visits.visitStock,
  stockLoader: state.visits.getVisitStockLoader,
  Competitors: state.retailers.retailerCompetitors,
});

const mapDispatchToProps = (dispatch) => ({
 // changeForm: (params) => dispatch(VisitsActions.changeVisitInfoForm(params)),
  add: (params) => dispatch(VisitsActions.addVisitInfo(params)),
  submitForm: (params) 	   => dispatch(VisitsActions.submitCompetitorForm(params)),
  changeForm: (params) 	   => dispatch(VisitsActions.changeCompetitorForm(params)),
  addForm:(params)     	   => dispatch(VisitsActions.addCompetitorForm(params)),
  removeForm: (params)       => dispatch(VisitsActions.removeCompetitorForm(params)),
  getCompetitor: (params) => dispatch(VisitsActions.getCompetitor(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (AddCompetitorForm)