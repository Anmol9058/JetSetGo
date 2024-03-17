import NoDataFound from 'App/Components/NoDataFound';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../Components/Loading';
import Style from '../../UpdateOutstationScreen/Food/FoodListScreen/FoodListScreenStyle';
import FoodTuple from '../../UpdateOutstationScreen/Food/FoodTuple/FoodTuple';
import NavigationService from '../../../../Services/NavigationService'


class FoodListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchFoodItem();
    }

    componentWillUnmount() {
        this.props.clearFoodList();
    }

    onItemClick = (item) => {
        NavigationService.navigate("FoodInfoScreen", { data: item })
    }


    fetchFoodItem() {
        const { token, agentid, selectTeamOutstationExpense, fetchFoodExpenses } = this.props;
        fetchFoodExpenses({
            token,
            agentid,
            id: selectTeamOutstationExpense.sfid,
            type: 'food'
        })
    }

    render() {
        const {
            foodExpenseList,
            fetchFoodExpenseLoader,
            cityList
        } = this.props;

        let visibleNode = [];

        if (foodExpenseList && foodExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={foodExpenseList}
                    renderItem={({ item }) =>
                        <FoodTuple
                            data={item}
                            cityList={cityList}
                            list={foodExpenseList}
                            onPress={() => { this.onItemClick(item) }}
                        />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchFoodItem()}
                    refreshing={fetchFoodExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Record Found'} />}
                />
            );
        } else if (fetchFoodExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchFoodExpenseLoader) {
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
    foodExpenseList: state.outstations.foodExpenseList,
    fetchFoodExpenseLoader: state.outstations.fetchFoodExpenseLoader,
    selectTeamOutstationExpense: state.outstations.selectTeamOutstationExpense,
    cityList: state.tours.cityList,
    addExpenseItemList: state.outstations.addExpenseItemList
});

const mapDispatchToProps = (dispatch) => ({
    fetchFoodExpenses: (params) => dispatch(OutstationActions.fetchFoodExpenses(params)),
    selectFoodExpense: (params) => dispatch(OutstationActions.selectFoodExpense(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    clearFoodList: () => dispatch(OutstationActions.clearFoodList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodListView)

