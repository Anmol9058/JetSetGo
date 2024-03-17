import NoDataFound from 'App/Components/NoDataFound';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../Components/Loading';
import Style from '../../UpdateOutstationScreen/Hotel/HotelListScreen/HotelListScreenStyle';
import HotelTuple from '../../UpdateOutstationScreen/Hotel/HotelTuple/HotelTuple';
import NavigationService from '../../../../Services/NavigationService'

class HotelListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchHotelItem();
    }

    componentWillUnmount() {
        this.props.clearHotelList();
    }

    onItemClick = (item) => {
        NavigationService.navigate("HotelInfoScreen", { data: item })
    }

    fetchHotelItem() {
        const { token, agentid, selectTeamOutstationExpense, fetchHotelExpenses } = this.props;
        fetchHotelExpenses({
            token,
            agentid,
            id: selectTeamOutstationExpense.sfid,
            type: 'hotel'
        })
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
                            onPress={() => { this.onItemClick(item) }}
                        />}
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
    hotelExpenseList: state.outstations.hotelExpenseList,
    fetchHotelExpenseLoader: state.outstations.fetchHotelExpenseLoader,
    selectTeamOutstationExpense: state.outstations.selectTeamOutstationExpense,
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
)(HotelListView)

