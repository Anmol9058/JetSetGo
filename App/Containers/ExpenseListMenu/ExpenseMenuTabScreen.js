import Colors from 'App/Theme/Colors';
import { Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Style from './ExpenseMenuTabScreenStyle';
import { Text, View,TouchableWithoutFeedback } from 'react-native';
import MyExpenseScreen from './MyExpenseScreen/MyExpenseScreen';
import TeamExpenseScreen from './TeamExpenseScreen/TeamExpenseScreen';
class ExpenseMenuTabScreen extends Component {

    render() {
        let activeTab = this.props.navigation.getParam('data') ? 1 : 0;
        return (
            <Tabs locked tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs} initialPage={activeTab}>
               <Tab heading="My Expenses"
                   tabStyle={Style.tabHeading}
                   textStyle={Style.tabText}
                   activeTabStyle={{ backgroundColor: Colors.button }}
                   activeTextStyle={Style.tabTextStyle}>
                   <MyExpenseScreen />
                   
               </Tab>
               <Tab heading="Team Expenses"
                   tabStyle={Style.tabHeading}
                   textStyle={Style.tabText}
                   activeTabStyle={{ backgroundColor: Colors.button }}
                   activeTextStyle={Style.tabTextStyle}>
                   <TeamExpenseScreen />
               </Tab>
           </Tabs> 
       );
    }
}

export default ExpenseMenuTabScreen