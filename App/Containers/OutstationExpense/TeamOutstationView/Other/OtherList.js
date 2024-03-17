import NoDataFound from 'App/Components/NoDataFound';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../Components/Loading';
import OtherTuple from '../../UpdateOutstationScreen/Other/OtherTuple/OtherTuple';
import NavigationService from '../../../../Services/NavigationService'
import Style from '../../UpdateOutstationScreen/Other/OtherListScreen/OtherListScreenStyle';

class OtherListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchOtherItem();
    }

    componentWillUnmount() {
        this.props.clearOtherList();
    }

    onItemClick = (item) => {
        NavigationService.navigate("OtherInfoScreen", { data: item })
    }

    fetchOtherItem() {
        const { token, agentid, selectTeamOutstationExpense, fetchOtherExpenses } = this.props;
        fetchOtherExpenses({
            token,
            agentid,
            id: selectTeamOutstationExpense.sfid,
            type: 'other'
        })
    }

    render() {
        const {
            otherExpenseList,
            fetchOtherExpenseLoader
        } = this.props;

        let visibleNode = [];

        if (otherExpenseList && otherExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={otherExpenseList}
                    renderItem={({ item }) =>
                        <OtherTuple
                            data={item}
                            list={otherExpenseList}
                            onPress={() => { this.onItemClick(item) }} />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchOtherItem()}
                    refreshing={fetchOtherExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Record Found'} />}
                />
            );
        } else if (fetchOtherExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchOtherExpenseLoader) {
            visibleNode = <NoDataFound text={'No Record Found'} />
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
    otherExpenseList: state.outstations.otherExpenseList,
    fetchOtherExpenseLoader: state.outstations.fetchOtherExpenseLoader,
    selectTeamOutstationExpense: state.outstations.selectTeamOutstationExpense,
    addExpenseItemList: state.outstations.addExpenseItemList
});

const mapDispatchToProps = (dispatch) => ({
    fetchOtherExpenses: (params) => dispatch(OutstationActions.fetchOtherExpenses(params)),
    selectOtherExpense: (params) => dispatch(OutstationActions.selectOtherExpense(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    clearOtherList: () => dispatch(OutstationActions.clearOtherList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherListView)

