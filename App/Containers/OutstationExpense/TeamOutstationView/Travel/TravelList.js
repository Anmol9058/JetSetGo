import NoDataFound from 'App/Components/NoDataFound';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../Components/Loading';
import TravelTuple from '../../UpdateOutstationScreen/Travel/TravelTuple/TravelTuple';
import Style from '../../UpdateOutstationScreen/Travel/TravelListScreen/TravelListScreenStyle';
import NavigationService from '../../../../Services/NavigationService'

class TravelListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchTravelItem();
    }

    componentWillUnmount() {
        this.props.clearTravelList();
    }


    fetchTravelItem() {
        const { token, agentid, fetchTravelExpenses, selectTeamOutstationExpense } = this.props;
        fetchTravelExpenses({
            token,
            agentid,
            id: selectTeamOutstationExpense.sfid,
            type: 'travel'
        })
    }

    onItemClick = (item) => {
        NavigationService.navigate("TravelInfoScreen", { data: item })
    }

    render() {
        const {
            travelList,
            fetchTravelExpenseLoader
        } = this.props;

        let visibleNode = [];
        console.log(travelList, "TRAVEL LIST");

        if (travelList && travelList.length) {
            visibleNode = (
                <>
                    <FlatList
                        data={travelList}
                        renderItem={({ item }) =>
                            <TravelTuple
                                data={item}
                                list={travelList}
                                onPress={() => { this.onItemClick(item) }} />}
                        keyExtractor={(item, id) => id + ''}
                        onRefresh={() => this.fetchTravelItem()}
                        refreshing={fetchTravelExpenseLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Record Found'} />}
                    />
                </>
            );
        } else if (fetchTravelExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchTravelExpenseLoader) {
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
    travelList: state.outstations.travelExpenseList,
    fetchTravelExpenseLoader: state.outstations.fetchTravelExpenseLoader,
    selectTeamOutstationExpense: state.outstations.selectTeamOutstationExpense,
    selectTravelExpense: state.outstations.selectTravelExpense,
    addExpenseItemList: state.outstations.addExpenseItemList
});

const mapDispatchToProps = (dispatch) => ({
    fetchTravelExpenses: (params) => dispatch(OutstationActions.fetchTravelExpenses(params)),
    selectTravelExpense: (params) => dispatch(OutstationActions.selectTravelExpense(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    clearTravelList: () => dispatch(OutstationActions.clearTravelList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TravelListView)

