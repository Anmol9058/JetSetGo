import BlueButton from 'App/Components/BlueButton';
import ExpensesActions from 'App/Stores/Expenses/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import { ApplicationStyles, Colors } from 'App/Theme';
import moment from 'moment';
import { Header, Icon, Text,Left,Body,Title } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import NavigationService from '../../../Services/NavigationService';
import ExpenseActions from '../../../Stores/Expenses/Actions';
import BackArrowButton from 'App/Components/BackArrowButton'

class ExpenseMenuTabLayout extends React.Component {

    componentDidMount() {
        const { updateMonthNumber } = this.props;
        let monthIndex = moment().format('M') - 1;
        this.onMonthChange(monthIndex);
        updateMonthNumber(this.getFullMonthName(monthIndex));
        console.log(monthIndex,"MONTH INDEX");
        console.log(HelperService.getMonthMappingName(monthIndex),"MONTH Name");
        this.fetchExpenseByMonth(HelperService.getMonthMappingName(monthIndex))
    }

    onMonthChange(month) {
        const {
            changeSearchFilters,
            updateMonthNumber,
            expenseList,
            user_details,
            searchFilters,
            fetchexpenses
        } = this.props;
        changeSearchFilters({
            edited_field: 'selectedMonth',
            edited_value: month
        });
        updateMonthNumber(HelperService.getMonthMappingName(month));
    }
    getFullMonthName(index){
        let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[index];
    }

    fetchExpenseByMonth = (monthName) => {
        const { fetchMonthExpense, token,} = this.props;
        fetchMonthExpense({
            token:token,
            month: monthName,
        });
    }


    render() {
        const {
            searchFilters,
            monthNumber,
            myExpenseLoader
        } = this.props;

        let monthPickerNode = (
            <View
                style={Styles.monthPicker}>
                <Text style={Styles.dateText}>{HelperService.getMonthMappingName(searchFilters['selectedMonth'])}
                </Text>
            </View>
        );

        let visiblePickerNode = [];

        visiblePickerNode = (<View style={{ flexDirection: 'row',justifyContent:'flex-start' }}>
            <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getPreviousMonth(searchFilters['selectedMonth']))}>
                <Icon
                    name={'ios-arrow-back'}
                    ios={'ios-arrow-back'}
                    android={'md-arrow-dropleft'}
                    style={Styles.dateChangeIcon}
                />
            </TouchableOpacity>
            {monthPickerNode}
            <TouchableOpacity transparent onPress={() =>this.onMonthChange(HelperService.getNextMonth(searchFilters['selectedMonth']))}>
                <Icon
                    name={'ios-arrow-forward'}
                    ios={'ios-arrow-forward'}
                    android={'md-arrow-dropright'}

                    style={Styles.dateChangeIcon}
                />
            </TouchableOpacity>
        </View>);

        return (
            <View>
                <Header style={Styles.header}>
                    <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:'2%',alignItems: 'center'}}>
                        <BackArrowButton />
                        {visiblePickerNode}
                        <BlueButton
                            style={Styles.button}
                            textStyle={Styles.text}
                            rounded
                            large
                            title={'Get Expense'}
                            disabled={myExpenseLoader}
                            loading={myExpenseLoader}
                            onPress={() => this.fetchExpenseByMonth(monthNumber)}
                        />
                    </View>
                </Header>
                
                
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    searchFilters: state.expenses.searchFilters,
    monthNumber: state.expenses.monthNumber,
    myExpenseLoader: state.expenses.myExpenseLoader
});

const mapDispatchToProps = (dispatch) => ({
    changeSearchFilters: (params) => dispatch(ExpensesActions.updateSearchFilters(params)),
    updateMonthNumber: (params) => dispatch(ExpensesActions.updateMonthNumber(params)),
    fetchMonthExpense: (params) => dispatch(ExpensesActions.getMyExpenses(params))
});

const Styles = StyleSheet.create({
    datePicker: {
        alignSelf: 'center',
        backgroundColor: Colors.button,
        borderRadius: 100,
        flexDirection: 'row',
        width: wp('43%'),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },

    monthPicker: {
        alignSelf: 'center',
        backgroundColor: Colors.button,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: wp('25%')
    },

    dateText: {
        fontFamily: ApplicationStyles.textMediumFont,
        color: Colors.white,
        fontSize: wp('4%'),
        textTransform: 'capitalize'
    },

    dateIcon: {
        color: Colors.white,
        fontSize: wp('7%'),
        marginLeft: 0,
        marginRight: 0,
        zIndex: 2,
        paddingLeft: wp('3%')
    },

    dateChangeIcon: {
        color: Colors.button,
        alignSelf: 'center',
        paddingHorizontal: wp('3%'),
        fontSize: wp('11%')
    },

    actionButton: {
        borderWidth: 1.5,
        width: wp('20%'),
        height: 35,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: Colors.clrF1F9FF,
        marginHorizontal: wp('1.2%')
    },

    arrowContainer: {
        width: wp('10%'),
        justifyContent: 'center'
    },
    backArrow: {
        color: Colors.button,
        //paddingLeft: 5
    },
    actionButtonText: {
        fontSize: wp('3%'),
        fontFamily: ApplicationStyles.textMediumFont
    },
    selectedActionButton: {
        borderWidth: 1.5,
        width: wp('20%'),
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: Colors.clrF1F9FF,
        marginHorizontal: wp('1.2%'),
        height: 35
    },
    button: {
        ...ApplicationStyles.formButton,
        marginTop: hp('2%'),
        maxHeight: hp('6%'),
        width: wp('42%'),
        alignSelf: 'flex-start',
        padding:'1%'
    },
    header: {
        backgroundColor: Colors.white,
        borderBottomWidth: 0
      },
      title:{
        'color':'#2f4f4f',
        'fontSize':wp('6%'),
        'fontWeight':'bold',
        'flex':2,'textAlignVertical': "center",'textAlign': "center",
        'width':wp('40%')
      },
      text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: wp('4%'),
        textTransform: 'uppercase',
        textAlign: 'center'
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpenseMenuTabLayout)

