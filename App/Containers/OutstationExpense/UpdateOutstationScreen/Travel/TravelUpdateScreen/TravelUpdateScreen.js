import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import Select from '../../../../../Components/Select/Select';
import Style from './TravelUpdateScreenStyle';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions'
import { HelperService } from '../../../../../Services/Utils/HelperService'
import FilePicker from '../../../../../Components/FIlePicker';

class TravelUpdateScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
            isCompanyPaid: true
        }
    }

    componentDidMount() {
        this.props.updateOutstationForm(this.props.selectTravelExpense);
        this.setState({ isCompanyPaid: this.props.selectTravelExpense.company_paid__c })
    }

    componentWillUnmount() {
        this.props.clearOutstationForm();
    }

    async submit() {
        // const { isCompanyPaid, fileName } = this.state;
        // if (!isCompanyPaid && fileName === '') {
        //     HelperService.showToast({ message: 'No file selected' });
        // } else {
        this.props.updateTravelExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectExpense.sfid,
                type: 'travel'
            }
        });
        // }
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
                <Text style={Style.heading}>{'UPDATE TRAVEL'}</Text>
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
                        value={outstationForm.from_date__c}
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
                        value={outstationForm.to_date__c}
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
                            this.setState({ isCompanyPaid: value });
                            changeOutstationForm({ edited_field: 'company_paid__c', edited_value: value })
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
                            disabled={this.props.updateTravelExpenseLoader}
                            loading={this.props.updateTravelExpenseLoader}
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
    updateTravelExpenseLoader: state.outstations.updateTravelExpenseLoader,
    selectExpense: state.outstations.selectExpense,
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
    updateTravelExpense: (params) => dispatch(OutstationActions.updateTravelExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TravelUpdateScreen)
