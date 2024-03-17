import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../../../../../Theme';
import IncidentalTuple from '../IncidentalTuple.js';
import Style from './IncidentalListScreenStyle';
import Loading from '../../../../../Components/Loading';
import { HelperService } from '../../../../../Services/Utils/HelperService';

class IncidentalListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchIncidentalItem();
    }

    componentWillUnmount() {
        this.props.clearIncidentalList();
    }


    fetchIncidentalItem() {
        const { token, agentid, selectMyOutstationExpense, fetchIncidentalExpenses } = this.props;
        fetchIncidentalExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'incidental'
        })
    }

    // onSave = () => {
    //     const { incidentalExpenseList, updateAddExpenseItemList, addExpenseItemList } = this.props;
    //     for (let i = 0; i < incidentalExpenseList.length; i++) {
    //         let data = { ...incidentalExpenseList[i], ...{ outstation_type__c: 'Incidental Expense' } }
    //         updateAddExpenseItemList(data);
    //     }
    //     HelperService.showToast({ message: 'Incidental Expense Saved Successfully!' });
    //     console.log(addExpenseItemList, "ADD EXPENSE LIST");
    // }

    onExpenseItemClick = (item) => {
        this.props.selectIncidentalExpense(item);
        NavigationService.navigate('IncidentalInfo', { data: item });
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
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />}
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

        // let saveBtn = incidentalExpenseList.length ? <TouchableHighlight
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
                    onPress={() => { NavigationService.navigate('AddIncidentalScreen') }}>
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
    incidentalExpenseList: state.outstations.incidentalExpenseList,
    fetchIncidentalExpenseLoader: state.outstations.fetchIncidentalExpenseLoader,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
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
)(IncidentalListScreen)

