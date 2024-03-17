import React, { Component } from 'react'
import { View, ScrollView, Text, Image, Alert } from 'react-native'
import { Button, Textarea } from 'native-base'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Style from './VisitFormStyles'
import InputText from 'App/Components/FormInput/InputText'
import TextArea from 'App/Components/FormInput/TextArea'
import Select from 'App/Components/Select'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import SearchableDropdown from 'App/Components/SearchableDropdown'
import {
  NEW_RETAILER,
  RETAILER_NAME,
  AREA,
  DISTRIBUTOR,
  CATEGORY,
  CR_LIMIT,
  REMAINING_CR_LIMIT,
  OWNER_NAME,
  OWNER_NUMBER,
  SUBMIT,
} from 'App/Constants'
import NavigationService from 'App/Services/NavigationService'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { HelperService } from 'App/Services/Utils/HelperService'
import { Colors } from 'react-native/Libraries/NewAppScreen'

class NewUnplannedVisit extends Component {
  // componentDidMount() {
  // 	this.props.clearRetailerForm();
  // }

  // componentWillUnmount() {

  // }

  // submit() {
  // 	var dummy_data = {
  // 	    "name": "Rohit Ramawat23",
  // 	    "email": "rohit1.ramawat@zoxima.com",
  // 	    "mobile_contact": "9001897111",
  // 	    "potential_value": "10000",
  // 	    "potential_retailer": "Test retailer",
  // 	    "dealer": "0012h000005wUcRAAU",
  // 	    "category": "A",
  // 	    "retailer_category": "Test",
  // 	    token: this.props.token,
  //      	agentid: this.props.agentid
  // 	}

  // 	this.props.createRetailer({...this.props.retailerForm, ...{token: this.props.token,
  //      	agentid: this.props.agentid}});
  // }

  // onAreaChange(value) {
  // 	this.props.changeRetailerForm({edited_field: 'area__c', edited_value: value});
  // 	this.props.fetchDealers({
  //       token: this.props.token,
  //       agentid: this.props.agentid,
  //       offset: this.props.retailersOffset,
  //       limit: this.props.retailersLimit,
  //       area: value
  // 	});
  // }

  render() {
    const { retailerForm, validation } = this.props
    return (
      <View style={Style.container}>
        {/* <Text style={Style.heading}>{NEW_RETAILER}</Text> */}
        <ScrollView style={Style.action}>
          {/* <InputText
            style={Style.mb10}
            placeholder={RETAILER_NAME + '*'}
            value={retailerForm.name}
            onChange={(value) =>
              this.props.changeRetailerForm({ edited_field: 'name', edited_value: value })
            }
            error={validation.invalid && validation.invalid_field == 'name'}
            label={'Visibility level'}
          /> */}
          <Select
            list={[
              { value: 0, label: 'Low' },
              { value: 1, label: 'High' },
            ]}
          />

          {/* <InputNumber
            styles={Style.mb10}
            placeholder={'Phone' + '*'}
            value={retailerForm.mobile_contact__c}
            onChange={(value) =>
              this.props.changeRetailerForm({
                edited_field: 'mobile_contact__c',
                edited_value: value,
              })
            }
            error={validation.invalid && validation.invalid_field == 'mobile_contact__c'}
            label={'Mobile*'}
          /> */}

          <SearchableDropdown
            dataSource={this.props.agentAreas}
            placeHolderText={'Select Area*'}
            selectedValue={retailerForm.area__c}
            onChange={(value) =>
              this.props.changeRetailerForm({ edited_field: 'area__c', edited_value: value })
            }
            placeholder={'Type or Select Area'}
            invalid={false}
            customPickerStyles={{ ...Style.picker }}
            labelStyles={{ ...Style.pickerLabel }}
            invalid={validation.invalid && validation.invalid_field == 'area__c'}
            label={'Top visible brands'}
          />
         

          <BlueButton
            style={Style.button}
            rounded
            large
            title={SUBMIT}
            disabled={this.props.createRetailerLoader}
            loading={this.props.createRetailerLoader}
            onPress={() => this.submit()}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  retailersOffset: state.retailers.retailersOffset,
  retailersLimit: state.retailers.retailersLimit,
  retailerForm: state.retailers.retailerForm,
  validation: state.retailers.retailerFormValidation,
  createRetailerLoader: state.retailers.createRetailerLoader,
  retailerCompetitors: state.retailers.retailerCompetitors,
  categories: state.retailers.categories,
  // retailerCompetitors: state.retailers.retailerCompetitors,
  dealersSearchList: state.retailers.dealersSearchList,
  agentAreas: state.user.agentAreas,
})

const mapDispatchToProps = (dispatch) => ({
  changeRetailerForm: (params) => dispatch(RetailersActions.changeRetailerForm(params)),
  createRetailer: (params) => dispatch(RetailersActions.createRetailer(params)),
  fetchRetailerCompetitors: (params) => dispatch(RetailersActions.fetchRetailerCompetitors(params)),
  fetchDealers: (params) => dispatch(RetailersActions.fetchDealers(params)),
  clearRetailerForm: () => dispatch(RetailersActions.clearRetailerForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewUnplannedVisit)
