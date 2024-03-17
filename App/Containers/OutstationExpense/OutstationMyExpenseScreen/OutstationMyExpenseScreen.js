import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../Components/Loading';
import OutstationActions from '../../../Stores/OutstationExpense/Actions';
import { Colors } from '../../../Theme';
import OutstationMyExpenseTupleScreen from '../OutstationMyExpenseTuple';
import Style from './OutstationMyExpenseScreenStyle';


class OutstationMyExpenseScreen extends Component {

    componentDidMount() {
        this.props.clearSelectMyOutstationExpense();
        this.fetchExpense();
    }

    fetchExpense() {
        const { token, agentid, fetchMyOutstationExpenses, monthNumber } = this.props;
        fetchMyOutstationExpenses({
            token,
            agentid,
            type: 'outstation',
            month: monthNumber,
            expense_type: 'self'
        })
    }

    onExpenseItemClick = (item) => {
        const { selectMyOutstationExpense, selectTeamOutstationExpense } = this.props;
        if (item.expense_status__c === 'Draft') {
            selectMyOutstationExpense(item);
            NavigationService.navigate('TravelListScreen');
        } else {
            selectTeamOutstationExpense(item);
            NavigationService.navigate('TravelListView');
        }

    }

    onEmailClick = (item) => {
        const { token, agentid, updateEmailStatus } = this.props;
        updateEmailStatus({
            token,
            agentid,
            payload: {
                "expense_ids": [item.sfid]
            }
        })
    }

    onSubmitForApproval = (item) => {
        const { sendApprovalOutstationExpense, token, agentid } = this.props;
        sendApprovalOutstationExpense({
            token,
            agentid,
            expense_ids: [`${item.sfid}`]
        })
    }


    render() {
        const { outstationExpenseList, fetchMyOutstationExpenseLoader } = this.props;

        let visibleNode = [];

        if (outstationExpenseList && outstationExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={outstationExpenseList}
                    renderItem={({ item }) =>
                        <OutstationMyExpenseTupleScreen
                            data={item}
                            list={outstationExpenseList}
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }}
                            onEmailClick={() => { this.onEmailClick(item) }}
                            onSubmit={() => this.onSubmitForApproval(item)}
                        />
                    }
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchExpense()}
                    refreshing={fetchMyOutstationExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Outstation Expense Found'} />}
                />);
        }
        else if (outstationExpenseList && !outstationExpenseList.length && !fetchMyOutstationExpenseLoader) {
            visibleNode = <NoDataFound text={'No Outstation Expense Found'} />
        } else if (!fetchMyOutstationExpenseLoader) {
            visibleNode = <Loading />
        }

        return (
            <View style={Style.container}>
                <View>
                    {visibleNode}
                </View>
                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => { NavigationService.navigate('TourApprovalScreen') }}>
                    <Icon
                        name={'ios-add'}
                        ios={'ios-add'}
                        android={'md-add'}
                        style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    outstationExpenseList: state.outstations.outstationExpenseList,
    fetchMyOutstationExpenseLoader: state.outstations.fetchMyOutstationExpenseLoader,
    monthNumber: state.outstations.monthNumber,
    type: state.outstations.type,
    outstationExpenseItemList: state.outstations.outstationExpenseItemList,
    selectMyOutstation: state.outstations.selectMyOutstationExpense,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMyOutstationExpenses: (params) => dispatch(OutstationActions.fetchMyOutstationExpenses(params)),
    selectMyOutstationExpense: (params) => dispatch(OutstationActions.selectMyOutstationExpense(params)),
    selectTeamOutstationExpense: (params) => dispatch(OutstationActions.selectTeamOutstationExpense(params)),
    fetchMyOutstationItemExpenses: (params) => dispatch(OutstationActions.fetchMyOutstationItemExpenses(params)),
    fetchVisitByTour: (params) => dispatch(OutstationActions.fetchVisitByTour(params)),
    updateEmailStatus: (params) => dispatch(OutstationActions.updateEmailStatus(params)),
    clearSelectMyOutstationExpense: () => dispatch(OutstationActions.clearSelectMyOutstationExpense()),
    sendApprovalOutstationExpense: (params) => dispatch(OutstationActions.sendApprovalOutstationExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationMyExpenseScreen)

