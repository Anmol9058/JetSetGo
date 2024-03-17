import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import Loading from '../../../../../Components/Loading';
import TravelTuple from '../TravelTuple'
import Style from './TravelListScreenStyle';
import { Colors } from '../../../../../Theme';
import { HelperService } from '../../../../../Services/Utils/HelperService';

class TravelListScreen extends Component {

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
        console.log(this.props.selectMyOutstationExpense, "SFID DATA");
        const { token, agentid, fetchTravelExpenses, selectMyOutstationExpense } = this.props;
        fetchTravelExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'travel'
        })
    }

    onExpenseItemClick = (item) => {
        this.props.selectTravelExpense(item);
        NavigationService.navigate('TravelInfo', { data: item });
    }

    // onSave = () => {
    //     const { travelList, updateAddExpenseItemList, addExpenseItemList } = this.props;
    //     for (let i = 0; i < travelList.length; i++) {
    //         let data = { ...travelList[i], ...{ outstation_type__c: 'Travel Details' } }
    //         updateAddExpenseItemList(data);
    //     }
    //     HelperService.showToast({ message: 'Travel Expense Saved Successfully!' });
    //     console.log(addExpenseItemList, "ADD EXPENSE LIST");
    // }

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
                                onPress={() => { this.onExpenseItemClick(item) }} />}
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

        let saveBtn = travelList.length ? <TouchableHighlight
            style={Style.saveBtn}
            onPress={() => { this.onSave() }}>
            <Text style={{ fontSize: 14, textTransform: 'uppercase', color: 'white' }}>Save</Text>
        </TouchableHighlight> : <></>;

        return (
            <View style={Style.container}>
                <View>
                    {visibleNode}
                </View>
                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => { NavigationService.navigate('AddTravelScreen') }}>
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
    travelList: state.outstations.travelExpenseList,
    fetchTravelExpenseLoader: state.outstations.fetchTravelExpenseLoader,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
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
)(TravelListScreen)

