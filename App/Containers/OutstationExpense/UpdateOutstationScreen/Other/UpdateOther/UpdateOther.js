import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Select from '../../../../../Components/Select/Select';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './UpdateOtherStyle';
import TextArea from '../../../../../Components/FormInput/TextArea';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import InputDate from '../../../../../Components/FormInput/InputDate';
import FilePicker from '../../../../../Components/FIlePicker';


class UpdateOtherScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
            isCompanyPaid: true
        }
    }

    componentDidMount() {
        this.props.updateOutstationForm(this.props.selectOtherExpense);
    }

    componentWillUnmount() {
        this.props.clearSelectExpense();
        this.props.clearOutstationForm();
    }

    async submit() {
        const { isCompanyPaid, fileName } = this.state;
        // if (!isCompanyPaid && fileName === '') {
        //     HelperService.showToast({ message: 'No file selected' });
        // } else {
        this.props.updateOtherExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectExpense.sfid,
                type: 'other'
            }
        });
        // }
    }

    render() {
        const { outstationForm, validation, haveBillsList, changeOutstationForm, cityList, companyPaidList } = this.props;
        let AttachmentCompoenent = this.state.isCompanyPaid ? <></> : <FilePicker onSuccess={({ fileName, fileUri }) => {
            this.setState({ fileName: fileName, fileUri: fileUri }, () => {
                this.props.changeOutstationForm({ edited_field: 'attachment__c', edited_value: this.state.fileUri });
                this.props.changeOutstationForm({ edited_field: 'file_name', edited_value: this.state.fileName });
            });
        }
        } />
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'ADD OTHER'}</Text>
                <ScrollView style={Style.action}>

                    <InputDate
                        style={Style.mb10}
                        placeholder={'Date'}
                        value={HelperService.dateReadableFormat(outstationForm.date__c)}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'date__c'}
                        label={'Date'}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'Place'}
                        value={outstationForm.place__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'place__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'place__c'}
                        label={'Place'}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'Bill Number'}
                        value={outstationForm.bill_number__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'bill_number__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'bill_number__c'}
                        label={'Bill Number'}
                    />


                    <TextArea
                        placeholder={'Remarks'}
                        numberOfLines={5}
                        value={outstationForm.remark__c}
                        error={validation.invalid && validation.invalid_field == 'remark__c'}
                        onChange={(value) => changeOutstationForm({ edited_field: 'remark__c', edited_value: value })}
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

                    {/* <InputText
                        style={Style.mb10}
                        placeholder={'Bills'}
                        value={outstationForm.bills__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'bills__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'bills__c'}
                        label={'Bills'}
                    /> */}


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.addOtherExpenseLoader}
                            loading={this.props.addOtherExpenseLoader}
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
    updateExpenseLoader: state.outstations.updateExpenseLoader,
    selectOtherExpense: state.outstations.selectOtherExpense,
    selectExpense: state.outstations.selectExpense,
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
    updateOtherExpense: (params) => dispatch(OutstationActions.updateOtherExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateOtherScreen)
