import { View, Text } from 'react-native';
import React from 'react';
import InputNumber from 'App/Components/FormInput/InputNumber';
import Select from '../../../../Components/Select/Select';
import Style from './AddTravel/AddTravelStyle';
import InputDate from '../../../../Components/FormInput/InputDate';
import InputText from '../../../../Components/FormInput/InputText';
import { Colors } from '../../../../Theme';
import { HelperService } from '../../../../Services/Utils/HelperService';


export const FormItem = ({ context, item, formData, title, validation, outstationForm, changeOutstationForm, modeOfTravelList, companyPaidList, haveBillsList, id }) => {
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
                        changeOutstationForm(context, formData, { edited_field: 'arrival_date__c', edited_value: formattedDate }, id);
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
                        changeOutstationForm(context, formData, { edited_field: 'departure_date__c', edited_value: formattedDate }, id);
                    }}
                    error={validation.invalid && validation.invalid_field == 'departure_date__c'}
                    label={'Departure Date*'}
                />

                <Select style={Style.picker}
                    label={'Select mode of travel*'}
                    selected={outstationForm.mode__c}
                    list={modeOfTravelList}
                    onChange={(value) => {
                        changeOutstationForm(context, formData, { edited_field: 'mode__c', edited_value: value }, id)
                    }}
                />

                <InputText
                    style={Style.mb10}
                    placeholder={'Ticket Number' + '*'}
                    value={outstationForm.ticket_number__c}
                    onChange={(value) => {
                        changeOutstationForm(context, formData, { edited_field: 'ticket_number__c', edited_value: value }, id)
                    }}
                    error={validation.invalid && validation.invalid_field == 'ticket_number__c'}
                    label={'Ticket Number*'}
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
                    placeholder={'From'}
                    value={outstationForm.from__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'from__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'from__c'}
                    label={'From'}
                />

                <InputText
                    style={Style.mb10}
                    placeholder={'To'}
                    value={outstationForm.to__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'to__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'to__c'}
                    label={'To'}
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