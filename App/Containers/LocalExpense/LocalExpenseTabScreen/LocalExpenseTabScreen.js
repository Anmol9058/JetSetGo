import LocalActions from 'App/Stores/LocalExpense/Actions';
import Colors from 'App/Theme/Colors';
import { Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocalMyExpenseScreen from '../LocalMyExpenseScreen/LocalMyExpenseScreen';
import LocalTeamExpenseScreen from '../LocalTeamExpenseScreen';
import Style from './LocalExpenseTabScreenStyle';


class LocalExpenseTabScreen extends Component {

    render() {
        const { changeType, type } = this.props;
        return (
            <Tabs locked tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs}
                onChangeTab={({ i }) => changeType(i)}>
                <Tab heading="My Expenses"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <LocalMyExpenseScreen />
                </Tab>
                <Tab heading="Team Expenses"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <LocalTeamExpenseScreen />
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    type: state.local.type
});

const mapDispatchToProps = (dispatch) => ({
    changeType: (params) => dispatch(LocalActions.changeType(params))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseTabScreen)