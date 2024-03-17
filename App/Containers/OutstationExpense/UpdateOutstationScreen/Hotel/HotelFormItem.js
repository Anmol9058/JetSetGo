import { View, Text } from 'react-native';
import React from 'react';
import InputNumber from 'App/Components/FormInput/InputNumber';
import Select from '../../../../Components/Select/Select';
import Style from './AddHotel/AddHotelStyle';
import InputDate from '../../../../Components/FormInput/InputDate';
import InputText from '../../../../Components/FormInput/InputText';
import { Colors } from '../../../../Theme';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import { HelperService } from '../../../../Services/Utils/HelperService';


export const FormItem = ({ cityList, context, item, formData, title, validation, outstationForm, changeOutstationForm, modeOfTravelList, companyPaidList, haveBillsList, id }) => {
    console.log(cityList, "CITY LIST");
    return (
        <View>
            <View style={{ backgroundColor: Colors.button, padding: 8, borderRadius: 5 }}>
                <Text style={{ color: Colors.white, fontSize: 16 }}>{title}</Text>
            </View>

            <View style={{ marginBottom: 12, marginTop: 8 }}>
                <InputDate
                    style={Style.mb10}
                    placeholder={'Arrival Date'}
                    value={outstationForm.arrival_date__c}
                    onChange={(value) => {
                        let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                        changeOutstationForm(context, formData, { edited_field: 'arrival_date__c', edited_value: formattedDate }, id)
                    }}
                    error={validation.invalid && validation.invalid_field == 'arrival_date__c'}
                    label={'Arrival Date*'}
                />

                <InputDate
                    style={Style.mb10}
                    placeholder={'Departure Date*'}
                    value={outstationForm.departure_date__c}
                    onChange={(value) => {
                        let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                        changeOutstationForm(context, formData, { edited_field: 'departure_date__c', edited_value: formattedDate }, id)
                    }}
                    error={validation.invalid && validation.invalid_field == 'departure_date__c'}
                    label={'To Date*'}
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
                <InputNumber
                    style={Style.mb10}
                    placeholder={`Number of Nights*`}
                    value={outstationForm.number_of_nights__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'number_of_nights__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'number_of_nights__c'}
                    label={'Number of Nights'}
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


                <InputNumber
                    style={Style.mb10}
                    placeholder={`Amount*`}
                    value={outstationForm.amount__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'amount__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'amount__c'}
                    label={'Amount'}
                />

            </View>
        </View>
    )
}