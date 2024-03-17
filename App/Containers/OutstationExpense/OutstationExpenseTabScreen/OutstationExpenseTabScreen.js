import Colors from 'App/Theme/Colors';
import { Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutstationActions from '../../../Stores/OutstationExpense/Actions';
import OutstationMyExpenseScreen from '../OutstationMyExpenseScreen/OutstationMyExpenseScreen';
import OutstationTeamExpenseScreen from '../OutstationTeamExpenseScreen';
import Style from './OutstationExpenseTabScreenStyle';


class OutstationExpenseTabScreen extends Component {
    render() {
        const { changeType } = this.props;
        return (
            <Tabs locked tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs}
                onChangeTab={({ i }) => changeType(i)}>
                <Tab heading="My Outstation"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <OutstationMyExpenseScreen />
                </Tab>
                <Tab heading="Team Outstation"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <OutstationTeamExpenseScreen />
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    type: state.outstations.type
});

const mapDispatchToProps = (dispatch) => ({
    changeType: (params) => dispatch(OutstationActions.changeType(params))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationExpenseTabScreen)