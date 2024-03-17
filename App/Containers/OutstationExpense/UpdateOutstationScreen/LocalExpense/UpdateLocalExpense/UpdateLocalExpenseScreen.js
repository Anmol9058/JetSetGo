import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Select from 'App/Components/Select/Select';
import OutstationActions from '../../../../../Stores/OutstationExpense/Actions';
import Style from './UpdateLocalExpenseStyle';
import { Colors } from 'App/Theme';
import FilePicker from '../../../../../Components/FIlePicker';

class UpdateLocalExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: ''
        }
    }

    componentDidMount() {
        const { updateOutstationForm, selectLocalExpense, changeOutstationForm } = this.props;
        updateOutstationForm(selectLocalExpense);
    }

    componentWillUnmount() {
        this.props.clearSelectExpense();
        this.props.clearOutstationForm();
    }

    submit() {
        this.props.changeOutstationForm({ edited_field: 'amount__c', edited_value: this.props.outstationForm.amount__c ? this.props.outstationForm.amount__c : 0 });
        this.props.changeOutstationForm({ edited_field: 'pg_id__c', edited_value: this.props.selectLocalExpense.pg_id__c })
        this.props.updateLocalExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectLocalExpense.sfid,
            }
        });
    }

    render() {
        const { outstationForm, validation, modeOfTravelList } = this.props;
        let AttachmentCompoenent = <FilePicker onSuccess={({ fileName, fileUri }) => {
            this.setState({ fileName: fileName, fileUri: fileUri }, () => {
                this.props.changeOutstationForm({ edited_field: 'attachment__c', edited_value: this.state.fileUri });
                this.props.changeOutstationForm({ edited_field: 'file_name', edited_value: this.state.fileName });
            });
        }
        } />
        return (
            <View style={Style.container}>
                <View><Text style={{ fontSize: 24, color: Colors.button }}>Update Local Conveyance</Text></View>
                <ScrollView style={Style.action}>

                    <Select style={Style.picker}
                        label={'Select mode of travel*'}
                        selected={outstationForm.mode__c}
                        list={modeOfTravelList}
                        onChange={(value) => {
                            this.props.changeOutstationForm({ edited_field: 'mode__c', edited_value: value })
                        }}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`kilometers Travelled*`}
                        value={outstationForm.kilometers_travelled__c}
                        onChange={(value) => this.props.changeOutstationForm({ edited_field: 'kilometers_travelled__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'kilometers_travelled__c'}
                        label={'kilometers Travelled'}
                    />


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Food*`}
                        value={outstationForm.food__c}
                        onChange={(value) => this.props.changeOutstationForm({ edited_field: 'food__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'food__c'}
                        label={'Food'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Toll Parking*`}
                        value={outstationForm.toll_parking_charges__c}
                        onChange={(value) => this.props.changeOutstationForm({ edited_field: 'toll_parking_charges__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'toll_parking_charges__c'}
                        label={'Toll Parking'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Amount*`}
                        value={outstationForm.amount__c}
                        onChange={(value) => this.props.changeOutstationForm({ edited_field: 'amount__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'amount__c'}
                        label={'Amount'}
                        editable={false}
                    />

                    {AttachmentCompoenent}


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.updateLocalExpenseLoader}
                            loading={this.props.updateLocalExpenseLoader}
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
    updateLocalExpenseLoader: state.outstations.updateLocalExpenseLoader,
    selectExpense: state.outstations.selectExpense,
    selectLocalExpense: state.outstations.selectLocalExpense,
    modeOfTravelList: state.local.modeOfTravelList,
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationActions.changeOutstationForm(params)),
    updateOutstationForm: (params) => dispatch(OutstationActions.updateOutstationForm(params)),
    clearSelectExpense: () => dispatch(OutstationActions.clearSelectExpense()),
    clearOutstationForm: () => dispatch(OutstationActions.clearOutstationForm()),
    updateLocalExpense: (params) => dispatch(OutstationActions.updateLocalExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateLocalExpense);
