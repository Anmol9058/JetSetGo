import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import Select from '../../../../../Components/Select/Select';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './AddConvenienceStyle';
import InputText from '../../../../../Components/FormInput/InputText';

class AddConvenienceScreen extends React.Component {

    async componentDidMount() {
        await this.props.clearOutstationForm();
    }

    submit() {
        this.props.changeOutstationForm({ edited_field: 'outstation_type__c', edited_value: 'Conveyance' });
        this.props.changeOutstationForm({ edited_field: 'expense_type__c', edited_value: 'Outstation Expense' });
        this.props.addConvenienceExpense({
            token: this.props.token,
            agentid: this.props.agentid,
            sfid: this.props.selectMyOutstation.sfid,
            type: 'convenience',
            payload: [this.props.outstationForm]
        });
    }

    render() {
        const { outstationForm, validation, modeOfTravelList, companyPaidList, haveBillsList, changeOutstationForm, cityList } = this.props;

        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'ADD CONVEYANCE'}</Text>
                <ScrollView style={Style.action}>
                    <InputDate
                        style={Style.mb10}
                        placeholder={'Date'}
                        value={outstationForm.date__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'date__c', edited_value: formattedDate })
                        }}
                        error={validation.invalid && validation.invalid_field == 'date__c'}
                        label={'Date'}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'From'}
                        value={outstationForm.from__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'from__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'from__c'}
                        label={'From'}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'To'}
                        value={outstationForm.to__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'to__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'to__c'}
                        label={'To'}
                    />

                    <Select style={Style.picker}
                        label={'Select mode of travel'}
                        selected={outstationForm.mode__c}
                        list={modeOfTravelList}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'mode__c', edited_value: value })
                        }}
                    />

                    <SearchableDropdown
                        dataSource={cityList}
                        placeHolderText={`Select City`}
                        selectedValue={outstationForm[`city__c`]}
                        onChange={(value) => changeOutstationForm({ edited_field: `city__c`, edited_value: value })}
                        placeholder={'Type or Select Area'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        // invalid={validation.invalid && validation.invalid_field == `city_${i + 1}__c`}
                        label={`Select City`}
                    />

                    <Select style={Style.picker}
                        label={'Company Paid'}
                        selected={outstationForm.company_paid__c}
                        list={companyPaidList}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'company_paid__c', edited_value: value })
                        }}
                    />

                    <Select style={Style.picker}
                        label={'Have bills'}
                        selected={outstationForm.have_bills__c}
                        list={haveBillsList}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'have_bills__c', edited_value: value })
                        }}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Toll Parking`}
                        value={outstationForm.toll_parking_charges__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'toll_parking_charges__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'toll_parking_charges__c'}
                        label={'Toll Parking'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Amount`}
                        value={outstationForm.amount__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'amount__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'amount__c'}
                        label={'Amount'}
                    />
                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.addConvenienceExpenseLoader}
                            loading={this.props.addConvenienceExpenseLoader}
                            onPress={() => this.submit()}
                        />
                    </View>

                </ScrollView>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    outstationForm: state.outstations.outstationForm,
    validation: state.outstations.outstationFormValidation,
    addConvenienceExpenseLoader: state.outstations.addConvenienceExpenseLoader,
    selectMyOutstation: state.outstations.selectMyOutstationExpense,
    modeOfTravelList: state.outstations.modeOfTravelList,
    haveBillsList: state.outstations.haveBillsList,
    companyPaidList: state.outstations.companyPaidList,
    cityList: state.tours.cityList
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationActions.changeOutstationForm(params)),
    updateOutstationForm: (params) => dispatch(OutstationActions.updateOutstationForm(params)),
    clearSelectExpense: () => dispatch(OutstationActions.clearSelectExpense()),
    clearOutstationForm: () => dispatch(OutstationActions.clearOutstationForm()),
    addConvenienceExpense: (params) => dispatch(OutstationActions.addConvenienceExpense(params))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddConvenienceScreen);
