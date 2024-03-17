import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import ExpensesActions from 'App/Stores/Expenses/Actions'
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import MyExpenseCard from './MyExpenseCard';
import { StyleSheet} from 'react-native'
import GenericIcon from 'App/Components/GenericIcon'
import lodash from "lodash"
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'

class MyExpenseScreen extends Component {
  

    componentDidMount() {
        this.fetchExpense();
    }
    fetchCall() {
        const{
            fetchexpenses,
            expenseList,
            searchFilters,
            user_details,
            token
        //   complaintdata,
        //   selectedRetailer,
        }=this.props
        fetchexpenses({
        //    user_id: user_details.sfid ,
        //   month:searchFilters['selectedMonth'],
        //   // expense_approver__c:expenseList.expense_approver__c
        });
          
      }
      getCardNode(item){
        const{
        token,
        
        }=this.props;
        return(
        <MyExpenseCard
        data={item}
     
        />
        
        );
         }
           

    fetchExpense() {
        const { token, fetchMonthExpense, monthNumber ,userId} = this.props;
        fetchMonthExpense({
            token:token,
            month:monthNumber,
            userId: userId,
           
            
        });
    }

    render(){
        let {expenseList,myExpenseLoader}=this.props
        let visibleNode = [];
        if(expenseList.length&&expenseList){
            visibleNode=(
                <FlatList 
                    data={expenseList}
                    renderItem={({item}) => 
                        <MyExpenseCard expensedata={item}/>}
                    key={item=>item.name}
                    onRefresh={() => this.fetchExpense()}
                    refreshing={this.props.myExpenseLoader}
                    ListEmptyComponent={() => <NoDataFound text={'No Expense Item Found'} />}
                />
            ) 
        }else if(myExpenseLoader){
            visibleNode = <Loading />
        }else if (!expenseList.length && !myExpenseLoader) {
            visibleNode = <NoDataFound text={'No Expense Item Found'} />
        }

        

        return (
            <View style={Style.container}>
                  {visibleNode}    
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    selectedMonth:state.expenses.monthNumber,
    expenseList:state.expenses.myExpenseList,
    myExpenseLoader:state.expenses.myExpenseLoader,
    userId: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMonthExpense: (params) => dispatch(ExpensesActions.getMyExpenses(params))
});

Style=StyleSheet.create({
    container: {
        ...Helpers.center,
        backgroundColor: Colors.white,
        flex: 1,
        width: '100%',
        marginTop: 5
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(MyExpenseScreen)

