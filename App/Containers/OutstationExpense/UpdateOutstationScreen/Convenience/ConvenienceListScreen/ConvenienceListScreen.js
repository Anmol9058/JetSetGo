import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import Loading from '../../../../../Components/Loading';
import Style from './ConvenienceListScreenStyle';
import { Colors } from '../../../../../Theme';
import { DummyData } from '../../../OutstationMyExpenseScreen/DummyContent';
import ConvenienceTuple from '../ConvenienceTuple';
import { HelperService } from '../../../../../Services/Utils/HelperService';

class ConvenienceListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchConvenienceItem();
    }

    componentWillUnmount() {
        this.props.clearConvenienceList();
    }


    fetchConvenienceItem() {
        const { token, agentid, selectMyOutstationExpense, fetchConvenienceExpenses } = this.props;
        fetchConvenienceExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'convenience'
        })
    }

    // onSave = () => {
    //     const { convenienceExpenseList, updateAddExpenseItemList, addExpenseItemList } = this.props;
    //     for (let i = 0; i < convenienceExpenseList.length; i++) {
    //         let data = { ...convenienceExpenseList[i], ...{ outstation_type__c: 'Conveyance' } }
    //         updateAddExpenseItemList(data);
    //     }
    //     HelperService.showToast({ message: 'Convenience Expense Saved Successfully!' });
    //     console.log(addExpenseItemList, "ADD EXPENSE LIST");
    // }

    onExpenseItemClick = (item) => {
        this.props.selectConvenienceExpense(item);
        NavigationService.navigate('ConvenienceUpdateScreen');
    }

    render() {
        const {
            convenienceExpenseList,
            fetchConvenienceExpenseLoader,
            cityList
        } = this.props;

        let visibleNode = [];

        if (convenienceExpenseList && convenienceExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={convenienceExpenseList}
                    renderItem={({ item }) =>
                        <ConvenienceTuple
                            cityList={cityList}
                            data={item}
                            list={convenienceExpenseList}
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchConvenienceItem()}
                    refreshing={fetchConvenienceExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Record Found'} />}
                />
            );
        } else if (fetchConvenienceExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchConvenienceExpenseLoader) {
            visibleNode = <NoDataFound text={'No Record Found'} />
        }

        // let saveBtn = convenienceExpenseList.length ? <TouchableHighlight
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
                    onPress={() => { NavigationService.navigate('AddConvenienceScreen') }}>
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
    convenienceExpenseList: state.outstations.convenienceExpenseList,
    fetchConvenienceExpenseLoader: state.outstations.fetchConvenienceExpenseLoader,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
    cityList: state.tours.cityList,
    addExpenseItemList: state.outstations.addExpenseItemList
});

const mapDispatchToProps = (dispatch) => ({
    fetchConvenienceExpenses: (params) => dispatch(OutstationActions.fetchConvenienceExpenses(params)),
    selectConvenienceExpense: (params) => dispatch(OutstationActions.selectConvenienceExpense(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    clearConvenienceList: () => dispatch(OutstationActions.clearConvenienceList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConvenienceListScreen)

