import TourAction from 'App/Stores/Tour/Actions';
import Colors from 'App/Theme/Colors';
import { Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyTourListScreen from '../MyTourListScreen/MyTourListScreen';
import OtherTourListScreen from '../OtherTourListScreen/OtherTourListScreen';
import Style from './TourTabScreenStyle';


class TourTabScreen extends Component {
    render() {
        const { changeType } = this.props;
        return (
            <Tabs locked tabBarUnderlineStyle={Style.tabUnderLine} style={Style.mainTabs}
                onChangeTab={({ i }) => changeType(i)}>
                <Tab heading="My Tours"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <MyTourListScreen />
                </Tab>
                <Tab heading="Team Tours"
                    tabStyle={Style.tabHeading}
                    textStyle={Style.tabText}
                    activeTabStyle={{ backgroundColor: Colors.button }}
                    activeTextStyle={Style.tabTextStyle}>
                    <OtherTourListScreen />
                </Tab>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    type: state.tours.type
});

const mapDispatchToProps = (dispatch) => ({
    changeType: (params) => dispatch(TourAction.changeType(params))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourTabScreen)