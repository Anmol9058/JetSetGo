import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import LocalActions from 'App/Stores/LocalExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import BlueButton from '../../../Components/BlueButton';
import Loading from '../../../Components/Loading';
import LocalExpenseTuple from '../LocalExpenseTuple';
import Style from './LocalExpenseListScreenStyle';
import { HelperService } from '../../../Services/Utils/HelperService';


class LocalExpenseListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchExpenseItem();
    }

    fetchExpenseItem() {
        const { token, agentid, selectLocalExpense, fetchLocalItemExpenses } = this.props;
        fetchLocalItemExpenses({
            token,
            agentid,
            id: selectLocalExpense.sfid
        })
    }

    onSubmit = () => {
        HelperService.showAlert({
            heading: "Note", message: "You will not be able to do further changes. Make sure you have reviewed all the visits and expenses", onSuccess: () => {
                const { sendForApproval, token, agentid, selectLocalExpense } = this.props;
                let expenseIdArr = [];
                expenseIdArr.push(selectLocalExpense.sfid);
                sendForApproval({
                    token,
                    agentid,
                    expense_ids: expenseIdArr
                })
            }
        });
    }

    componentWillUnmount() {
        this.props.clearLocalExpenseItemList();
    }

    onExpenseItemClick = (item) => {
        this.props.selectLocalItemExpense(item);
        NavigationService.navigate('LocalExpenseInfoScreen');
        // NavigationService.navigate('UpdateLocalExpenseScreen');
    }

    render() {
        const {
            localExpenseItemList,
            fetchLocalExpenseItemLoader,
            retailerList,
            dealerList
        } = this.props;

        let visibleNode = [];

        if (localExpenseItemList && localExpenseItemList.length) {
            visibleNode = (
                <>
                    <FlatList
                        data={localExpenseItemList}
                        renderItem={({ item }) =>
                            <LocalExpenseTuple
                                data={item}
                                list={localExpenseItemList}
                                retailerList={retailerList}
                                dealerList={dealerList}
                                onPress={() => {
                                    this.onExpenseItemClick(item);
                                }} />}
                        keyExtractor={(item, id) => id + ''}
                        onRefresh={() => this.fetchExpenseItem()}
                        refreshing={fetchLocalExpenseItemLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Expense Found'} />}
                    />
                    {this.props.navigation.getParam('Local') && <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 8, width: '100%' }}>
                        <BlueButton
                            onPress={this.onSubmit}
                            title={'Submit For Approval'}
                            style={{ width: '70%', height: 40 }}
                        />
                    </View>}
                </>
            );
        } else if (localExpenseItemList && !localExpenseItemList.length && !fetchLocalExpenseItemLoader) {
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
    localExpenseItemList: state.local.localExpenseItemList,
    selectLocalExpense: state.local.selectLocalExpense,
    fetchLocalExpenseItemLoader: state.local.fetchLocalExpenseItemLoader,
    monthNumber: state.local.monthNumber,
    sendApprovalLoader: state.local.sendApprovalLoader,
    dealerList: state.retailers.dealersSearchList,
    retailerList: state.retailers.retailersSearchList
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocalItemExpenses: (params) => dispatch(LocalActions.fetchLocalItemExpenses(params)),
    selectLocalItemExpense: (params) => dispatch(LocalActions.selectLocalItemExpense(params)),
    clearSelectLocalItemExpense: () => dispatch(LocalActions.clearSelectLocalItemExpense()),
    clearLocalExpenseItemList: () => dispatch(LocalActions.clearLocalExpenseItemList()),
    updateLocalExpenseList: (params) => dispatch(LocalActions.updateLocalExpenseList(params)),
    sendForApproval: (params) => dispatch(LocalActions.sendApprovalLocalExpense(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseListScreen)

