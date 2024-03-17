import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import TourAction from 'App/Stores/Tour/Actions';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import BlueButton from 'App/Components/BlueButton';
import GenericIcon from 'App/Components/GenericIcon';
import MyTourTuple from '../MyTourTuple';
import Style from './MyTourListScreenStyle';
import Loading from 'App/Components/Loading'
import { HelperService } from 'App/Services/Utils/HelperService';

class MyTourListScreen extends Component {
    componentDidMount() {
        this.fetchTour();
    }

    fetchTour() {
        const { token, agentid, fetchMyTour, monthNumber, type } = this.props;
        fetchMyTour({
            token,
            agentid,
            month: monthNumber,
            expense_type: 'self'
        })
    }

    onTourItemClick(item){
        this.props.selectMyTour(item);
        NavigationService.navigate('TourInfoScreen', { 'local': true });
        // if (item.tour_status__c === 'Draft') {
        //     this.props.selectMyTour(item);
        //     NavigationService.navigate('UpdateTourScreen', { 'Local': true });
        // } else {
        //     HelperService.showToast({ message: 'You cannot update Now!' });
        // }
    }

    onSubmit(item){
        const { myTourList, sendForApproval, token, agentid, selectMyTour } = this.props;
        sendForApproval({
            token,
            agentid,
            tour_ids: [item.pg_id__c]
        })
    }



    render() {
        const { myTourList, fetchMyTourLoader, type } = this.props;
        let visibleNode = [];

        if (myTourList && myTourList.length) {
            visibleNode = (
                <View>
                    <FlatList
                        data={myTourList}
                        renderItem={({ item }) =>
                            <MyTourTuple
                                data={item}
                                list={myTourList}
                                onSubmit={() => {
                                    this.onSubmit(item)
                                }}
                                onPress={() => {
                                    this.onTourItemClick(item);
                                }} />}
                                keyExtractor={(item, id) => id + ''}
                                onRefresh={() => this.fetchTour()}
                                refreshing={fetchMyTourLoader}
                                ListEmptyComponent={() => <NoDataFound text={'No Tour Found'} />}
                    />
                </View>
            );
            
        } else if (fetchMyTourLoader) {
            visibleNode = <Loading />
        } else if (myTourList && !myTourList.length && !fetchMyTourLoader) {
            visibleNode = <NoDataFound text={'No Tour Found'} />
        }

        return (
            <View style={Style.container}>
                {visibleNode}

                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => NavigationService.navigate('NewTourScreen')}>
                    <GenericIcon
                        name={'add'}
                        style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    myTourList: state.tours.myTourList,
    fetchMyTourLoader: state.tours.fetchMyTourLoader,
    monthNumber: state.tours.monthNumber,
    type: state.tours.type
});

const mapDispatchToProps = (dispatch) => ({
    fetchMyTour: (params) => dispatch(TourAction.fetchMyTour(params)),
    selectMyTour: (params) => dispatch(TourAction.selectMyTour(params)),
    clearSelectMyTour: () => dispatch(TourAction.clearSelectMyTour()),
    sendForApproval: (params) => dispatch(TourAction.sendApprovalTour(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTourListScreen)

