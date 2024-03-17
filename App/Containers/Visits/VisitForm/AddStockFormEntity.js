import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Textarea } from 'native-base'
import { connect } from 'react-redux'
import Style from './VisitFormStyles';
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import Select from 'App/Components/Select';
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';

import GenericIcon from 'App/Components/GenericIcon';
import BrandComponent from 'App/Components/BrandComponent';
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AddStockFormEntity extends Component {
	constructor() {
        super();

        this.state = {
            show: false
        };

        
    }
	render() {
		const { 
			form, 
			changeForm, 
			removeForm,
			productCategory,
			show,
			loader,
			submitForm,
			searchFilters,
			editForm,
			disable
			
		} = this.props;
		return (
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.white,
          elevation: 5,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "4%",
          marginBottom: "4%",
          paddingVertical: "4%",
          paddingHorizontal: 5,
          borderRadius: 10,
          backgroundColor: Colors.white,
          position: "relative",
          width: "90%",
          alignSelf: "center",
        }}
      >
        {
          <BrandComponent
            list={productCategory}
            label={"Product Name*"}
			labelStyle={{height: hp('4.5%')}}
            value={form.product_family__c}
            changeForm={(value) =>
              changeForm({
                edited_field: "product_family__c",
                edited_value: value,
              })
            }
			textStyle={{marginTop: hp('3%'), justifyContent: 'centre', alignItem: 'centre'}}
            disabled={
              (show && !(searchFilters["StockEdit"] == form.pg_id__c)) ||
              disable
            }
          />
        }

        <View style={{ width: wp("38%"), marginTop: "1.6%" }}>
          {disable ? (
            <InputNumber
              styles={{ ...Style.brandInput, height: hp("4.8%") }}
              placeholder={
                this.props.user_details.business_channel__c == "Wholesale"
                  ? "Quantity(MT)"
                  : "Quantity(Box)"
              }
              value={form.quantity__c}
              onChange={(value) =>
                changeForm({ edited_field: "quantity__c", edited_value: value })
              }
              label={
                this.props.user_details.business_channel__c == "Wholesale"
                  ? "Quantity(MT)"
                  : "Quantity(Box)"
              }
              editable={
                !(show && !(searchFilters["StockEdit"] == form.pg_id__c))
              }
              //disabled={searchFilters['StockEdit']}
            />
          ) : (
            <InputNumber
              styles={{ ...Style.brandInput, height: hp("4.8%") }}
              placeholder={
                this.props.user_details.business_channel__c == "Wholesale"
                  ? "Quantity(MT)"
                  : "Quantity(Box)"
              }
              value={form.quantity__c}
              onChange={(value) =>
                changeForm({ edited_field: "quantity__c", edited_value: value })
              }
              label={
                this.props.user_details.business_channel__c == "Wholesale"
                  ? "Quantity(MT)"
                  : "Quantity(MT)"
              }
              editable={
                !(show && !(searchFilters["StockEdit"] == form.pg_id__c))
              }
              //disabled={searchFilters['StockEdit']}
            />
          )}
        </View>

        {show ? (
          <GenericIcon
            name={"edit"}
            //show={true}
            style={Style.trashButtonIcon}
            onPress={() =>
              searchFilters["StockEdit"] == form.pg_id__c
                ? editForm({ edited_field: "StockEdit", edited_value: "" })
                : editForm({
                    edited_field: "StockEdit",
                    edited_value: form.pg_id__c,
                  })
            }
          />
        ) : disable ? (
          []
        ) : (
          <GenericIcon
            name={"trash-can"}
            show={true}
            style={Style.trashButtonIcon}
            onPress={() => removeForm({ id: form.id })}
          />
        )}
        <View
          style={{
            width: wp("100%"),
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {form.pg_id__c && form.pg_id__c == searchFilters["StockEdit"] ? (
            <BlueButton
              //title={'Save'}
              style={Style.markLostButton}
              textStyle={Style.markLostButtonText}
              loading={loader && loader == form.pg_id__c}
              disabled={loader && loader == form.pg_id__c}
              onPress={() =>
                submitForm({
                  id: form.pg_id__c,
                  form: {
                    quantity__c: form.quantity__c,
                    product_family__c: form.product_family__c,
                  },
                })
              }
            >
              <GenericIcon
                name="floppy"
                show={true}
                style={Style.markLostButtonIcon}
              />
            </BlueButton>
          ) : (
            []
          )}
        </View>
      </View>
    );
	}
}


const mapStateToProps = (state) => ({
	productCategory: state.products.productCategoryDisplayList,
	loader: state.visits.UpdateStockSubmitLoader,
	searchFilters: state.visits.planVisit.searchFilters,
	user_details: state.user.user_details,
  });

  const mapDispatchToProps = (dispatch) => ({

});
  
  export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(AddStockFormEntity)