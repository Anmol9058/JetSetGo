import Colors from 'App/Theme/Colors';
import React, { Component } from 'react';
import Loading from 'App/Components/Loading';
import { connect } from 'react-redux';
import NoDataFound from 'App/Components/NoDataFound';
import { ApplicationStyles } from 'App/Theme'
import { Text, View,TouchableWithoutFeedback,StyleSheet, FlatList } from 'react-native';
import MyExpenseDateWiseCard from './MyExpenseDateWiseCard';
import BlueButton from 'App/Components/BlueButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExpensesActions from 'App/Stores/Expenses/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import moment from 'moment';

class MyExpenseDateWise extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.fetchExpenseLines();
        console.log("MOUNT EXPENSELINES")
    }

    fetchExpenseLines() {
        const { token,fetchExpenseLines, selectedVisitDate} = this.props;
        const sfid=this.props.navigation.state.params.sfid
        const date = this.props.navigation.state.params.date
        fetchExpenseLines({
            token:token,
            sfid:sfid,
            date:date,
            
        });
    }

    render(){
        let expenseList=this.props.myExpenseLinesList
        let visibleNode = [];
        if(expenseList.length&&expenseList){
            visibleNode=(
                <FlatList 
                    data={expenseList}
                    renderItem={({item}) => 
                        <MyExpenseDateWiseCard expensedata={item}/>}
                    key={item=>item.name}
                    onRefresh={() => this.fetchExpenseLines()}
                    refreshing={this.props.myExpenseLinesLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Item Found'} />}
                />
            ) 
        }else if(this.props.myExpenseLinesLoader){
            visibleNode = <Loading />
        }else if (!expenseList.length && !this.props.myExpenseLinesLoader) {
            visibleNode = <NoDataFound text={'No Expense Item Found'} />
        }

        return(
            <View style={Style.container}>
            {visibleNode}  
                <View style={ Style.bottomView} >
                    <BlueButton
                            style={Style.button}
                            textStyle={Style.text}
                            title={'submit for approval'}
                            onPress={() => {}}
                        />
               </View>               
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    state:state,
    token:state.user.token,
    myExpenseLinesList:state.expenses.myExpenseLinesList,
    myExpenseLinesLoader:state.expenses.myExpenseLinesLoader,
    // selectedVisitDate: state.visits.planVisit.selectedVisitDate,
});

const mapDispatchToProps = (dispatch) => ({
    fetchExpenseLines: (params) => dispatch(ExpensesActions.getMyExpenseLines(params))
});

Style=StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        width: wp('100%'), 
        marginTop: 5
    },
    
    bottomView:{
        width: wp('100%'),
        height: hp('10%'), 
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0,
      },
    button: {
        width: wp('55%'),
        height: hp('5%'),     
    },
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: wp('4%'),
        textAlign: 'center'
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(MyExpenseDateWise)
