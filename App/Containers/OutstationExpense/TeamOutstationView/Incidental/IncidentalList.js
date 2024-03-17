import NoDataFound from 'App/Components/NoDataFound';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../Components/Loading';
import IncidentalTuple from '../../UpdateOutstationScreen/Incidental/IncidentalTuple.js';
import NavigationService from '../../../../Services/NavigationService'
import Style from '../../UpdateOutstationScreen/Incidental/IncidentalListScreen/IncidentalListScreenStyle';

class IncidentalListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchIncidentalItem();
    }

    componentWillUnmount() {
        this.props.clearIncidentalList();
    }

    onItemClick = (item) => {
        NavigationService.navigate("IncidentalInfoScreen", { data: item })
    }


    fetchIncidentalItem() {
        const { token, agentid, selectTeamOutstationExpense, fetchIncidentalExpenses } = this.props;
        fetchIncidentalExpenses({
            token,
            agentid,
            id: selectTeamOutstationExpense.sfid,
            type: 'incidental'
        })
    }


    render() {
        const {
            incidentalExpenseList,
            fetchIncidentalExpenseLoader
        } = this.props;

        let visibleNode = [];

        if (incidentalExpenseList && incidentalExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={incidentalExpenseList}
                    renderItem={({ item }) =>
                        <IncidentalTuple
                            data={item}
                            list={incidentalExpenseList}
                            onPress={() => { this.onItemClick(item) }}
                        />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchIncidentalItem()}
                    refreshing={fetchIncidentalExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Record Found'} />}
                />
            );
        } else if (fetchIncidentalExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchIncidentalExpenseLoader) {
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
    incidentalExpenseList: state.outstations.incidentalExpenseList,
    fetchIncidentalExpenseLoader: state.outstations.fetchIncidentalExpenseLoader,
    selectTeamOutstationExpense: state.outstations.selectTeamOutstationExpense,
    addExpenseItemList: state.outstations.addExpenseItemList
});

const mapDispatchToProps = (dispatch) => ({
    fetchIncidentalExpenses: (params) => dispatch(OutstationActions.fetchIncidentalExpenses(params)),
    selectIncidentalExpense: (params) => dispatch(OutstationActions.selectIncidentalExpense(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    clearIncidentalList: () => dispatch(OutstationActions.clearIncidentalList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentalListView)

