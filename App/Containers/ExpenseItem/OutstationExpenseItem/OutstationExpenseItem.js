import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import ExpenseActions from 'App/Stores/ExpenseItem/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './OutstationExpenseItemStyle';
import OutstationExpenseItemTuple from '../OutstationExpenseItemTuple';

class OutstationExpenseItemScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchExpense();
    }

    fetchExpense() {
        const { token, agentid, fetchOutstationItem, monthNumber } = this.props;
        fetchOutstationItem({
            token,
            agentid,
            month: monthNumber
        });
    }

    onExpenseItemClick = (item) => {
        const { token, agentid, moveOutstationToLocalExpense } = this.props;
        HelperService.showAlert({
            heading: 'Move Expense',
            message: 'Are you sure you want to move this expense into Local Expense?',
            onSuccess: () => {
                moveOutstationToLocalExpense({
                    token,
                    agentid,
                    payload: {
                        "expense_item_id": item.sfid
                    }
                });
            }
        });
    }


    render() {
        const { outstationItemList, fetchOutstationItemLoader } = this.props;
        let visibleNode = [];

        if (outstationItemList && outstationItemList.length) {
            visibleNode = (
                <FlatList
                    data={outstationItemList}
                    renderItem={({ item }) =>
                        <OutstationExpenseItemTuple
                            data={item}
                            list={outstationItemList}
                            handleChecked={() => {
                                this.onExpenseItemClick(item);
                            }}
                        />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchExpense()}
                    refreshing={fetchOutstationItemLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Item Found'} />}
                />)
        } else if (fetchOutstationItemLoader) {
            visibleNode = <Loading />
        } else if (outstationItemList && !outstationItemList.length && !fetchOutstationItemLoader) {
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
    outstationItemList: state.expenses.outstationItemList,
    fetchOutstationItemLoader: state.expenses.fetchOutstationItemLoader,
    monthNumber: state.expenses.monthNumber,
    type: state.expenses.type
});

const mapDispatchToProps = (dispatch) => ({
    fetchOutstationItem: (params) => dispatch(ExpenseActions.fetchOutstationItem(params)),
    moveOutstationToLocalExpense: (params) => dispatch(ExpenseActions.moveOutstationToLocalExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationExpenseItemScreen)

