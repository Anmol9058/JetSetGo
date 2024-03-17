import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import ExpenseActions from 'App/Stores/ExpenseItem/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './LocalExpenseStyle';
import LocalExpenseItemTuple from '../LocalExpenseItemTuple';

class LocalExpenseItemScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchExpense();
    }

    fetchExpense() {
        const { token, agentid, fetchLocalItem, monthNumber } = this.props;
        fetchLocalItem({
            token,
            agentid,
            month: monthNumber
        });
    }

    onExpenseItemClick = (item) => {
        const { token, agentid, moveLocalToOutstationExpense } = this.props;
        HelperService.showAlert({
            heading: 'Move Expense',
            message: 'Are you sure you want to move this expense into Outstation Expense?',
            onSuccess: () => {
                moveLocalToOutstationExpense({
                    token,
                    agentid,
                    payload: {
                        expense_item_id: item.sfid
                    }
                });
            }
        });
    }


    render() {
        const { localItemList, fetchLocalItemLoader } = this.props;
        let visibleNode = [];
        console.log(localItemList, "LOCAL DATA");

        if (localItemList && localItemList.length) {
            visibleNode = (
                <FlatList
                    data={localItemList}
                    renderItem={({ item }) =>
                        <LocalExpenseItemTuple
                            data={item}
                            list={localItemList}
                            handleChecked={() => {
                                this.onExpenseItemClick(item);
                            }}
                        />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchExpense()}
                    refreshing={fetchLocalItemLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Item Found'} />}
                />)
        } else if (fetchLocalItemLoader) {
            visibleNode = <Loading />
        } else if (localItemList && !localItemList.length && !fetchLocalItemLoader) {
            visibleNode = <NoDataFound text={'No Expense Item Found'} />
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
    localItemList: state.expenses.localItemList,
    fetchLocalItemLoader: state.expenses.fetchLocalItemLoader,
    monthNumber: state.expenses.monthNumber,
    type: state.expenses.type
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocalItem: (params) => dispatch(ExpenseActions.fetchLocalItem(params)),
    moveLocalToOutstationExpense: (params) => dispatch(ExpenseActions.moveLocalToOutstationExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseItemScreen)

