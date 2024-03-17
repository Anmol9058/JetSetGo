import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './UpdateIncidentalStyle';
import TextArea from '../../../../../Components/FormInput/TextArea';


class UpdateIncidentalScreen extends Component {
    componentDidMount() {
        this.props.updateOutstationForm(this.props.selectIncidentalExpense);
    }

    componentWillUnmount() {
        this.props.clearSelectExpense();
        this.props.clearOutstationForm();
    }

    submit() {
        this.props.updateIncidentalExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectExpense.sfid,
                type: 'incidental'
            }
        });
    }

    render() {
        const { outstationForm, validation, changeOutstationForm } = this.props;

        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'UPDATE INCIDENTAL'}</Text>
                <ScrollView style={Style.action}>
                    <InputDate
                        style={Style.mb10}
                        placeholder={'From Date'}
                        value={outstationForm.from_date__c}
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
                            disabled={this.props.updateIncidentalExpenseLoader}
                            loading={this.props.updateIncidentalExpenseLoader}
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
    updateIncidentalExpenseLoader: state.outstations.updateIncidentalExpenseLoader,
    selectExpense: state.outstations.selectExpense,
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
    updateIncidentalExpense: (params) => dispatch(OutstationActions.updateIncidentalExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateIncidentalScreen)
