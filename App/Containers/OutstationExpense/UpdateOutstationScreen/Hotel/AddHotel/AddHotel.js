import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import Select from '../../../../../Components/Select/Select';
import Style from './AddHotelStyle';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions'
import { HelperService } from '../../../../../Services/Utils/HelperService'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import FilePicker from '../../../../../Components/FIlePicker';

class AddHotelScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
            isCompanyPaid: false
        }
    }

    async componentDidMount() {
        await this.props.clearOutstationForm();
        this.props.changeOutstationForm({ edited_field: 'stay_type__c', edited_value: 'Hotel' });
        this.props.changeOutstationForm({ edited_field: 'company_paid__c', edited_value: false });
        this.props.changeOutstationForm({ edited_field: 'have_bills__c', edited_value: true });
        this.props.changeOutstationForm({ edited_field: 'outstation_type__c', edited_value: 'Hotel/Own Arrangement/DA' });
        this.props.changeOutstationForm({ edited_field: 'expense_type__c', edited_value: 'Outstation Expense' });
    }

    componentWillUnmount() {
        this.props.clearOutstationForm();
    }

    async submit() {
        const { outstationForm, selectMyOutstation, token, agentid } = this.props;
        const { isCompanyPaid, fileName } = this.state;
        if (outstationForm.stay_type__c === 'Hotel' && !isCompanyPaid && fileName === '') {
            HelperService.showToast({ message: 'No file selected' });
        } else {
            this.props.addHotelExpense({
                token: token,
                agentid: agentid,
                sfid: selectMyOutstation.sfid,
                type: 'hotel',
                payload: [outstationForm]
            });
        }
    }

    render() {
        const { outstationForm, validation, companyPaidList, haveBillsList, changeOutstationForm, cityList, stayTypeList } = this.props;
        let AttachmentCompoenent = this.state.isCompanyPaid ? <></> : <FilePicker onSuccess={({ fileName, fileUri }) => {
            this.setState({ fileName: fileName, fileUri: fileUri }, () => {
                this.props.changeOutstationForm({ edited_field: 'attachment__c', edited_value: this.state.fileUri });
                this.props.changeOutstationForm({ edited_field: 'file_name', edited_value: this.state.fileName });
            });
        }
        } />
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'ADD HOTEL'}</Text>
                <ScrollView style={Style.action}>
                    <InputDate
                        style={Style.mb10}
                        placeholder={'From'}
                        value={outstationForm.arrival_date__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'arrival_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'arrival_date__c'}
                        label={'Arrival Date'}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={'To'}
                        value={outstationForm.departure_date__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'departure_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'departure_date__c'}
                        label={'Departure Date'}
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

                    {/* <InputText
                        style={Style.mb10}
                        placeholder={'Type'}
                        value={outstationForm.type__c}
                        onChange={(value) =>
                            changeOutstationForm({ edited_field: 'type__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'type__c'}
                        label={'Type'}
                    /> */}

                    <InputText
                        style={Style.mb10}
                        placeholder={'Bill Number'}
                        value={outstationForm.bill_number__c}
                        onChange={(value) =>
                            changeOutstationForm({ edited_field: 'bill_number__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'bill_number__c'}
                        label={'Bill Number'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Number of Nights`}
                        value={outstationForm.number_of_nights__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'number_of_nights__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'number_of_nights__c'}
                        label={'Number of Nights'}
                    />

                    <Select style={Style.picker}
                        label={'Stay Type'}
                        selected={outstationForm.stay_type__c}
                        list={stayTypeList}
                        onChange={(value) => {
                            changeOutstationForm({ edited_field: 'stay_type__c', edited_value: value })
                        }}
                    />


                    <Select style={Style.picker}
                        label={'Company Paid'}
                        selected={outstationForm.company_paid__c}
                        list={companyPaidList}
                        onChange={(value) => {
                            this.setState({ isCompanyPaid: value ? true : false })
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
                            disabled={this.props.addHotelExpenseLoader}
                            loading={this.props.addHotelExpenseLoader}
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
    addHotelExpenseLoader: state.outstations.addHotelExpenseLoader,
    selectMyOutstation: state.outstations.selectMyOutstationExpense,
    selectHotelExpense: state.outstations.selectHotelExpense,
    modeOfTravelList: state.outstations.modeOfTravelList,
    haveBillsList: state.outstations.haveBillsList,
    companyPaidList: state.outstations.companyPaidList,
    stayTypeList: state.outstations.stayTypeList,
    cityList: state.tours.cityList
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationActions.changeOutstationForm(params)),
    updateOutstationForm: (params) => dispatch(OutstationActions.updateOutstationForm(params)),
    clearSelectExpense: () => dispatch(OutstationActions.clearSelectExpense()),
    clearOutstationForm: () => dispatch(OutstationActions.clearOutstationForm()),
    addHotelExpense: (params) => dispatch(OutstationActions.addHotelExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddHotelScreen)
