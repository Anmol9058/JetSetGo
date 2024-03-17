import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import ExpenseActions from 'App/Stores/ExpenseItem/Actions';
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
//import { HelperService } from '../../../Services/Utils/HelperService';
import TeamExpenseCard from './TeamExpenseCard';
import { StyleSheet} from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

class TeamExpenseScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    onExpenseItemClick = (item) => {
        const { token, agentid, moveLocalToOutstationExpense } = this.props;
    }


    render() {
        const { localItemList, fetchLocalItemLoader } = this.props;
        let visibleNode = [];
        console.log(localItemList, "LOCAL DATA");
/* 
        if (localItemList && localItemList.length) {
            visibleNode = (
                <FlatList
                    data={localItemList}
                    renderItem={({ item }) =>
                        <MyExpenseCard
                            data={item}
                            list={localItemList}
                            handleClicked={() => {}}
                        />}
                    keyExtractor={(item, id) => id + ''}
                    onRefresh={() => this.fetchExpense()}
                    refreshing={fetchLocalItemLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Item Found :/'} />}
                />)
        } else if (fetchLocalItemLoader) {
            visibleNode = <Loading />
        } else if (localItemList && !localItemList.length && !fetchLocalItemLoader) {
            visibleNode = <NoDataFound text={'No Expense Item Found :?'} />
        } */
        visibleNode=(
            <FlatList 
                data={[{'expenseId':'Exp-003','amount':'$123'},{'expenseId':'Exp-003','amount':'$123'}]}
                renderItem={({item}) => 
                    <TeamExpenseCard />}
                
            />
        ) 
        

        return (
            <View style={Style.container}>
                  {visibleNode}  
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    localItemList: state.expenses.localItemList,
    fetchLocalItemLoader: state.expenses.fetchLocalItemLoader,
    monthNumber: state.expenses.monthNumber,
    type: state.expenses.type
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocalItem: (params) => dispatch(ExpenseActions.fetchLocalItem(params)),
    moveLocalToOutstationExpense: (params) => dispatch(ExpenseActions.moveLocalToOutstationExpense(params))
});

Style=StyleSheet.create({
    action: {
        // marginTop: 80,
        width: 360,
    },
    button: {
        ...Metrics.mediumVerticalMargin,
        ...Metrics.smallBottomMargin,
        backgroundColor: Colors.button,
        borderColor: Colors.border,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    container: {
        ...Helpers.center,
        backgroundColor: Colors.white,
        flex: 1,
        width: '100%',
        marginTop: 5
    },
    link: {
        color: Colors.label,
        flexDirection: 'row',
        height: 30,
        justifyContent: 'flex-end',
    },
    linkText: {
        ...Fonts.input,
        color: Colors.label,
    },
    mb10: {
        marginBottom: 10,
    },
    plus: {
        backgroundColor: Colors.white,
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    plusIcon: {
        borderRadius: 50,
        bottom: 75,
        position: 'absolute',
        right: 25,
        borderRadius: 50,
        height: 45,
        width: 45,
        backgroundColor: Colors.button,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textFont,
        fontSize: 18,
    },
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamExpenseScreen)

