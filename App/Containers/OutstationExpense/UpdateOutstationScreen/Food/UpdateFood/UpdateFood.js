import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../../../Components/FormInput/InputDate';
import SearchableDropdown from '../../../../../Components/SearchableDropdown';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './UpdateFoodStyle';
import Select from '../../../../../Components/Select/Select';
import FilePicker from '../../../../../Components/FIlePicker';


class UpdateFoodScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
            isCompanyPaid: true
        }
    }

    componentDidMount() {
        this.props.updateOutstationForm(this.props.selectFoodExpense);
    }

    componentWillUnmount() {
        this.props.clearSelectExpense();
        this.props.clearOutstationForm();
    }

    async submit() {
        this.props.updateFoodExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectExpense.sfid,
                type: 'food'
            }
        });
        // }
    }

    render() {
        const { cityList, outstationForm, validation, changeOutstationForm, haveBillsList, companyPaidList } = this.props;
        let AttachmentCompoenent = this.state.isCompanyPaid ? <></> : <FilePicker onSuccess={({ fileName, fileUri }) => {
            this.setState({ fileName: fileName, fileUri: fileUri }, () => {
                this.props.changeOutstationForm({ edited_field: 'attachment__c', edited_value: this.state.fileUri });
                this.props.changeOutstationForm({ edited_field: 'file_name', edited_value: this.state.fileName });
            });
        }
        } />
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'UPDATE FOOD'}</Text>
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
                        placeholder={`Bill Number`}
                        value={outstationForm.bill_number__c}
                        onChange={(value) => changeOutstationForm({ edited_field: 'bill_number__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'bill_number__c'}
                        label={'Bill Number'}
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

                    {/* <InputText
                        style={Style.mb10}
                        placeholder={'Bills' + '*'}
                        value={outstationForm.bills__c}
                        onChange={(value) =>
                            changeOutstationForm({ edited_field: 'bills__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'bills__c'}
                        label={'Bills*'}
                    /> */}


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Amount`}
                        value={outstationForm.amount__c}
                        onChange={(value) =>
                            changeOutstationForm({ edited_field: 'amount__c', edited_value: value })}
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
    updateFoodExpenseLoader: state.outstations.updateFoodExpenseLoader,
    selectExpense: state.outstations.selectExpense,
    selectFoodExpense: state.outstations.selectFoodExpense,
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
    updateFoodExpense: (params) => dispatch(OutstationActions.updateFoodExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateFoodScreen)
