import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import BlueButton from '../../../../Components/BlueButton';
import WhiteButton from '../../../../Components/WhiteButton';
import OutstationActions from '../../../../Stores/OutstationExpense/Actions';
import TourApprovalTuple from '../TourApprovalTuple';
import Style from './TourApprovalScreenStyle';
import { HelperService } from '../../../../Services/Utils/HelperService';
import NavigationService from '../../../../Services/NavigationService';

let tourArr = [];
class TourApprovalScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        tourArr = [];
    }

    componentDidMount() {
        tourArr = [];
        this.fetchTourList();
    }

    fetchTourList = () => {
        const { token, agentid, fetchApprovedTour, monthNumber, approvedTourList, updateApprovedTourList } = this.props;

        fetchApprovedTour({
            token,
            agentid
        });

        let customTourList = approvedTourList.map((item, id) => {
            item.checked = false;
            item.id = id;
            return item;
        });

        updateApprovedTourList(customTourList);
    }

    handleChecked = (data, index) => {
        const { approvedTourList, updateApprovedTourList } = this.props;
        let pos = tourArr.indexOf(data.tour_sfid);
        let customTourList = approvedTourList.map((item, id) => {
            if (index === id) {
                if (data.checked) {
                    data.checked = false;
                    if (pos > -1) {
                        tourArr.splice(pos, 1);
                    }
                } else {
                    data.checked = true;
                    tourArr.push(data.tour_sfid);
                }
            }
            return item;
        });

        updateApprovedTourList(customTourList);
    }

    onSelectAll = () => {
        const { approvedTourList, updateApprovedTourList } = this.props;
        let customTourList = approvedTourList.map((item, index) => {
            item.checked = true;
            tourArr.push(item.tour_sfid);
            return item;
        });

        updateApprovedTourList(customTourList);
    }

    onUnselectAll = () => {
        const { approvedTourList, updateApprovedTourList } = this.props;
        let customTourList = approvedTourList.map((item, index) => {
            item.checked = false;
            tourArr.pop(item.tour_sfid);
            return item;
        });

        updateApprovedTourList(customTourList);
    }


    onContinue = () => {
        const { fetchVisitByTour, token, agentid, addExpense, monthNumber, updateTourArr } = this.props;
        if (!tourArr.length) {
            HelperService.showToast({ message: "No Tour Selected" });
        }
        else {
            addExpense({
                token,
                agentid,
                payload: {
                    name: "",
                    expense_type__c: "Outstation Expense",
                    month__c: monthNumber,
                    total_amount__c: "0",
                    tour__c: tourArr.join()
                }
            });
        }
    }

    render() {
        const {
            approvedTourList,
            fetchApprovedTourLoader,
            addExpenseLoader
        } = this.props;
        console.log

        let visibleNode = [];

        if (approvedTourList && approvedTourList.length) {

            visibleNode = (
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingBottom: 8 }}>
                        <WhiteButton
                            onPress={this.onSelectAll}
                            title={'Select All'}
                            style={{ height: 40, width: '40%' }}
                        />
                        <WhiteButton
                            onPress={this.onUnselectAll}
                            title={'Clear'}
                            style={{ height: 40, width: '40%' }} />
                    </View>
                    <View style={{ marginBottom: 50 }}>
                        <FlatList
                            data={approvedTourList}
                            renderItem={({ item, index }) =>
                                <TourApprovalTuple
                                    data={item}
                                    handleChecked={() => this.handleChecked(item, index)}
                                />}
                            keyExtractor={(item, id) => id + ''}
                            onRefresh={() => this.fetchTourList()}
                            refreshing={fetchApprovedTourLoader}
                            ListEmptyComponent={() => <NoDataFound text={'No Tour Found'} />}
                        />
                    </View>

                </>
            );
        } else if (approvedTourList && !approvedTourList.length && !fetchApprovedTourLoader) {
            visibleNode = <NoDataFound text={'No Tour Found'} />
        } else {
            visibleNode = <Loading />
        }

        return (
            <View style={Style.container}>
                {visibleNode}
                <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
                    <BlueButton
                        onPress={() => this.onContinue()}
                        title={'Submit'}
                        disabled={addExpenseLoader}
                        loading={addExpenseLoader}
                        style={{ width: '80%', height: 40, alignSelf: 'center' }} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    monthNumber: state.outstations.monthNumber,
    fetchApprovedTourLoader: state.outstations.fetchApprovedTourLoader,
    approvedTourList: state.outstations.approvedTourList,
    visitTourList: state.outstations.visitList,
    addExpenseLoader: state.outstations.addExpenseLoader
});

const mapDispatchToProps = (dispatch) => ({
    fetchApprovedTour: (params) => dispatch(OutstationActions.fetchApprovedTour(params)),
    updateApprovedTourList: (params) => dispatch(OutstationActions.updateApprovedTourList(params)),
    fetchVisitByTour: (params) => dispatch(OutstationActions.fetchVisitByTour(params)),
    addExpense: (params) => dispatch(OutstationActions.addExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourApprovalScreen)

