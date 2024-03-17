import InputNumber from 'App/Components/FormInput/InputNumber';
import React from 'react';
import { Text, View } from 'react-native';
import InputText from '../../../../Components/FormInput/InputText';
import Select from '../../../../Components/Select/Select';
import { Colors } from '../../../../Theme';
import Style from './AddOther/AddOtherStyle';
import TextArea from '../../../../Components/FormInput/TextArea';


export const FormItem = ({ context, formData, title, validation, outstationForm, changeOutstationForm, haveBillsList, id }) => {
    return (
        <View>
            <View style={{ backgroundColor: Colors.button, padding: 8, borderRadius: 5 }}>
                <Text style={{ color: Colors.white, fontSize: 16 }}>{title}</Text>
            </View>

            <View style={{ marginBottom: 12, marginTop: 8 }}>
                <InputText
                    style={Style.mb10}
                    placeholder={'Place' + '*'}
                    value={outstationForm.place__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'place__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'place__c'}
                    label={'Place*'}
                />

                <InputText
                    style={Style.mb10}
                    placeholder={'Bill Number' + '*'}
                    value={outstationForm.bill_number__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'bill_number__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'bill_number__c'}
                    label={'Bill Number'}
                />


                <TextArea
                    placeholder={'Remarks'}
                    numberOfLines={5}
                    value={outstationForm.remark__c}
                    error={validation.invalid && validation.invalid_field == 'remark__c'}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'remark__c', edited_value: value }, id)}
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

                <InputText
                    style={Style.mb10}
                    placeholder={'Bills' + '*'}
                    value={outstationForm.bills__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'bills__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'bills__c'}
                    label={'Bills*'}
                />
            </View>
        </View>
    )
}