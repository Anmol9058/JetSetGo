import BlueButton from "App/Components/BlueButton";
import InputText from "App/Components/FormInput/InputText";
import GenericIcon from "App/Components/GenericIcon";
import ImagePicker from "App/Components/ImagePicker";
import SearchableDropdown from "App/Components/SearchableDropdown";
import Select from "App/Components/Select";
import { SUBMIT } from "App/Constants";
import VisitsActions from "App/Stores/Visits/Actions";
import { CheckBox, Label } from "native-base";
import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import Style from "./VisitFormStyles";
import VisitInfoFormEntity from "./VisitInfoFormEntity";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from "App/Theme";
import NavigationService from "App/Services/NavigationService";
import GenericDisplayCard from "App/Components/GenericDisplayCard";
import ProductActions from "App/Stores/Products/Actions";
import { HelperService } from "App/Services/Utils/HelperService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MultipleImagePicker from "App/Components/ImagePicker/MultipleImagePicker";
import CommonActions from "App/Stores/Common/Actions";
import AddCompetitorFormEntity from "./AddCompetitorFormEntity";
import AddStockFormEntity from "./AddStockFormEntity";
import AttachmentDetail from "App/Components/AttachmentDetail";
import _ from "lodash";
import NoDataFound from "App/Components/NoDataFound";
import Loading from "App/Components/Loading";
import GenericDisplayCardStrip from "App/Components/GenericDisplayCard/GenericDisplayCardStrip";
import IndicatorInputText from "App/Components/FormInput/IndicatorInputText";

class VisitInfoForm extends Component {
  componentDidMount() {
    const {
      token,
      getCompetitor,
      getStock,
      fetchVisitInfo,

      fetchProductCategories,
      executeVisitData,
    } = this.props;
    console.log(executeVisitData);
    getCompetitor({ token, show: false });
    getStock({ token, show: false });
    fetchVisitInfo({ token, visit_id: executeVisitData.pg_id__c });
    fetchProductCategories({
      token,
      type: this.props.user_details.business_channel__c,
      party: executeVisitData.customer_sfid__c,
    });
  }
  componentWillUnmount() {
    const { clearAddInfoForm } = this.props;

    clearAddInfoForm();
  }

  getAttachmentInfoNode() {
    let visibleNode = [];
    const {
      fetchVisitInfoLoader,
      visitInfoMapping,
      executeVisitData,
      pg_id__c,
    } = this.props;

    if (
      !_.isEmpty(visitInfoMapping) &&
      visitInfoMapping[executeVisitData.pg_id__c] &&
      visitInfoMapping[executeVisitData.pg_id__c].url &&
      visitInfoMapping[executeVisitData.pg_id__c] &&
      visitInfoMapping[executeVisitData.pg_id__c].url.length
    ) {
      visibleNode = (
        <ScrollView>
          {visitInfoMapping[pg_id__c] &&
            visitInfoMapping[pg_id__c].url.map((obj, index) => (
              <View>
                <View style={Style.box}>
                  <GenericDisplayCardStrip
                    key={"Attchament" + index}
                    label={`Attachament ${index + 1} `}
                    labelStyle={{ ...Style.label, fontSize: wp("3.8%") }}
                    value={
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          color: "#1890ff",
                        }}
                        onPress={() => Linking.openURL(obj)}
                      >{`View`}</Text>
                    }
                  />
                </View>
              </View>
            ))}
        </ScrollView>
      );
    } else if (fetchVisitInfoLoader) {
      visibleNode = <Loading />;
    } else {
      visibleNode = [];
    }

    return visibleNode;
  }

  render() {
    const {
      add,
      form,
      token,
      loader,
      validation,
      changeForm,
      competitorData,
      uploadImageLoading,
      uploadImageField,
      uploadImage,
      stockData,
      submitUpdateStockForm,
      changeUpdateStockForm,
      submitUpdateCompetitorForm,
      changeUpdateCompetitorForm,
      changeAddPlannedVisitsSearchFilters,
      visitInfoMapping,
      clearAddInfoForm,
      fetchVisitInfoLoader,
      competitorLoader,
      stockLoader,

      pg_id__c,
    } = this.props;

    let brandsNode = [];

    if (competitorData.length) {
      competitorData.map((obj, index) => {
        brandsNode.push(
          <AddCompetitorFormEntity
            form={obj}
            key={obj.id}
            show={true}
            changeForm={(params) =>
              changeUpdateCompetitorForm({ ...params, id: obj.id })
            }
            submitForm={(params) =>
              submitUpdateCompetitorForm({ ...params, token })
            }
            editForm={(params) =>
              changeAddPlannedVisitsSearchFilters({ ...params })
            }
          />
        );
      });
    } else if (competitorLoader) {
      brandsNode = <Loading />;
    }

    let brandsNode1 = [];

    if (stockData.length) {
      stockData.map((obj, index) => {
        brandsNode1.push(
          <AddStockFormEntity
            form={obj}
            key={obj.id}
            show={true}
            changeForm={(params) =>
              changeUpdateStockForm({ ...params, id: obj.id })
            }
            submitForm={(params) => submitUpdateStockForm({ ...params, token })}
            editForm={(params) =>
              changeAddPlannedVisitsSearchFilters({ ...params })
            }
          />
        );
      });
    } else if (stockLoader) {
      brandsNode1 = <Loading />;
    }
    return (
      <ScrollView style={Style.container}>
        {
          //  <ScrollView>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={Style.formHeading}>{"Competitor (inc. JKP)"}</Text>
          <TouchableOpacity
            style={Style.plusIcon}
            onPress={() => NavigationService.navigate("AddCompetitorForm")}
          >
            <GenericIcon
              name={"add"}
              style={{ color: Colors.white, fontSize: 30, alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>{brandsNode}</ScrollView>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={Style.formHeading}>{"Stock"}</Text>
          <TouchableOpacity
            style={Style.plusIcon}
            onPress={() => NavigationService.navigate("AddStockForm")}
          >
            <GenericIcon
              name={"add"}
              style={{ color: Colors.white, fontSize: 30, alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>{brandsNode1}</ScrollView>

        <View style={{ ...Style.bottomMargin, ...Style.checkboxContainer }}>
          <View>
            <Label
              style={{ ...Style.label }}
              onPress={(event) => {
                let updatedValue =
                  form.market_material_required__c == true ? false : true;
                changeForm({
                  edited_field: "market_material_required__c",
                  edited_value: updatedValue,
                });
              }}
            >
              {"Marketing Visibility Material Required"}
            </Label>
          </View>
          <View>
            <CheckBox
              style={{
                borderRadius: 2,
                borderColor: Colors.grey,
                color: Colors.grey,
                marginLeft: 4,
              }}
              checked={form.market_material_required__c == true}
              onPress={(event) => {
                let updatedValue =
                  form.market_material_required__c == true ? false : true;
                changeForm({
                  edited_field: "market_material_required__c",
                  edited_value: updatedValue,
                });
              }}
            />
          </View>
        </View>
        <View style={{ ...Style.bottomMargin1 }}>
          {/* <InputText style={Style.inputText}
                 multiline={true}
                placeholder = {'Remarks'}
                numberOfLines={1}
                error={validation.invalid && validation.invalid_field == 'remarks__c'}
                value={form.remarks__c}
                onChange={(value) => changeForm({ edited_field: 'remarks__c', edited_value: value })}
              /> */}

          <IndicatorInputText
            placeholder={"Remarks"}
            maxLength={131072}
            value={form.remarks__c}
            multiline={true}
            style={{ borderRadius: 10 }}
            numberOfLines={1}
            onChange={(value) =>
              changeForm({ edited_field: "remarks__c", edited_value: value })
            }
            error={
              validation.invalid && validation.invalid_field == "remarks__c"
            }
          />
        </View>

        <View style={{ ...Style.bottomMargin, width: "80%" }}>
          <MultipleImagePicker
            title={"Take Picture"}
            images={form.attachment_url__c || []}
            loading={
              uploadImageLoading && uploadImageField == "attachment_url__c"
            }
            onClearImage={(value) =>
              changeForm({
                edited_field: "attachment_url__c",
                edited_value: "",
              })
            }
            onImageSuccess={({image} ) => {
              // console.log("IMMMM", image)
              uploadImage({
                image,
                params: { edited_field: "attachment_url__c" },
                multiple: true,
                previous_value: form.attachment_url__c,
              })
            }}
          >
            <View style={Style.recurringActionButton1}>
              <Text style={Style.recurringActionButtonText1}>
                <GenericIcon
                  name="camera"
                  //show={true}
                  style={Style.recurringActionButtonIcon1}
                />
                {"Take Picture"}
              </Text>
            </View>
          </MultipleImagePicker>
        </View>

        {this.getAttachmentInfoNode()}

        <BlueButton
          style={Style.button}
          // rounded
          // large
          title={SUBMIT}
          disabled={loader}
          loading={loader}
          onPress={() => add(form)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  form: state.visits.visitInfoForm,
  loader: state.visits.addVisitInfoLoader,
  validation: state.visits.visitInfoFormValidation,
  visibilityLevelList: state.visits.visibilityLevelList,
  retailerCompetitors: state.retailers.retailerCompetitors,
  visitInfoFormMultiple: state.visits.visitInfoFormMultiple,
  productCategoryDisplayList: state.products.productCategoryDisplayList,
  competitorData: state.visits.visitCompetitor,
  competitorLoader: state.visits.getVisitCompetitorLoader,
  stockData: state.visits.visitStock,
  stockLoader: state.visits.getVisitStockLoader,
  Competitors: state.retailers.retailerCompetitors,
  productCategory: state.products.productCategoryDisplayList,
  uploadImageLoading: state.common.uploadImageLoader,
  uploadImageField: state.common.uploadImageField,
  pg_id__c: state.visits.executeVisitData.pg_id__c
    ? state.visits.executeVisitData.pg_id__c
    : "",
  fetchVisitInfoLoader: state.visits.fetchVisitInfoLoader,
  visitInfoMapping: state.visits.visitInfoMapping,
  executeVisitData: state.visits.executeVisitData,
  user_details: state.user.user_details,
});

const mapDispatchToProps = (dispatch) => ({
  changeForm: (params) => dispatch(VisitsActions.changeVisitInfoForm(params)),
  add: (params) => dispatch(VisitsActions.addVisitInfo(params)),
  addVisitInfoEntity: (params) =>
    dispatch(VisitsActions.addVisitInfoEntity(params)),
  removeVisitInfoEntity: (params) =>
    dispatch(VisitsActions.removeVisitInfoEntity(params)),
  editVisitInfoEntity: (params) =>
    dispatch(VisitsActions.editVisitInfoEntity(params)),
  getCompetitor: (params) => dispatch(VisitsActions.getCompetitor(params)),
  getStock: (params) => dispatch(VisitsActions.getStock(params)),
  uploadImage: (params) => dispatch(CommonActions.uploadImage(params)),
  submitUpdateStockForm: (params) =>
    dispatch(VisitsActions.submitUpdateStockForm(params)),
  changeUpdateStockForm: (params) =>
    dispatch(VisitsActions.changeUpdateStockForm(params)),
  submitUpdateCompetitorForm: (params) =>
    dispatch(VisitsActions.submitUpdateCompetitorForm(params)),
  changeUpdateCompetitorForm: (params) =>
    dispatch(VisitsActions.changeUpdateCompetitorForm(params)),
  changeAddPlannedVisitsSearchFilters: (params) =>
    dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
  clearAddInfoForm: () => dispatch(VisitsActions.clearAddInfoForm()),
  fetchVisitInfo: (params) => dispatch(VisitsActions.fetchVisitInfo(params)),
  fetchProductCategories: (params) =>
    dispatch(ProductActions.fetchProductCategories(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitInfoForm);
