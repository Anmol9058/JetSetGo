import Loading from 'App/Components/Loading';
import NoDataFound from 'App/Components/NoDataFound';
import NavigationService from 'App/Services/NavigationService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { HelperService } from '../../../Services/Utils/HelperService';
import InfluencersActions from '../../../Stores/Influencers/Actions';
import EventActions from '../../../Stores/Events/Actions';
import Style from './AddParticipantScreenStyle';
import ParticipantTuple from '../ParticipantTuple/ParticipantTuple';


let participantObjArr = [];
class AddParticipantScreen extends Component {
    componentDidMount() {
        const {
            influencersList,
        } = this.props;
        //this.props.clearSelectInfluencer();
        this.resetParticipantList();
        if (influencersList && influencersList.length) {
        } else {
            this.fetchInfluencersCall();
        }
    };

    resetParticipantList() {
        const { influencersList, participantList } = this.props;
        participantObjArr = [];
        let transformedInfluencerList = influencersList.map((item) => {
            item.participant_contact_name = item.firstname + " " + item.lastname;
            return item;
        })
        let filterParticipantList = HelperService.getRemovedObjArrList(transformedInfluencerList, participantList, 'participant_contact_name');
        let filteredInfluencerList = filterParticipantList.map((obj, id) => {
            let modifiedInfluencerObj = obj;
            modifiedInfluencerObj.checked = false
            modifiedInfluencerObj.id = id;
            return modifiedInfluencerObj
        });
        this.props.updateCustomParticipantList(filteredInfluencerList);
    }

    fetchInfluencersCall() {
        const {
            token,
            agentid,
            influencersOffset,
            influencersLimit,
            fetchInfluencers,
        } = this.props;

        fetchInfluencers({
            token,
            agentid,
            offset: influencersOffset,
            limit: influencersLimit
        });
    }


    filterResults(list) {
        let { eventParticipantSearchFilters } = this.props;
        let filteredList = HelperService.searchTextListFilter(list, eventParticipantSearchFilters['searchBy'], eventParticipantSearchFilters['searchValue']);
        filteredList = HelperService.sortListFilter(filteredList, eventParticipantSearchFilters['sortBy'], eventParticipantSearchFilters['sortType']);
        return filteredList;
    }

    onSelectParticipant(params) {
        const { selectedEvent, customParticipantList, updateParticipantList } = this.props;
        customParticipantList[params.id].checked = !customParticipantList[params.id].checked;
        this.props.updateCustomParticipantList(customParticipantList);
        if (params.sfid) {
            const participantObj = {
                "asm__c": selectedEvent.asm__c,
                "event_pg_id__c": selectedEvent.pg_id__c,
                "event_participants__c": params.sfid
            };
            if (params.checked === true) {
                participantObjArr.push(participantObj);
            } else {
                participantObjArr.pop(participantObj);
            }
        }
        updateParticipantList(participantObjArr);
    }

    render() {
        let toggleAddInfluencerIcon = false;
        let { customParticipantList } = this.props;
        const {
            fetchInfluencersLoader
        } = this.props;

        let visibleNode = [];
        if (customParticipantList && customParticipantList.length) {
            let filteredInfluencerList = this.filterResults(customParticipantList);
            if (filteredInfluencerList.length) {
                visibleNode = (
                    <FlatList
                        data={customParticipantList}
                        renderItem={({ item }) => <ParticipantTuple data={item} list={customParticipantList} onPress={() => this.onSelectParticipant(item)} />}
                        keyExtractor={item => item.pg_id__c}
                        onRefresh={() => {
                            this.resetParticipantList();
                            // this.fetchInfluencersCall()
                        }}
                        refreshing={fetchInfluencersLoader}
                        ListEmptyComponent={() => <NoDataFound text={'No Participants Found'} />}
                    />
                );
                toggleAddInfluencerIcon = false;
            } else {
                visibleNode = <NoDataFound text={'No Participants Found'} />;
                toggleAddInfluencerIcon = true;
            }
        } else if (fetchInfluencersLoader) {
            visibleNode = <Loading />
            toggleAddInfluencerIcon = false;
        } else if (customParticipantList && !customParticipantList.length && !fetchInfluencersLoader) {
            visibleNode = <NoDataFound text={'No Participants Found'} />
            toggleAddInfluencerIcon = true
        }


        return (
            <View style={Style.container}>
                <View>
                    {visibleNode}
                </View>
                {toggleAddInfluencerIcon && <TouchableOpacity
                    style={Style.plusIcon}
                    onPress={() => NavigationService.navigate('NewInfluencers')}>
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
    influencersList: state.influencers.influencersList,
    fetchInfluencersLoader: state.influencers.fetchInfluencersLoader,
    eventParticipantSearchFilters: state.events.eventParticipantSearchFilters,
    participantObjList: state.events.participantObjList,
    selectedEvent: state.events.selectedEvent,
    customParticipantList: state.events.customParticipantList,
    participantList: state.events.participantList
});

const mapDispatchToProps = (dispatch) => ({
    fetchInfluencers: (params) => dispatch(InfluencersActions.fetchInfluencers(params)),
    selectInfluencer: (params) => dispatch(InfluencersActions.selectInfluencer(params)),
    clearSelectInfluencer: () => dispatch(InfluencersActions.clearSelectInfluencer()),
    clearParticipantObjList: () => dispatch(EventActions.clearParticipantObjList()),
    updateCustomParticipantList: (params) => dispatch(EventActions.updateCustomParticipantList(params)),
    updateParticipantList: (params) => dispatch(EventActions.updateParticipantList(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddParticipantScreen)

