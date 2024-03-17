import NoDataFound from 'App/Components/NoDataFound';
import OutstationAction from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import RemarksModal from '../../../Components/RemarksModal/RemarksModal';
import OutstationTeamExpenseTuple from '../OutstationTeamExpenseTuple';
import Style from './OutstationTeamExpenseScreenStyle';
import { DummyData } from '../OutstationMyExpenseScreen/DummyContent'
import NavigationService from '../../../Services/NavigationService';
import { HelperService } from '../../../Services/Utils/HelperService';

class OutstationTeamExpenseScreen extends Component {

    state = {
        isModalVisible: false,
        itemData: {},
        status: ''
    };

    componentDidMount() {
        this.props.clearOutstationForm();
        this.fetchOutstationExpense();
    }

    fetchOutstationExpense() {
        const { token, agentid, fetchTeamOutstationExpenses, monthNumber, type } = this.props;
        fetchTeamOutstationExpenses({
            token,
            agentid,
            type: 'outstation',
            month: monthNumber,
            expense_type: 'other'
        })
    }

    onExpenseItemClick = (item) => {
        this.props.selectTeamOutstationExpense(item);
        NavigationService.navigate('TravelListView');
    }

    onApproveClick = async (item) => {
        await this.props.clearOutstationForm();
        this.setState({ itemData: item, status: 'Approved' });
        this.toggleModal();
    }

    onRejectClick = async (item) => {
        await this.props.clearOutstationForm();
        this.setState({ itemData: item, status: 'Rejected' });
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onSubmitClick = (item) => {
        if (this.props.outstationForm.remark__c) {
            let reqBody = {
                expense_status__c: this.state.status,
                approver_remarks__c: this.props.outstationForm.remark__c
            }
            this.props.approveRejectOutstationExpense({
                token: this.props.token,
                agentid: this.props.agentid,
                payload: reqBody,
                sfid: this.state.itemData.sfid
            });
            this.fetchOutstationExpense();
            this.toggleModal();
        } else {
            HelperService.showToast({ message: 'Remark field is empty' });
        }
    }

    onCancelClick = () => {
        this.toggleModal();
    }


    render() {
        const { outstationTeamExpenseList, fetchOutstationTeamExpenseLoader } = this.props;

        let visibleNode = [];

        if (outstationTeamExpenseList && outstationTeamExpenseList.length) {
            visibleNode = (
                <>
                    <FlatList
                        data={outstationTeamExpenseList}
                        renderItem={({ item }) =>
                            <OutstationTeamExpenseTuple
                                onPress={() => { this.onExpenseItemClick(item) }}
                                data={item}
                                list={outstationTeamExpenseList}
                                handleApprove={() => { this.onApproveClick(item) }}
                                handleReject={() => { this.onRejectClick(item) }}
                                keyExtractor={(item, id) => id + ''}
                                onRefresh={this.fetchOutstationExpense}
                                refreshing={fetchOutstationTeamExpenseLoader}
                                ListEmptyComponent={() => <NoDataFound text={'No Outstation Expense Found'} />}
                            />
                        } />
                    <RemarksModal
                        isVisible={this.state.isModalVisible}
                        toggleModal={this.toggleModal}
                        handleSubmit={this.onSubmitClick}
                        handleCancel={this.onCancelClick}
                        expenseForm={this.props.outstationForm}
                        changeExpenseForm={this.props.changeOutstationForm}
                        loader={this.props.updateOutstationExpenseLoader}
                        validation={this.props.validation}
                        item={this.state.itemData} />
                </>
            );
        }
        else if (outstationTeamExpenseList && !outstationTeamExpenseList.length && !fetchOutstationTeamExpenseLoader) {
            visibleNode = <NoDataFound text={'No Outstation Expense Found'} />
        }

        return (
            <View style={Style.container}>
                {visibleNode}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    outstationTeamExpenseList: state.outstations.outstationTeamExpenseList,
    fetchOutstationTeamExpenseLoader: state.outstations.fetchOutstationTeamExpenseLoader,
    monthNumber: state.outstations.monthNumber,
    type: state.outstations.type,
    outstationForm: state.outstations.outstationForm,
    updateOutstationExpenseLoader: state.outstations.updateOutstationExpenseLoader,
    validation: state.outstations.outstationFormValidation
});

const mapDispatchToProps = (dispatch) => ({
    fetchTeamOutstationExpenses: (params) => dispatch(OutstationAction.fetchTeamOutstationExpenses(params)),
    selectTeamOutstationExpense: (params) => dispatch(OutstationAction.selectTeamOutstationExpense(params)),
    clearSelectTeamOutstationExpense: () => dispatch(OutstationAction.clearSelectTeamOutstationExpense()),
    changeOutstationForm: (params) => dispatch(OutstationAction.changeOutstationForm(params)),
    approveRejectOutstationExpense: (params) => dispatch(OutstationAction.approveRejectOutstationExpense
        (params)),
    clearOutstationForm: () => dispatch(OutstationAction.clearOutstationForm())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationTeamExpenseScreen)

