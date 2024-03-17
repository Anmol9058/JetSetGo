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
import { ScrollView, Text, View, TouchableOpacity ,Keyboard,TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import Style from './VisitFormStyles';
import VisitInfoFormEntity from './VisitInfoFormEntity'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  AddCompetitorFormEntity from './AddCompetitorFormEntity'
import _ from 'lodash';

class UpdateCompetitorForm extends Component {
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
      submitFormloading,
      competitorData,
      token,
      submitForm
     
      
    } = this.props;
    let brandsNode= [];

		if (competitorData.length) {
            competitorData.map((obj, index) => {
        		brandsNode.push(<AddCompetitorFormEntity form={obj} key={obj.sfid } show={true} changeForm={(params) => changeForm({...params, id: obj.id})}
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

                  
      <Text style={Style.AddformHeading}>{'Edit Competitor'}</Text>
      <ScrollView>
      {brandsNode}
      </ScrollView>
      
       { 
      // <BlueButton
						//style={Style.button}
						//rounded
						//large
						//title={'Save'}
						//loading={submitFormloading}
					//	onPress={() => this.submit()}
       ///> 
       }
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
  submitForm: (params) 	   => dispatch(VisitsActions.submitUpdateCompetitorForm(params)),
  changeForm: (params) 	   => dispatch(VisitsActions.changeUpdateCompetitorForm(params)),
  addForm:(params)     	   => dispatch(VisitsActions.addCompetitorForm(params)),
	removeForm: (params)       => dispatch(VisitsActions.removeCompetitorForm(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UpdateCompetitorForm)