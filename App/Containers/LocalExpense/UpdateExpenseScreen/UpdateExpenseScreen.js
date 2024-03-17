import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Select from '../../../Components/Select/Select';
import LocalActions from '../../../Stores/LocalExpense/Actions';
import Style from './UpdateExpenseScreenStyle';
import { Colors } from '../../../Theme';

class UpdateLocalExpenseScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { updateExpenseForm, selectLocalExpenseItem } = this.props;
        updateExpenseForm(selectLocalExpenseItem);
    }

    async componentWillUnmount() {
        await this.props.clearExpenseForm();
    }


    submit() {
        this.props.changeExpenseForm({ edited_field: 'amount__c', edited_value: this.props.expenseForm.amount__c ? this.props.expenseForm.amount__c : 0 });
        this.props.updateExpense({
            ...this.props.expenseForm,
            ...{
                token: this.props.token,
                agentid: this.props.agentid,
                sfid: this.props.selectLocalExpenseItem.sfid
            }
        });
    }

    render() {
        const { expenseForm, validation, modeOfTravelList } = this.props;
        return (
            <View style={Style.container}>
                <View><Text style={{ fontSize: 24, color: Colors.button }}>Update Travel</Text></View>
                <ScrollView style={Style.action}>

                    <Select style={Style.picker}
                        label={'Select mode of travel*'}
                        selected={expenseForm.mode__c}
                        list={modeOfTravelList}
                        onChange={(value) => {
                            this.props.changeExpenseForm({ edited_field: 'mode__c', edited_value: value })
                        }}
                    />

                    {/* <InputNumber
                        style={Style.mb10}
                        placeholder={`Kms.Travel*`}
                        value={expenseForm.kilometers_travelled__c}
                        onChange={(value) => this.props.changeExpenseForm({ edited_field: 'kilometers_travelled__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'kilometers_travelled__c'}
                        label={'Kms. Travel'}
                    /> */}

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`kilometers Travelled*`}
                        value={expenseForm.kilometers_travelled__c}
                        onChange={(value) => this.props.changeExpenseForm({ edited_field: 'kilometers_travelled__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'kilometers_travelled__c'}
                        label={'kilometers Travelled'}
                    />


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Food*`}
                        value={expenseForm.food__c}
                        onChange={(value) => this.props.changeExpenseForm({ edited_field: 'food__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'food__c'}
                        label={'Food'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Toll Parking*`}
                        value={expenseForm.toll_parking_charges__c}
                        onChange={(value) => this.props.changeExpenseForm({ edited_field: 'toll_parking_charges__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'toll_parking_charges__c'}
                        label={'Toll Parking'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Amount*`}
                        value={expenseForm.amount__c}
                        onChange={(value) => this.props.changeExpenseForm({ edited_field: 'amount__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'amount__c'}
                        label={'Amount'}
                        editable={false}
                    />


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.updateExpenseLoader}
                            loading={this.props.updateExpenseLoader}
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
    selectLocalExpenseItem: state.local.selectLocalExpenseItem,
    expenseForm: state.local.expenseForm,
    updateExpenseLoader: state.local.updateExpenseLoader,
    validation: state.local.expenseFormValidation,
    modeOfTravelList: state.local.modeOfTravelList,
})

const mapDispatchToProps = (dispatch) => ({
    changeExpenseForm: (params) => dispatch(LocalActions.changeExpenseForm(params)),
    updateExpense: (params) => dispatch(LocalActions.updateExpense(params)),
    clearExpenseForm: () => dispatch(LocalActions.clearExpenseForm()),
    updateExpenseForm: (params) => dispatch(LocalActions.updateExpenseForm(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateLocalExpenseScreen);
