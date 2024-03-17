import Colors from 'App/Theme/Colors';
import { Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocalExpenseItemScreen from '../LocalExpenseItem';
import OutstationExpenseItemScreen from '../OutstationExpenseItem';
import Style from './ExpenseItemTabScreenStyle';


class ExpenseItemTabScreen extends Component {

    render() {
        let activeTab = this.props.navigation.getParam('data') ? 1 : 0;
        return (
            <Tabs locked tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs} initialPage={activeTab}>
                <Tab heading="Local Expenses"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <LocalExpenseItemScreen />
                </Tab>
                <Tab heading="Outstation Expenses"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <OutstationExpenseItemScreen />
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    // type: state.local.type
});

const mapDispatchToProps = (dispatch) => ({
    // changeType: (params) => dispatch(LocalActions.changeType(params))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpenseItemTabScreen)