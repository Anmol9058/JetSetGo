import BlueButton from 'App/Components/BlueButton';
import GenericIcon from 'App/Components/GenericIcon';
import { HelperService } from 'App/Services/Utils/HelperService';
import moment from 'moment';
import { Header, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import NavigationService from '../../../Services/NavigationService';
import LocalActions from '../../../Stores/LocalExpense/Actions'
import { Colors, ApplicationStyles } from 'App/Theme'

class LocalExpenseTabLayout extends React.Component {

    componentDidMount() {
        const { updateMonthNumber, type } = this.props;
        let monthIndex = moment().format('M') - 1;
        this.onMonthChange(monthIndex);
        console.log(HelperService.getMonthMappingName(monthIndex))
        updateMonthNumber(HelperService.getMonthMappingName(monthIndex));
        this.fetchExpenseByMonth(HelperService.getMonthMappingName(monthIndex))
    }

    onMonthChange(month) {

        const {
            changeSearchFilters,
            updateMonthNumber
        } = this.props;

        changeSearchFilters({
            edited_field: 'selectedMonth',
            edited_value: month
        });

        updateMonthNumber(HelperService.getMonthMappingName(month));

    }

    fetchExpenseByMonth(monthNumber){
        const { fetchLocalExpenseData, fetchTeamExpenses, token, agentid, type } = this.props;
        fetchLocalExpenseData({
            token,
            agentid,
            type: 'local',
            month: monthNumber,
            expense_type: 'self'
        });

        fetchTeamExpenses({
            token,
            agentid,
            type: 'local',
            month: monthNumber,
            expense_type: 'other'
        })
    }


    render() {
        const {
            searchFilters,
            monthNumber,
            type,
            fetchLocalExpenseLoader
        } = this.props;

        let monthPickerNode = (
            <View
                style={Styles.monthPicker}>
                <Text style={Styles.dateText}>{HelperService.getMonthMappingName(searchFilters['selectedMonth'])}
                </Text>
            </View>
        );

        let visiblePickerNode = [];

        visiblePickerNode = (<View style={{ flexDirection: 'row', width: wp('43%') }}>
            <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getPreviousMonth(searchFilters['selectedMonth']))}>
                <Icon
                    name={'ios-arrow-back'}
                    ios={'ios-arrow-back'}
                    android={'md-arrow-dropleft'}
                    style={Styles.dateChangeIcon}
                />
            </TouchableOpacity>
            {monthPickerNode}
            <TouchableOpacity transparent onPress={() => this.onMonthChange(HelperService.getNextMonth(searchFilters['selectedMonth']))}>
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
                <Header style={{ ...Styles.header, ...{ height: hp('9%') } }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: hp('1%') }}>
                        <View style={Styles.arrowContainer}>
                            <GenericIcon
                                name={'arrow-back'}
                                onPress={NavigationService.goback}
                                style={Styles.backArrow}
                            />
                        </View>
                        {visiblePickerNode}
                        <BlueButton
                            style={Styles.button}
                            rounded
                            large
                            title={'GET EXPENSES'}
                            disabled={fetchLocalExpenseLoader}
                            loading={fetchLocalExpenseLoader}
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
    agentid: state.user.id,
    searchFilters: state.local.searchFilters,
    fetchLocalExpenseLoader: state.local.fetchLocalExpenseLoader,
    monthNumber: state.local.monthNumber,
    type: state.local.type
});

const mapDispatchToProps = (dispatch) => ({
    changeSearchFilters: (params) => dispatch(LocalActions.updateSearchFilters(params)),
    fetchLocalExpenseData: (params) => dispatch(LocalActions.fetchLocalExpenseData(params)),
    fetchTeamExpenses: (params) => dispatch(LocalActions.fetchTeamExpenses(params)),
    updateMonthNumber: (params) => dispatch(LocalActions.updateMonthNumber(params)),
    changeType: (params) => dispatch(LocalActions.changeType(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseTabLayout)


const Styles = StyleSheet.create({

    header: {
        backgroundColor: Colors.white,
        borderBottomWidth: 0,
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingTop: hp('2%'),
        elevation: 2
    },

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
        paddingLeft: 5
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
        width: '48%',
        alignSelf: 'flex-start'
    },
});

