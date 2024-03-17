import NoDataFound from 'App/Components/NoDataFound';
import { HelperService } from 'App/Services/Utils/HelperService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../../Components/Loading';
import LocalExpenseTuple from '../LocalExpenseTuple/LocalExpenseTuple';
import Style from './LocalExpenseListScreenStyle';
import NavigationService from '../../../../../Services/NavigationService';
;

class LocalExpenseList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchLocalExpenseList();
    }

    fetchLocalExpenseList = () => {
        const { token, agentid, fetchLocalExpenses, selectMyOutstationExpense } = this.props;
        fetchLocalExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'local'
        });
    }

    componentWillUnmount() {
        this.props.clearLocalExpenseList();
    }

    onExpenseItemClick = (item) => {
        this.props.selectLocalExpense(item);
        NavigationService.navigate('LocalExpenseInfoView', { data: item });
    }

    render() {
        const {
            fetchLocalExpenseLoader,
            retailerList,
            dealerList,
            localExpenseList
        } = this.props;

        let visibleNode = [];

        if (localExpenseList && localExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={localExpenseList}
                    renderItem={({ item, index }) =>
                        <LocalExpenseTuple
                            data={item}
                            list={localExpenseList}
                            retailerList={retailerList}
                            dealerList={dealerList}
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />
                    }
                    onRefresh={() => this.fetchLocalExpenseList()}
                    refreshing={fetchLocalExpenseLoader}
                    keyExtractor={(item, id) => id + ''}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Found'} />}
                />
            );
        } else if (fetchLocalExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchLocalExpenseLoader) {
            visibleNode = <NoDataFound text={'No Expense Found'} />
        }

        return (
            <View style={Style.container}>
                <View>
                    {visibleNode}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    visitExpenseList: state.outstations.visitExpenseItem,
    fetchLocalExpenseLoader: state.outstations.fetchLocalExpenseLoader,
    dealerList: state.retailers.dealersSearchList,
    retailerList: state.retailers.retailersSearchList,
    addExpenseItemList: state.outstations.addExpenseItemList,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
    submitExpenseItemLoader: state.outstations.submitExpenseItemLoader,
    localExpenseList: state.outstations.localExpenseList,

});

const mapDispatchToProps = (dispatch) => ({
    fetchVisitExpenseItem: (params) => dispatch(OutstationActions.fetchVisitExpenseItem(params)),
    updateVisitExpenseList: (params) => dispatch(OutstationActions.updateVisitExpenseList(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    updateLocalExpenseStatus: (params) => dispatch(OutstationActions.updateLocalExpenseStatus(params)),
    clearAddExpenseItemList: () => dispatch(OutstationActions.clearAddExpenseItemList()),
    submitExpenseItem: (params) => dispatch(OutstationActions.submitExpenseItem(params)),
    fetchLocalExpenses: (params) => dispatch(OutstationActions.fetchLocalExpenses(params)),
    clearLocalExpenseList: () => dispatch(OutstationActions.clearLocalExpenseList()),
    selectLocalExpense: (params) => dispatch(OutstationActions.selectLocalExpense(params)),
    fetchLocalExpenseSuccess: (params) => dispatch(OutstationActions.fetchLocalExpenseSuccess(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseList)

