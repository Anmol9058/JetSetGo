import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import BlueButton from '../../../../Components/BlueButton';
import WhiteButton from '../../../../Components/WhiteButton';
import NavigationService from '../../../../Services/NavigationService';
import { HelperService } from '../../../../Services/Utils/HelperService';
import OutstationActions from '../../../../Stores/OutstationExpense/Actions';
import VisitTuple from '../VisitTuple';
import Style from './SelectVisitScreenStyle';

let visitArr = [];
class SelectVisitScreen extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        visitArr = [];
        const { token, agentid, fetchVisitByTour, selectMyOutstationExpense } = this.props;
        await fetchVisitByTour({
            token,
            agentid,
            tour_ids: selectMyOutstationExpense.tour__c.split(',')
        });
        this.fetchVisitList();
    }

    fetchVisitList = () => {
        const { visitTourList, updateVisitTourList } = this.props;

        let customVisitList = visitTourList.map((item, id) => {
            item.checked = false;
            item.id = id;
            return item;
        });

        updateVisitTourList(customVisitList);
    }

    handleChecked = (data, index) => {
        const { visitTourList, updateVisitTourList } = this.props;
        let pos = visitArr.indexOf(data.sfid);
        let customTourList = visitTourList.map((item, id) => {
            if (index === id) {
                if (data.checked) {
                    data.checked = false;
                    if (pos > -1) {
                        visitArr.splice(pos, 1);
                    }
                } else {
                    data.checked = true;
                    visitArr.push(data.sfid);
                }
            }
            return item;
        });

        updateVisitTourList(customTourList);
    }

    onSelectAll = () => {
        const { visitTourList, updateVisitTourList } = this.props;
        let customTourList = visitTourList.map((item, index) => {
            item.checked = true;
            visitArr.push(item.sfid);
            return item;
        });

        updateVisitTourList(customTourList);
    }

    onUnselectAll = () => {
        const { visitTourList, updateVisitTourList } = this.props;
        let customTourList = visitTourList.map((item, index) => {
            item.checked = false;
            visitArr.pop(item.sfid);
            return item;
        });

        updateVisitTourList(customTourList);
    }


    onContinue = () => {
        const { fetchVisitExpenseItem, token, agentid, selectMyOutstationExpense } = this.props;
        if (!visitArr.length) {
            HelperService.showToast({ message: "No Visit Selected" });
        }
        else {
            fetchVisitExpenseItem({
                token,
                agentid,
                visit_ids: visitArr,
                sfid: selectMyOutstationExpense.sfid
            })
            NavigationService.navigateAndReplace('TravelListScreen');
        }
    }

    render() {
        const {
            visitTourList,
            fetchVisitTourLoader
        } = this.props;

        let visibleNode = [];

        if (visitTourList && visitTourList.length) {

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
                    <View>
                        <FlatList
                            data={visitTourList}
                            renderItem={({ item, index }) =>
                                <VisitTuple
                                    data={item}
                                    handleChecked={() => this.handleChecked(item, index)}
                                />}
                            keyExtractor={(item, id) => id + ''}
                            ListEmptyComponent={() => <NoDataFound text={'No Visit Found'} />}
                        />
                    </View>
                    <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
                        <BlueButton
                            onPress={this.onContinue}
                            title={'Continue'}
                            style={{ width: '80%', height: 40, alignSelf: 'center' }} />
                    </View>
                </>
            );
        } else if (visitTourList && !visitTourList.length && !fetchVisitTourLoader) {
            visibleNode = <NoDataFound text={'No Visit Found'} />
        } else {
            visibleNode = <Loading />
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
    agentid: state.user.id,
    visitTourList: state.outstations.visitList,
    fetchVisitTourLoader: state.outstations.fetchVisitTourLoader,
    visitExpenseItem: state.outstations.visitExpenseItem,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense
});

const mapDispatchToProps = (dispatch) => ({
    updateVisitTourList: (params) => dispatch(OutstationActions.updateVisitTourList(params)),
    fetchVisitByTour: (params) => dispatch(OutstationActions.fetchVisitByTour(params)),
    fetchVisitExpenseItem: (params) => dispatch(OutstationActions.fetchVisitExpenseItem(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectVisitScreen)

