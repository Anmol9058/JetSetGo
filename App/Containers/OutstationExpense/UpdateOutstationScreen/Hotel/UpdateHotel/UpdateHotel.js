import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import Select from '../../../../../Components/Select/Select';
import Style from './UpdateHotelStyle';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions'
import { HelperService } from '../../../../../Services/Utils/HelperService'
import SearchableDropdown from 'App/Components/SearchableDropdown';
import FilePicker from '../../../../../Components/FIlePicker';

class UpdateHotelScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
            isCompanyPaid: false
        }
    }

    componentDidMount() {
        this.props.updateOutstationForm(this.props.selectHotelExpense);
    }

    componentWillUnmount() {
        this.props.clearSelectExpense();
        this.props.clearOutstationForm();
    }

    async submit() {
        // const { isCompanyPaid, fileName } = this.state;
        // const { selectHotelExpense } = this.props;
        // if (selectHotelExpense.stay_type__c === 'Hotel' && !isCompanyPaid && fileName === '') {
        //     HelperService.showToast({ message: 'No file selected' });
        // } else {
        this.props.updateHotelExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectExpense.sfid,
                type: 'hotel'
            }
        });
        // }
    }

    render() {
        const { outstationForm, validation, stayTypeList, companyPaidList, haveBillsList, changeOutstationForm, cityList } = this.props;
        let AttachmentCompoenent = this.state.isCompanyPaid ? <></> : <FilePicker onSuccess={({ fileName, fileUri }) => {
            this.setState({ fileName: fileName, fileUri: fileUri }, () => {
                this.props.changeOutstationForm({ edited_field: 'attachment__c', edited_value: this.state.fileUri });
                this.props.changeOutstationForm({ edited_field: 'file_name', edited_value: this.state.fileName });
            });
        }
        } />
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'UPDATE HOTEL'}</Text>
                <ScrollView style={Style.action}>
                    <InputDate
                        style={Style.mb10}
                        placeholder={'Arrival Date'}
                        value={HelperService.dateReadableFormat(outstationForm.arrival_date__c)}
                        onChange={(value) => {
                            console.log(value, "DATE DATA");
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            changeOutstationForm({ edited_field: 'arrival_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'arrival_date__c'}
                        label={'Arrival Date'}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={'Departure Date'}
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

                    <InputText
                        style={Style.mb10}
                        placeholder={'Type'}
                        value={outstationForm.type__c}
                        onChange={(value) =>
                            changeOutstationForm({ edited_field: 'type__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'type__c'}
                        label={'Type'}
                    />

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
                            changeOutstationForm({ edited_field: 'stay_type__c', edited_value: value });
                            this.setState({ isCompanyPaid: value === 'Hotel' ? true : false })
                        }}
                    />

                    {AttachmentCompoenent}

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
                            disabled={this.props.updateHotelExpenseLoader}
                            loading={this.props.updateHotelExpenseLoader}
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
    updateHotelExpenseLoader: state.outstations.updateHotelExpenseLoader,
    selectExpense: state.outstations.selectExpense,
    selectHotelExpense: state.outstations.selectHotelExpense,
    modeOfTravelList: state.outstations.modeOfTravelList,
    haveBillsList: state.outstations.haveBillsList,
    companyPaidList: state.outstations.companyPaidList,
    cityList: state.tours.cityList,
    stayTypeList: state.outstations.stayTypeList,
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationActions.changeOutstationForm(params)),
    updateOutstationForm: (params) => dispatch(OutstationActions.updateOutstationForm(params)),
    clearSelectExpense: () => dispatch(OutstationActions.clearSelectExpense()),
    clearOutstationForm: () => dispatch(OutstationActions.clearOutstationForm()),
    updateHotelExpense: (params) => dispatch(OutstationActions.updateHotelExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateHotelScreen)
