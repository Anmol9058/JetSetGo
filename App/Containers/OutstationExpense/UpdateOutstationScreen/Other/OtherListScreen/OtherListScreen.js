import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { BackHandler, FlatList, TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../../Components/Loading';
import { Colors } from '../../../../../Theme';
import OtherTuple from '../OtherTuple';
import Style from './OtherListScreenStyle';
import { HelperService } from '../../../../../Services/Utils/HelperService';

class OtherListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchOtherItem();
    }

    componentWillUnmount() {
        this.props.clearOtherList();
    }


    fetchOtherItem() {
        const { token, agentid, selectMyOutstationExpense, fetchOtherExpenses } = this.props;
        fetchOtherExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'other'
        })
    }

    // onSave = () => {
    //     const { otherExpenseList, updateAddExpenseItemList, addExpenseItemList } = this.props;
    //     for (let i = 0; i < otherExpenseList.length; i++) {
    //         let data = { ...otherExpenseList[i], ...{ outstation_type__c: 'Other Expenses' } }
    //         updateAddExpenseItemList(data);
    //     }
    //     HelperService.showToast({ message: 'Other Expense Saved Successfully!' });
    //     console.log(addExpenseItemList, "ADD EXPENSE LIST");
    // }

    onExpenseItemClick = (item) => {
        this.props.selectOtherExpense(item);
        NavigationService.navigate('OtherInfo', { data: item });
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
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />}
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

        // let saveBtn = otherExpenseList.length ? <TouchableHighlight
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
                    onPress={() => { NavigationService.navigate('AddOtherScreen') }}>
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
    otherExpenseList: state.outstations.otherExpenseList,
    fetchOtherExpenseLoader: state.outstations.fetchOtherExpenseLoader,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
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
)(OtherListScreen)

