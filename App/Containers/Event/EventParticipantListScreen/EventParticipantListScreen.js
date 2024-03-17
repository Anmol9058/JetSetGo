import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { HelperService } from '../../../Services/Utils/HelperService';
import EventActions from '../../../Stores/Events/Actions';
import EventParticipantTuple from '../EventParticipantTuple';
import Style from './EventParticipantListScreenStyle';
import NavigationService from 'App/Services/NavigationService';

class EventParticipantListScreen extends Component {
    componentDidMount() {
        const {
            participantList,
        } = this.props;
        //this.props.clearParticipantList();
        if (participantList && participantList.length) {
        } else {
            this.fetchParticipantsCall();
        }
    }

    fetchParticipantsCall() {
        const {
            token,
            agentid,
            eventsLimit,
            eventsOffset,
            selectedEvent,
            fetchParticipants
        } = this.props;

        fetchParticipants({
            token,
            agentid,
            offset: eventsOffset,
            limit: eventsLimit,
            id: selectedEvent.pg_id__c
        });
    }


    filterResults(list) {
        let participantSearchFilters = this.props.participantSearchFilters;
        let filteredList = HelperService.multiFieldSearchText(list, participantSearchFilters['searchValue']);
        return filteredList;
    }

    render() {
        const {
            selectedEvent,
            participantList,
            fetchParticipantLoader,
        } = this.props;

        let visibleNode = [];
        if (participantList && participantList.length) {
            let filteredParticipantList = this.filterResults(participantList.map((obj) => obj));
            if (filteredParticipantList.length) {
                visibleNode = (
                    <FlatList
                        data={filteredParticipantList}
                        renderItem={({ item }) => <EventParticipantTuple data={item} />}
                        keyExtractor={item => item.pg_id__c}
                        onRefresh={() => this.fetchParticipantsCall()}
                        refreshing={fetchParticipantLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Participants Found'} />}
                    />
                );
            } else {
                visibleNode = <NoDataFound text={'No Participants Found'} />;
            }
        } else if (fetchParticipantLoader) {
            visibleNode = <Loading />
        } else if (participantList && !participantList.length && !fetchParticipantLoader) {
            visibleNode = <NoDataFound text={'No Participants Found'} />
        }


        return (
            <View style={Style.container}>
                <View>
                    {visibleNode}
                </View>
                {selectedEvent.status__c == 'Approved' && <TouchableOpacity
                    style={Style.plusIcon}
                    onPress={() => NavigationService.navigate('AddParticipantScreen')}>
                    <Icon
                        name={'ios-add'}
                        ios={'ios-add'}
                        android={'md-add'}
                        style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
                    />
                </TouchableOpacity>}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    participantList: state.events.participantList,
    fetchParticipantLoader: state.events.fetchParticipantLoader,
    participantSearchFilters: state.influencers.influencerSearchFilters,
    eventsLimit: state.events.eventLimit,
    eventsOffset: state.events.eventOffset,
    selectedEvent: state.events.selectedEvent
});

const mapDispatchToProps = (dispatch) => ({
    fetchParticipants: (params) => dispatch(EventActions.fetchParticipants(params)),
    clearParticipantList: () => dispatch(EventActions.clearParticipantList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventParticipantListScreen)

