import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import BlueButton from '../../../Components/BlueButton';
import Loading from '../../../Components/Loading';
import OutstationExpenseTuple from '../OutstationExpenseTuple';
import Style from './OutstationExpenseListScreenStyle';
import OutstationActions from '../../../Stores/OutstationExpense/Actions';
import { DummyData } from './dummyContent';

class OutstationExpenseListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchExpenseItem();
    }


    fetchExpenseItem() {
        const { token, agentid, selectMyOutstationExpense, fetchMyOutstationItemExpenses } = this.props;
        fetchMyOutstationItemExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid
        })
    }

    onSubmit = () => {
        const { outstationExpenseItemList, sendForApproval, token, agentid } = this.props;
        let expenseIdArr = [];
        for (let i = 0; i < outstationExpenseItemList.length; i++) {
            expenseIdArr.push(outstationExpenseItemList[i].sfid);
        }
        sendForApproval({
            token,
            agentid,
            expense_ids: expenseIdArr
        })
    }

    onExpenseItemClick = (item) => {
        this.props.selectMyOutstationItemExpense(item);
        NavigationService.navigate('TravelListScreen', { 'hide': false });
    }

    render() {
        const {
            outstationExpenseItemList,
            fetchMyOutstationExpenseItemLoader
        } = this.props;

        let visibleNode = [];

        // if (outstationExpenseItemList && outstationExpenseItemList.length) {
        visibleNode = (
            <>
                <FlatList
                    data={DummyData}
                    renderItem={({ item }) =>
                        <OutstationExpenseTuple
                            data={item}
                            list={outstationExpenseItemList}
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchExpenseItem()}
                    refreshing={fetchMyOutstationExpenseItemLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Found'} />}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 8, width: '100%' }}>
                    <BlueButton
                        onPress={this.onSubmit}
                        title={'Submit For Approval'}
                        style={{ width: '70%', height: 40 }}
                    />
                </View>
            </>
        );
        // } else if (outstationExpenseItemList && !outstationExpenseItemList.length && !fetchMyOutstationExpenseItemLoader) {
        //     visibleNode = <NoDataFound text={'No Expense Found'} />
        // } else {
        //     visibleNode = <Loading />
        // }

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
    outstationExpenseItemList: state.outstations.outstationExpenseItemList,
    selectMyOutstationItemExpense: state.outstations.selectMyOutstationItemExpense,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
    fetchMyOutstationExpenseItemLoader: state.outstations.fetchMyOutstationExpenseItemLoader,
    monthNumber: state.outstations.monthNumber,
    sendApprovalLoader: state.outstations.sendApprovalLoader
});

const mapDispatchToProps = (dispatch) => ({
    fetchMyOutstationItemExpenses: (params) => dispatch(OutstationActions.fetchMyOutstationItemExpenses(params)),
    selectMyOutstationItemExpense: (params) => dispatch(OutstationActions.selectMyOutstationItemExpense(params)),
    clearSelectMyOutstationItemExpense: () => dispatch(OutstationActions.clearSelectMyOutstationItemExpense()),
    updateMyOutstationExpenseList: (params) => dispatch(OutstationActions.updateMyOutstationExpenseList(params)),
    sendForApproval: (params) => dispatch(OutstationActions.sendApproval(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationExpenseListScreen)

