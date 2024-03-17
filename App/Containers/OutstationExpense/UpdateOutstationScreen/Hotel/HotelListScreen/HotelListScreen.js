import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../../Components/Loading';
import { HelperService } from '../../../../../Services/Utils/HelperService';
import { Colors } from '../../../../../Theme';
import HotelTuple from '../HotelTuple';
import Style from './HotelListScreenStyle';

class HotelListScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchHotelItem();
    }

    componentWillUnmount() {
        this.props.clearHotelList();
    }

    fetchHotelItem() {
        const { token, agentid, selectMyOutstationExpense, fetchHotelExpenses } = this.props;
        fetchHotelExpenses({
            token,
            agentid,
            id: selectMyOutstationExpense.sfid,
            type: 'hotel'
        })
    }

    // onSave = () => {
    //     const { hotelExpenseList, updateAddExpenseItemList, addExpenseItemList } = this.props;
    //     for (let i = 0; i < hotelExpenseList.length; i++) {
    //         let data = { ...hotelExpenseList[i], ...{ outstation_type__c: 'Hotel/Own Arrangement/DA' } }
    //         updateAddExpenseItemList(data);
    //     }
    //     HelperService.showToast({ message: 'Hotel Expense Saved Successfully!' });
    //     console.log(addExpenseItemList, "ADD EXPENSE LIST");
    // }

    onExpenseItemClick = (item) => {
        this.props.selectHotelExpense(item);
        NavigationService.navigate('HotelInfo', { data: item });
    }

    render() {
        const {
            hotelExpenseList,
            fetchHotelExpenseLoader,
            cityList
        } = this.props;

        let visibleNode = [];

        if (hotelExpenseList && hotelExpenseList.length) {
            visibleNode = (
                <FlatList
                    data={hotelExpenseList}
                    renderItem={({ item }) =>
                        <HotelTuple
                            data={item}
                            cityList={cityList}
                            list={hotelExpenseList}
                            onPress={() => {
                                this.onExpenseItemClick(item);
                            }} />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchHotelItem()}
                    refreshing={fetchHotelExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Record Found'} />}
                />
            );
        } else if (fetchHotelExpenseLoader) {
            visibleNode = <Loading />
        } else if (!fetchHotelExpenseLoader) {
            visibleNode = <NoDataFound text={'No Record Found'} />
        }

        // let saveBtn = hotelExpenseList.length ? <TouchableHighlight
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
                    onPress={() => { NavigationService.navigate('AddHotelScreen') }}>
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
    hotelExpenseList: state.outstations.hotelExpenseList,
    fetchHotelExpenseLoader: state.outstations.fetchHotelExpenseLoader,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
    cityList: state.tours.cityList,
    addExpenseItemList: state.outstations.addExpenseItemList
});

const mapDispatchToProps = (dispatch) => ({
    fetchHotelExpenses: (params) => dispatch(OutstationActions.fetchHotelExpenses(params)),
    selectHotelExpense: (params) => dispatch(OutstationActions.selectHotelExpense(params)),
    updateAddExpenseItemList: (params) => dispatch(OutstationActions.updateAddExpenseItemList(params)),
    clearHotelList: () => dispatch(OutstationActions.clearHotelList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HotelListScreen)

