import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './AddIncidentalStyle';
import TextArea from '../../../../../Components/FormInput/TextArea';


class AddIncidentalScreen extends Component {

    async componentWillUnmount() {
        await this.props.clearOutstationForm();
    }

    submit() {
        this.props.changeOutstationForm({ edited_field: 'outstation_type__c', edited_value: 'Incidental Expense' });
        this.props.changeOutstationForm({ edited_field: 'expense_type__c', edited_value: 'Outstation Expense' });
        this.props.addIncidentalExpense({
            token: this.props.token,
            agentid: this.props.agentid,
            sfid: this.props.selectMyOutstation.sfid,
            type: 'incidental',
            payload: [this.props.outstationForm]
        });
    }


    render() {
        const { outstationForm, validation, changeOutstationForm } = this.props;

        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'ADD INCIDENTAL'}</Text>
                <ScrollView style={Style.action}>
                    <InputDate
                        style={Style.mb10}
                        placeholder={'From Date'}
                        value={HelperService.dateReadableFormat(outstationForm.from_date__c)}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'from_date__c', edited_value: formattedDate })
                        }}
                        error={validation.invalid && validation.invalid_field == 'from_date__c'}
                        label={'From Date'}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={'To Date'}
                        value={HelperService.dateReadableFormat(outstationForm.to_date__c)}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'to_date__c', edited_value: formattedDate })
                        }}
                        error={validation.invalid && validation.invalid_field == 'to_date__c'}
                        label={'To Date'}
                    />


                    <InputText
                        style={Style.mb10}
                        placeholder={'Place'}
                        value={outstationForm.place__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'place__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'place__c'}
                        label={'Place'}
                    />


                    <TextArea
                        placeholder={'Remarks'}
                        numberOfLines={5}
                        value={outstationForm.remark__c}
                        error={validation.invalid && validation.invalid_field == 'remark__c'}
                        onChange={(value) => changeOutstationForm({ edited_field: 'remark__c', edited_value: value })}
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
                            disabled={this.props.addIncidentalExpenseLoader}
                            loading={this.props.addIncidentalExpenseLoader}
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
    addIncidentalExpenseLoader: state.outstations.addIncidentalExpenseLoader,
    selectMyOutstation: state.outstations.selectMyOutstationExpense,
    modeOfTravelList: state.outstations.modeOfTravelList,
    haveBillsList: state.outstations.haveBillsList,
    companyPaidList: state.outstations.companyPaidList,
    cityList: state.tours.cityList,
    selectIncidentalExpense: state.outstations.selectIncidentalExpense
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationActions.changeOutstationForm(params)),
    updateOutstationForm: (params) => dispatch(OutstationActions.updateOutstationForm(params)),
    clearSelectExpense: () => dispatch(OutstationActions.clearSelectExpense()),
    clearOutstationForm: () => dispatch(OutstationActions.clearOutstationForm()),
    addIncidentalExpense: (params) => dispatch(OutstationActions.addIncidentalExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddIncidentalScreen)
