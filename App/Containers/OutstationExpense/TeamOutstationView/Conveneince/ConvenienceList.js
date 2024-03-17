import NoDataFound from 'App/Components/NoDataFound';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../../Components/Loading';
import Style from '../../UpdateOutstationScreen/Convenience/ConvenienceListScreen/ConvenienceListScreenStyle';
import ConvenienceTuple from '../../UpdateOutstationScreen/Convenience/ConvenienceTuple/ConvenienceTuple';
import NavigationService from '../../../../Services/NavigationService';

class ConvenienceListView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchConvenienceItem();
    }

    componentWillUnmount() {
        this.props.clearConvenienceList();
    }

    onItemClick = (item) => {
        NavigationService.navigate("ConvenienceInfoScreen", { data: item })
    }


    fetchConvenienceItem() {
        const { token, agentid, selectTeamOutstationExpense, fetchConvenienceExpenses } = this.props;
        fetchConvenienceExpenses({
            token,
            agentid,
            id: selectTeamOutstationExpense.sfid,
            type: 'convenience'
        })
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
                            onPress={() => { this.onItemClick(item) }}
                        />
                    }
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
    convenienceExpenseList: state.outstations.convenienceExpenseList,
    fetchConvenienceExpenseLoader: state.outstations.fetchConvenienceExpenseLoader,
    selectTeamOutstationExpense: state.outstations.selectTeamOutstationExpense,
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
)(ConvenienceListView)

