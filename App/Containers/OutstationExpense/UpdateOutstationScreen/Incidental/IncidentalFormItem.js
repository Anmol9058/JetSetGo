import InputNumber from 'App/Components/FormInput/InputNumber';
import React from 'react';
import { Text, View } from 'react-native';
import InputDate from '../../../../Components/FormInput/InputDate';
import InputText from '../../../../Components/FormInput/InputText';
import { Colors } from '../../../../Theme';
import Style from './AddIncidental/AddIncidentalStyle';
import TextArea from '../../../../Components/FormInput/TextArea';
import { HelperService } from '../../../../Services/Utils/HelperService';


export const FormItem = ({ context, formData, title, validation, outstationForm, changeOutstationForm, id }) => {
    return (
        <View>
            <View style={{ backgroundColor: Colors.button, padding: 8, borderRadius: 5 }}>
                <Text style={{ color: Colors.white, fontSize: 16 }}>{title}</Text>
            </View>

            <View style={{ marginBottom: 12, marginTop: 8 }}>
                <InputDate
                    style={Style.mb10}
                    placeholder={'From Date'}
                    value={HelperService.dateReadableFormat(outstationForm.from_date__c)}
                    onChange={(value) => {
                        let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                        changeOutstationForm(context, formData, { edited_field: 'from_date__c', edited_value: formattedDate }, id)
                    }}
                    error={validation.invalid && validation.invalid_field == 'from_date__c'}
                    label={'From Date*'}
                />


                <InputText
                    style={Style.mb10}
                    placeholder={'Place' + '*'}
                    value={outstationForm.place__c}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'place__c', edited_value: value }, id)}
                    error={validation.invalid && validation.invalid_field == 'place__c'}
                    label={'Place*'}
                />


                <TextArea
                    placeholder={'Remarks'}
                    numberOfLines={5}
                    value={outstationForm.remark__c}
                    error={validation.invalid && validation.invalid_field == 'remark__c'}
                    onChange={(value) => changeOutstationForm(context, formData, { edited_field: 'remark__c', edited_value: value }, id)}
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