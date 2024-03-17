import BlueButton from 'App/Components/BlueButton';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './AddTravelStyle';
import InputDate from '../../../../../Components/FormInput/InputDate';
import Select from '../../../../../Components/Select/Select';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import FilePicker from '../../../../../Components/FIlePicker';

class AddTravelScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
            isCompanyPaid: true
        }
    }

    async componentDidMount() {
        await this.props.clearOutstationForm();
        this.props.changeOutstationForm({ edited_field: 'outstation_mode__c', edited_value: 'Railway' });
        this.props.changeOutstationForm({ edited_field: 'company_paid__c', edited_value: true });
        this.props.changeOutstationForm({ edited_field: 'have_bills__c', edited_value: true });
        this.props.changeOutstationForm({ edited_field: 'expense_type__c', edited_value: 'Outstation Expense' });
        this.props.changeOutstationForm({ edited_field: 'outstation_type__c', edited_value: 'Travel Details' });
    }

    submit = () => {
        const { outstationForm, selectMyOutstation, token, agentid } = this.props;
        const { isCompanyPaid, fileName } = this.state;
        if (!isCompanyPaid && fileName === '') {
            HelperService.showToast({ message: 'No file selected' });
        } else {
            this.props.addTravelExpense({
                token: token,
                agentid: agentid,
                sfid: selectMyOutstation.sfid,
                type: 'travel',
                payload: [outstationForm]
            });
        }

    }


    render() {
        const { outstationForm, validation, modeOfTravelList, companyPaidList, haveBillsList, changeOutstationForm } = this.props;
        let AttachmentCompoenent = this.state.isCompanyPaid ? <></> : <FilePicker onSuccess={({ fileName, fileUri }) => {
            this.setState({ fileName: fileName, fileUri: fileUri }, () => {
                this.props.changeOutstationForm({ edited_field: 'attachment__c', edited_value: this.state.fileUri });
                this.props.changeOutstationForm({ edited_field: 'file_name', edited_value: this.state.fileName });
            });
        }
        } />
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'ADD TRAVEL'}</Text>
                <ScrollView style={Style.action}>

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


                    <InputDate
                        style={Style.mb10}
                        placeholder={'Arrival Date'}
                        value={HelperService.dateReadableFormat(outstationForm.from_date__c)}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'from_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'from_date__c'}
                        label={'Arrival Date'}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={'Departure Date'}
                        value={HelperService.dateReadableFormat(outstationForm.to_date__c)}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'to_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'to_date__c'}
                        label={'Departure Date'}
                    />

                    <Select style={Style.picker}
                        label={'Select mode of travel'}
                        selected={outstationForm.outstation_mode__c}
                        list={modeOfTravelList}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'outstation_mode__c', edited_value: value })
                        }}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'Ticket Number'}
                        value={outstationForm.ticket_number__c}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'ticket_number__c', edited_value: value })
                        }}
                        error={validation.invalid && validation.invalid_field == 'ticket_number__c'}
                        label={'Ticket Number'}
                    />

                    <Select style={Style.picker}
                        label={'Company Paid'}
                        selected={outstationForm.company_paid__c}
                        list={companyPaidList}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'company_paid__c', edited_value: value })
                            this.setState({ isCompanyPaid: value });
                        }}
                    />

                    {AttachmentCompoenent}

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
                            disabled={this.props.addTravelExpenseLoader}
                            loading={this.props.addTravelExpenseLoader}
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
    addTravelExpenseLoader: state.outstations.addTravelExpenseLoader,
    selectMyOutstation: state.outstations.selectMyOutstationExpense,
    selectTravelExpense: state.outstations.selectTravelExpense,
    modeOfTravelList: state.outstations.modeOfTravelList,
    haveBillsList: state.outstations.haveBillsList,
    companyPaidList: state.outstations.companyPaidList
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationActions.changeOutstationForm(params)),
    updateOutstationForm: (params) => dispatch(OutstationActions.updateOutstationForm(params)),
    clearSelectExpense: () => dispatch(OutstationActions.clearSelectExpense()),
    clearOutstationForm: () => dispatch(OutstationActions.clearOutstationForm()),
    addTravelExpense: (params) => dispatch(OutstationActions.addTravelExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTravelScreen);
