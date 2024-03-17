import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import LocalActions from 'App/Stores/LocalExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import LocalTeamExpenseTuple from '../LocalTeamExpenseTuple';
import Style from './LocalTeamExpenseScreenStyle';
import RemarksModal from '../../../Components/RemarksModal/RemarksModal';
import { HelperService } from '../../../Services/Utils/HelperService';

class LocalTeamExpenseScreen extends Component {

    state = {
        isModalVisible: false,
        itemData: {},
        status: ''

    };

    componentDidMount() {
        this.props.clearExpenseForm();
        this.fetchExpense();
    }

    componentWillUnmount() {
        this.props.clearTeamExpense();
    }

    fetchExpense() {
        const { token, agentid, fetchTeamExpenses, monthNumber, type } = this.props;
        fetchTeamExpenses({
            token,
            agentid,
            type: 'local',
            month: monthNumber,
            expense_type: 'other'
        })
    }

    onExpenseItemClick = (item) => {
        if (item.expense_status__c === 'Pending for Approval') {
            this.props.selectTeamExpense(item);
            NavigationService.navigate('TeamExpenseListScreen', { 'Local': true });
        } else {
            HelperService.showToast({ message: 'You cannot update now!' });
        }
    }

    onApproveClick = (item) => {
        this.toggleModal();
        this.setState({ itemData: item, status: 'Approved' });
    }

    onRejectClick = (item) => {
        this.toggleModal();
        this.setState({ itemData: item, status: 'Rejected' });
    }

    toggleModal = async () => {
        await this.props.clearExpenseForm();
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onSubmitClick = async () => {
        if (this.props.expenseForm.remark__c) {
            let reqBody = {
                expense_status__c: this.state.status,
                approver_remarks__c: this.props.expenseForm.remark__c
            }
            this.props.approveRejectLocalExpense({
                token: this.props.token,
                agentid: this.props.agentid,
                payload: reqBody,
                sfid: this.state.itemData.sfid
            });
            this.fetchExpense();
            this.toggleModal();
        } else {
            HelperService.showToast({ message: 'Remark field is empty' });
        }
    }

    onCancelClick = () => {
        this.toggleModal();
    }


    render() {
        const { teamExpenseList, fetchTeamExpenseLoader, validation, expenseForm } = this.props;

        let visibleNode = [];

        if (teamExpenseList && teamExpenseList.length) {
            visibleNode = (
                <>
                    <FlatList
                        data={teamExpenseList}
                        renderItem={({ item }) =>
                            <LocalTeamExpenseTuple
                                data={item}
                                list={teamExpenseList}
                                onPress={() => {
                                    this.onExpenseItemClick(item);
                                }}
                                handleApprove={() => { this.onApproveClick(item) }}
                                handleReject={() => { this.onRejectClick(item) }}
                            />}
                        keyExtractor={(item, id) => id + ''}
                        onRefresh={() => this.fetchExpense()}
                        refreshing={fetchTeamExpenseLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Expense Found'} />
                        } />
                    <RemarksModal
                        isVisible={this.state.isModalVisible}
                        toggleModal={this.toggleModal}
                        handleSubmit={this.onSubmitClick}
                        handleCancel={this.onCancelClick}
                        validation={validation}
                        expenseForm={expenseForm}
                        changeExpenseForm={this.props.changeExpenseForm}
                        loader={this.props.updateExpenseLoader}
                        item={this.state.itemData} />
                </>
            );
        } else if (teamExpenseList && !teamExpenseList.length && !fetchTeamExpenseLoader) {
            visibleNode = <NoDataFound text={'No Expense Found'} />
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
    offset: state.local.expenseOffset,
    limit: state.local.expenseLimit,
    teamExpenseList: state.local.teamExpenseList,
    fetchTeamExpenseLoader: state.local.fetchTeamExpenseLoader,
    monthNumber: state.local.monthNumber,
    type: state.local.type,
    expenseForm: state.local.expenseForm,
    validation: state.local.expenseFormValidation,
    updateExpenseLoader: state.local.updateExpenseLoader
});

const mapDispatchToProps = (dispatch) => ({
    fetchTeamExpenses: (params) => dispatch(LocalActions.fetchTeamExpenses(params)),
    selectTeamExpense: (params) => dispatch(LocalActions.selectTeamExpense(params)),
    clearSelectTeamExpense: () => dispatch(LocalActions.clearSelectTeamExpense()),
    changeExpenseForm: (params) => dispatch(LocalActions.changeExpenseForm(params)),
    approveRejectLocalExpense: (params) => dispatch(LocalActions.approveRejectLocalExpense(params)),
    clearExpenseForm: () => dispatch(LocalActions.clearExpenseForm()),
    clearTeamExpense: () => dispatch(LocalActions.clearTeamExpense())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalTeamExpenseScreen)

