import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../../../../../Theme';
import Style from './FoodListScreenStyle';
import FoodTuple from '../FoodTuple';
import Loading from '../../../../../Components/Loading';
import { HelperService } from '../../../../../Services/Utils/HelperService';

class FoodListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchFoodItem();
    }

    componentWillUnmount() {
        this.props.clearFoodList();
    }


    fetchFoodItem() {
        const { token, agentid, selectMyOutstationExpense, fetchFoodExpenses } = this.props;
        fetchFoodExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'food'
        })
    }

    // onSave = () => {
    //     const { foodExpenseList, updateAddExpenseItemList, addExpenseItemList } = this.props;
    //     for (let i = 0; i < foodExpenseList.length; i++) {
    //         let data = { ...foodExpenseList[i], ...{ outstation_type__c: 'Food Expense' } }
    //         updateAddExpenseItemList(data);
    //     }
    //     HelperService.showToast({ message: 'Food Expense Saved Successfully!' });
    //     console.log(addExpenseItemList, "ADD EXPENSE LIST");
    // }

    onExpenseItemClick = (item) => {
        this.props.selectFoodExpense(item);
        NavigationService.navigate('FoodInfo', { data: item });
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
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />}
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

        // let saveBtn = foodExpenseList.length ? <TouchableHighlight
        //     style={Style.saveBtn}
        //     onPress={() => { this.onSave() }}>
        //     <Text style={{ fontSize: 14, textTransform: 'uppercase', color: 'white' }}>Save</Text>
        // </TouchableHighlight> : <></>;

        return (
            <View style={Style.container}>
                <View>
                    {visibleNode}
                </View>
                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => { NavigationService.navigate('AddFoodScreen') }}>
                    <Icon
                        name={'ios-add'}
                        ios={'ios-add'}
                        android={'md-add'}
                        style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
                    />
                </TouchableHighlight>
                {/* {saveBtn} */}
            </View>

        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    foodExpenseList: state.outstations.foodExpenseList,
    fetchFoodExpenseLoader: state.outstations.fetchFoodExpenseLoader,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
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
)(FoodListScreen)

