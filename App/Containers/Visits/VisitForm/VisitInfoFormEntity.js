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
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Style from './VisitFormStyles';
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

export default class VisitInfoFormEntity extends Component {

  render() {
    const {
      form,
      validation,
      changeForm,
      removeForm,
      retailerCompetitors,
      visibilityLevelList,
      productCategoryDisplayList
    } = this.props;

    return (
          <View style={Style.form}>

          <TouchableOpacity
          style={Style.removeIcon}
          onPress={() => removeForm()}>
          <GenericIcon
            name={'remove'}
            style={{ color: Colors.white, fontSize: 25, alignSelf: 'center' }}
          />
        </TouchableOpacity>
       
        <View style={{ ...Style.bottomMargin }}>
              <Label style={{ ...Style.label }}>{'Product Category'}</Label>
              <SearchableDropdown
                dataSource={productCategoryDisplayList}
                placeHolderText={'Product Category'}
                selectedValue={form.product_category}
                onChange={(value) => changeForm({ edited_field: 'product_category', edited_value: value })}
                placeholder={'Product Category...'}
                invalid={validation.invalid && validation.invalid_field == 'product_category'}
                customPickerStyles={Style.picker}
              />
            </View>

            <Label style={{ ...Style.label }}>{'Visibility level'}</Label>
            <Select style={{ ...Style.bottomMargin }}
              list={visibilityLevelList}
              selected={form.visibility_level__c}
              onChange={(value) => changeForm({ edited_field: 'visibility_level__c', edited_value: value })}
            />


            <View style={{ ...Style.bottomMargin }}>
              <Label style={{ ...Style.label }}>{'Competition Pricing & scheme info'}</Label>
              <InputText
                style={Style.inputText}
                multiline={true}
                numberOfLines={2}
                value={form.competition_pricing_schemes_info}
                error={validation.invalid && validation.invalid_field == 'competition_pricing_schemes_info'}
                onChange={(value) => changeForm({ edited_field: 'competition_pricing_schemes_info', edited_value: value })}
              />
            </View>

           


            <View style={{ ...Style.bottomMargin }}>
              <Label style={{ ...Style.label }}>{'Visible Brand'}</Label>
              <SearchableDropdown
                dataSource={retailerCompetitors}
                placeHolderText={'Select Brand '}
                selectedValue={form.visible_brand}
                onChange={(value) => changeForm({ edited_field: 'visible_brand', edited_value: value })}
                placeholder={'Type or Select Brand'}
                invalid={validation.invalid && validation.invalid_field == 'visible_brand'}
                customPickerStyles={Style.picker}
              />
            </View>


     <View style={{ ...Style.bottomMargin }}>
              <ImagePicker
                image={form.picture__c}
                onImageSuccess={({ image, filename }) => {
                  changeForm({ edited_field: 'picture__c', edited_value: image });
                  changeForm({ edited_field: 'file_name', edited_value: filename });
                }}>
                <View style={Style.recurringActionButton}>
                  <Text style={Style.recurringActionButtonText}>
                    <GenericIcon
                      name="camera"
                      style={Style.recurringActionButtonIcon}
                    />
                    {'  Take picture'}
                  </Text>

                </View>
              </ImagePicker>
            </View>
      </View>
    )
  }
}