import InputNumber from 'App/Components/FormInput/InputNumber';
import React from 'react';
import { Text, View } from 'react-native';
import InputDate from '../../../../Components/FormInput/InputDate';
import InputText from '../../../../Components/FormInput/InputText';
import { Colors } from '../../../../Theme';
import Style from './AddFood/AddFoodStyle';
import SearchableDropdown from '../../../../Components/SearchableDropdown'
import Select from '../../../../Components/Select/Select';
import { HelperService } from '../../../../Services/Utils/HelperService';


export const FormItem = ({ companyPaidList, haveBillsList, cityList, context, formData, title, validation, outstationForm, changeOutstationForm, id }) => {
    return (
        <View>
            <View style={{ backgroundColor: Colors.button, padding: 8, borderRadius: 5 }}>
                <Text style={{ color: Colors.white, fontSize: 16 }}>{title}</Text>
            </View>

            <View style={{ marginBottom: 12, marginTop: 8 }}>
                <InputDate
                    style={Style.mb10}
                    placeholder={'Date'}
                    value={outstationForm.date__c}
                    onChange={(value) => {
                        let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                        changeOutstationForm(context, formData, { edited_field: 'date__c', edited_value: formattedDate }, id)
                    }}
                    error={validation.invalid && validation.invalid_field == 'date__c'}
                    label={'Date*'}
                />


                <InputNumber
                    style={Style.mb10}
                    placeholder={`Bill Number*`}
                    value={outstationForm.bill_number__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'bill_number__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'bill_number__c'}
                    label={'Bill Number'}
                />


                <SearchableDropdown
                    dataSource={cityList}
                    placeHolderText={`Select City`}
                    selectedValue={outstationForm[`city__c`]}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: `city__c`, edited_value: value }, id)}
                    placeholder={'Type or Select Area'}
                    invalid={false}
                    customPickerStyles={{ ...Style.picker }}
                    labelStyles={{ ...Style.pickerLabel }}
                    // invalid={validation.invalid && validation.invalid_field == `city_${i + 1}__c`}
                    label={`Select City*`}
                />



                <Select style={Style.picker}
                    label={'Company Paid*'}
                    selected={outstationForm.company_paid__c}
                    list={companyPaidList}
                    onChange={(value) => {
                        changeOutstationForm(context, formData, { edited_field: 'company_paid__c', edited_value: value }, id)
                    }}
                />

                <Select style={Style.picker}
                    label={'Have bills*'}
                    selected={outstationForm.have_bills__c}
                    list={haveBillsList}
                    onChange={(value) => {
                        changeOutstationForm(context, formData, { edited_field: 'have_bills__c', edited_value: value }, id)
                    }}
                />

                <InputText
                    style={Style.mb10}
                    placeholder={'Bills' + '*'}
                    value={outstationForm.bills__c}
                    onChange={(value) =>
                        changeOutstationForm(context, formData, { edited_field: 'bills__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'bills__c'}
                    label={'Bills*'}
                />


                <InputNumber
                    style={Style.mb10}
                    placeholder={`Amount*`}
                    value={outstationForm.amount__c}
                    onChange={(value) =>
                        changeOutstationForm(context, formData, { edited_field: 'amount__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'amount__c'}
                    label={'Amount'}
                />

            </View>
        </View>
    )
}