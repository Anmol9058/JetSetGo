import NoDataFound from 'App/Components/NoDataFound';
import LocalActions from 'App/Stores/LocalExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../Components/Loading';
import TeamExpenseTuple from '../TeamExpenseTuple';
import Style from './OutstationTeamExpenseListScreenStyle';
import RemarksModal from '../../../Components/RemarksModal/RemarksModal';

class OutstationTeamExpenseListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
    }

    componentDidMount() {
        this.fetchExpenseItem();
    }

    fetchExpenseItem() {
        const { token, agentid, selectTeamExpense, fetchTeamItemExpenses } = this.props;
        fetchTeamItemExpenses({
            token,
            agentid,
            id: selectTeamExpense.sfid
        })
    }

    onApproveClick = async (item) => {
        await this.props.clearExpenseForm();
    }

    onRejectClick = async (item) => {
        await this.props.clearExpenseForm();
        this.setState({ itemData: item });
        this.toggleModal();
    }

    toggleModal = async () => {
        await this.props.clearExpenseForm();
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onSubmitClick = () => {
        this.props.addRemark({
            ...this.props.expenseForm,
            ...{
                token: this.props.token,
                agentid: this.props.agentid,
                sfid: this.props.selectTeamItemExpense.sfid
            }
        });
        this.clearitemData();
    }

    clearitemData = () => {
        this.props.clearSelectTeamItemExpense();
    }

    onCancelClick = () => {
        this.toggleModal();
        this.clearitemData();
    }

    onExpenseItemClick = (item) => {
        this.props.selectTeamItemExpense(item);
        this.toggleModal();
    }

    render() {
        const {
            teamExpenseItemList,
            fetchTeamExpenseItemLoader
        } = this.props;

        let visibleNode = [];

        if (teamExpenseItemList && teamExpenseItemList.length) {
            visibleNode = (
                <>
                    <FlatList
                        data={teamExpenseItemList}
                        renderItem={({ item }) =>
                            <TeamExpenseTuple
                                data={item}
                                onPress={() => {
                                    this.onExpenseItemClick(item);
                                }} />}
                        keyExtractor={(item, id) => id + ''}
                        onRefresh={() => this.fetchExpenseItem()}
                        refreshing={fetchTeamExpenseItemLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Expense Found'} />}
                    />
                    <RemarksModal
                        isVisible={this.state.isModalVisible}
                        toggleModal={this.toggleModal}
                        handleSubmit={this.onSubmitClick}
                        handleCancel={this.onCancelClick}
                        expenseForm={this.props.expenseForm}
                        changeExpenseForm={this.props.changeExpenseForm}
                        loader={this.props.updateExpenseLoader}
                        item={this.props.selectTeamExpenseItem} />
                </>
            );
        } else if (teamExpenseItemList && !teamExpenseItemList.length && !fetchTeamExpenseItemLoader) {
            visibleNode = <NoDataFound text={'No Expense Found'} />
        } else {
            visibleNode = <Loading />
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
    teamExpenseItemList: state.local.teamExpenseItemList,
    selectTeamExpense: state.local.selectTeamExpense,
    selectTeamExpenseItem: state.local.selectTeamExpenseItem,
    fetchTeamExpenseItemLoader: state.local.fetchTeamExpenseItemLoader,
    monthNumber: state.local.monthNumber,
    sendApprovalLoader: state.local.sendApprovalLoader,
    expenseForm: state.local.expenseForm,
    updateExpenseLoader: state.local.updateExpenseLoader
});

const mapDispatchToProps = (dispatch) => ({
    fetchTeamItemExpenses: (params) => dispatch(LocalActions.fetchTeamItemExpenses(params)),
    selectTeamItemExpense: (params) => dispatch(LocalActions.selectTeamItemExpense(params)),
    clearSelectTeamItemExpense: () => dispatch(LocalActions.clearSelectTeamItemExpense()),
    updateLocalExpenseList: (params) => dispatch(LocalActions.updateLocalExpenseList(params)),
    changeExpenseForm: (params) => dispatch(LocalActions.changeExpenseForm(params)),
    addRemark: (params) => dispatch(LocalActions.addRemark(params)),
    clearExpenseForm: () => dispatch(LocalActions.clearExpenseForm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationTeamExpenseListScreen)

