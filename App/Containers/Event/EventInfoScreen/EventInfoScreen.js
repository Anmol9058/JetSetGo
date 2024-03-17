import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import EventInfoTuple from '../EventInfoTuple/EventInfoTuple';
import EventActions from '../../../Stores/Events/Actions';
import Style from './EventInfoStyle';
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService';

class EventInfoScreen extends Component {
    componentDidMount() {
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
    render() {
        const {
            selectedEvent,
            agentAreas
        } = this.props;

        if (!selectedEvent) {
            return (
                <View style={Style.parentContainer}>
                    <Loading />
                </View>
            );
        }

        return (
            <View style={Style.parentContainer}>
                <EventInfoTuple data={selectedEvent} areas={agentAreas} />
                <View style={{ height: 15 }}></View>
                <ScrollView>
                    <InfoDisplay label={'Status'} value={selectedEvent.status__c || ''} />
                    <InfoDisplay label={'Budget'} value={selectedEvent.budget__c || 'None'} />
                    <InfoDisplay label={'Meeting Type'} value={selectedEvent.type__c || 'None'} />
                    <InfoDisplay label={'Expected Participation'} value={selectedEvent.expected_participation__c || ''} />
                    <InfoDisplay label={'Target Audience'} value={selectedEvent.target_audience__c || ''} />
                    <InfoDisplay label={'Venue Details'} value={selectedEvent.venue_details__c || ''} />
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    eventOffset: state.events.eventOffset,
    eventLimit: state.events.eventLimit,
    agentAreas: state.user.agentAreas,
    eventList: state.events.eventList,
    fetchEventsLoader: state.events.fetchEventsLoader,
    eventSearchFilters: state.events.eventSearchFilters,
    isConnected: state.network.isConnected,
    selectedEvent: state.events.selectedEvent,
    participantList: state.events.participantList
});

const mapDispatchToProps = (dispatch) => ({
    fetchParticipants: (params) => dispatch(EventActions.fetchParticipants(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventInfoScreen)

