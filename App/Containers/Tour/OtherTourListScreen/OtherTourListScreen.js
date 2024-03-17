import NoDataFound from 'App/Components/NoDataFound';
import TourAction from 'App/Stores/Tour/Actions';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import RemarksModal from 'App/Components/RemarksModal/RemarksModal';
import OtherTourTuple from '../OtherTourTuple';
import Style from './OtherTourScreenStyle';
import Loading from 'App/Components/Loading';
import { HelperService } from 'App/Services/Utils/HelperService';
import NavigationService from 'App/Services/NavigationService';

class OtherTourListScreen extends Component {

    state = {
        isModalVisible: false,
        itemData: {},
        status: ''
    };

    componentDidMount() {

    }

    fetchTour() {
        const { token, agentid, fetchTeamTour, monthNumber, teamTourList } = this.props;
        fetchTeamTour({
            token,
            agentid,
            month: monthNumber,
            expense_type: 'other'
        });
    }

    onTourItemClick(item){
        this.props.selectTeamTour(item);
        NavigationService.navigate('TourInfoScreen', { 'local': false });
    }

    async onApproveClick(item){
        await this.props.clearTourForm();
        this.setState({ itemData: item, status: 'Approved' });
        this.toggleModal();
    }

    async onRejectClick(item){
        await this.props.clearTourForm();
        this.setState({ itemData: item, status: 'Rejected' });
        this.toggleModal();
    }

    toggleModal(){
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onSubmitClick(){
        if (this.props.tourForm.remark__c) {
            let reqBody = {
                tour_status__c: this.state.status,
                remark__c: this.props.tourForm.remark__c
            }
            this.props.approveRejectTour({
                token: this.props.token,
                agentid: this.props.agentid,
                payload: reqBody,
                sfid: this.state.itemData.sfid
            });
            this.fetchTour();
            this.toggleModal();
        } else {
            HelperService.showToast({ message: 'Remark field is empty' });
        }
    }

    onCancelClick(){
        this.toggleModal();
    }


    render() {
        const { teamTourList, fetchTeamTourLoader, validation } = this.props;

        let visibleNode = [];

        if (teamTourList && teamTourList.length) {
            visibleNode = (
                <>
                    <FlatList
                        data={teamTourList}
                        renderItem={({ item }) =>
                            <OtherTourTuple
                                data={item}
                                list={teamTourList}
                                onPress={() => {
                                    this.onTourItemClick(item);
                                }}
                                handleApprove={() => { this.onApproveClick(item) }}
                                handleReject={() => { this.onRejectClick(item) }}
                                keyExtractor={(item, id) => id + ''}
                                onRefresh={this.fetchTour}
                                refreshing={fetchTeamTourLoader}
                                ListEmptyComponent={() => <NoDataFound text={'No Tour Found'} />}
                            />
                        } />
                    <RemarksModal
                        isVisible={this.state.isModalVisible}
                        toggleModal={this.toggleModal}
                        handleSubmit={this.onSubmitClick}
                        handleCancel={this.onCancelClick}
                        expenseForm={this.props.tourForm}
                        changeExpenseForm={this.props.changeTourForm}
                        validation={validation}
                        loader={this.props.updateTourLoader}
                        item={this.state.itemData} />
                </>
            );
        } else if (teamTourList && !teamTourList.length && !fetchTeamTourLoader) {
            visibleNode = <NoDataFound text={'No Tour Found'} />
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
    teamTourList: state.tours.teamTourList,
    fetchTeamTourLoader: state.tours.fetchTeamTourLoader,
    monthNumber: state.tours.monthNumber,
    type: state.tours.type,
    tourForm: state.tours.tourForm,
    validation: state.tours.tourFormValidation,
    updateTourLoader: state.tours.updateTourLoader
});

const mapDispatchToProps = (dispatch) => ({
    fetchTeamTour: (params) => dispatch(TourAction.fetchTeamTour(params)),
    selectTeamTour: (params) => dispatch(TourAction.selectTeamTour(params)),
    clearSelectTeamTour: () => dispatch(TourAction.clearSelectTeamTour()),
    changeTourForm: (params) => dispatch(TourAction.changeTourForm(params)),
    approveRejectTour: (params) => dispatch(TourAction.approveRejectTour(params)),
    clearTourForm: () => dispatch(TourAction.clearTourForm())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherTourListScreen)

