import GenericIcon from 'App/Components/GenericIcon'
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import EditVisitCard from 'App/Containers/Visits/EditVisitCard'
import VisitCard from 'App/Containers/Visits/VisitCard'
import { HelperService } from 'App/Services/Utils/HelperService'
import CommonActions from 'App/Stores/Common/Actions'
import VisitsActions from 'App/Stores/Visits/Actions'
import { Colors } from 'App/Theme'
import _ from 'lodash'
import React from 'react'
import {
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
import VisitAction from './VisitAction'
import Style from './VisitsDisplayScreenStyles'

class VisitsDisplayScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      filterList: [],
      filterResults: [],
    };
  };

  componentDidMount() {
    this.getVisitsDisplayListCall()
    this.fetchVisitsStorageListCall()
    //this.fetchVisitsDisplayListCall();
  }

  onSearchQueryChange = (text) => {
    this.setState({ searchQuery: text }, () => {
      this.filterResults();
    });
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.state.filterList.length === 0 && newProps.filteredDisplayData.length > 0) {
      const sortedList = [...newProps.filteredDisplayData].sort((a, b) => {
        const nameA = a.customer_name__c ? a.customer_name__c.toLowerCase() : "";
        const nameB = b.customer_name__c ? b.customer_name__c.toLowerCase() : "";
        return nameA.localeCompare(nameB);
      })
      this.setState({ filterList: sortedList })
    }
  }


  fetchVisitsDisplayListCall() {
    const { token, agentid, searchFilters, fetchVisitsDisplayList } = this.props

    fetchVisitsDisplayList({
      token: token,
      agentid: searchFilters['psm__c'],
      startDate: searchFilters['startDate'],
      endDate: searchFilters['endDate'],
    })
  }

  getVisitsDisplayListCall() {
    const {
      token,
      agentid,
      searchFilters,
      getVisitsDisplayList,
      fetchVisitsDisplayList,
      changeSearchFilters,
    } = this.props
    changeSearchFilters({ edited_field: 'psm__c', edited_value: agentid })
    fetchVisitsDisplayList({
      token: token,
      agentid: agentid,
      startDate: searchFilters['startDate'],
      endDate: searchFilters['endDate'],
    })
    // this.fetchVisitsDisplayListCall();
  }

  fetchVisitsStorageListCall() {
    const { token, agentid, fetchVisitsStorageList } = this.props

    fetchVisitsStorageList({
      token: token,
      agentid: agentid,
      startDate: HelperService.getPrevious7DayTimestamp(),
      endDate: HelperService.getNext7DayTimestamp(),
    })
  }

  refresh() {
    this.fetchVisitsDisplayListCall()
    this.fetchVisitsStorageListCall()
  }


  filterResults() {
    const { filteredDisplayData } = this.props;
    let { searchQuery } = this.state;
    console.log("INTHEFILTERLIST1", filteredDisplayData);
    const customerNameList = filteredDisplayData.filter((item) => {
      const searchQueryText = searchQuery.toLowerCase();
      return item.customer_name__c?.toLowerCase().includes(searchQueryText)
    })
    this.setState({ filterList: customerNameList })
    console.log("INTHEFILTERLIST2", customerNameList);
  }

  isStartVisitLoading(data) {
    const { startVisitLoader, startVisitLoadingId } = this.props

    let loading = false
    loading = !!startVisitLoader && startVisitLoadingId == data.pg_id__c
    return loading
  }

  isEndVisitLoading(data) {
    const { endVisitLoader, endVisitLoadingId } = this.props

    let loading = false
    loading = !!endVisitLoader && endVisitLoadingId == data.pg_id__c
    return loading
  }

  isActionVisible(data) {
    //if status is completed, cancelled and visit is not of current day then start and end visit actions are not visible.
    const { searchFilters, agentid } = this.props
    //console.log(searchFilters['psm__c'])
    //console.log(agentid)
    const status = data.status__c
    if (
      status == 'Completed' ||
      status == 'Cancelled' ||
      status == 'Unexecuted' ||
      !HelperService.isToday(searchFilters['startDate'])
    ) {
      return false
    }
    if (agentid !== searchFilters['psm__c']) {
      return false
    }

    return true
  }

  isActionDisabled() {
    const { endVisitLoader, startVisitLoader } = this.props

    return startVisitLoader || endVisitLoader
  }

  getStartVisitText(data) {
    const { executeVisitData } = this.props

    return data.status__c == 'Started' ||
      (!_.isEmpty(executeVisitData) && data.pg_id__c == executeVisitData.pg_id__c)
      ? 'Resume'
      : 'Start Visit'
  }

  getPsmAssigned(data) {
    const { agentid, psmList } = this.props

    return agentid == data.psm__c
      ? 'Self'
      : HelperService.findMatchingKeyValueInList(psmList, 'id', data.psm__c, 'name') || 'Self'
  }

  getCardNode(data) {
    const {
      isASM,
      psmList,
      agentid,
      openModal,
      pressEndVisit,
      pressEditVisit,
      pressStartVisit,
      pressCancelVisit,
      executeVisitData,
      categoryRatingMapping,
      startVisitLoader,
      endVisitLoader,
    } = this.props

    return (
      <VisitCard
        visitData={data}
        isASM={isASM}
        psmAssigned={this.getPsmAssigned(data)}
        showPsmDetails={isASM}
        startVisitText={this.getStartVisitText(data)}
        categoryRatingMapping={categoryRatingMapping}
        orderData={data}
        onPressStartVisit={() => pressStartVisit({ visit: data })}
        onPressEndVisit={() => pressEndVisit({ visit: data })}
        startVisitDisabled={this.isActionDisabled()}
        endVisitDisabled={this.isActionDisabled()}
        actionVisible={this.isActionVisible(data)}
        infoVisible={!this.isActionVisible(data)}
        startVisitLoading={this.isStartVisitLoading(data)}
        endVisitLoading={this.isEndVisitLoading(data)}
        editDisabled={this.isActionDisabled()}
        cancelDisabled={this.isActionDisabled()}
        onEditClick={() =>
          pressEditVisit({
            visit: data,
            modalData: {
              content: <EditVisitCard key={data.sfid} cancel={false} edit={true} data={data} />,
              heading: 'Reschedule Visit',
            },
          })
        }
        onCancelClick={() =>
          pressCancelVisit({
            visit: data,
            modalData: {
              content: <EditVisitCard key={data.sfid} cancel={true} edit={false} data={data} />,
              heading: 'Cancel Visit',
            },
          })
        }
      />
    )
  }

  filterResultsNe(list) {
    // console.log("ADADAD", list);
    let filteredList = HelperService.sortListFilterNew(list, 'customer_name__c', 'ASC')
    return filteredList
  }

  render() {
    const {
      token,
      agentid,
      visitsDisplayList,
      visitsStorageList,
      visitsAction,
      fetchVisitsDisplayListLoader,
      searchFilters,
      openVisitsAction,
      closeVisitsAction,
      filteredDisplayData,
      user_details,
    } = this.props
    const { searchQuery, filterList } = this.state;
    let visibleNode = []
    console.log("INTHEFILTERLIST3", filterList);
    // if (filteredDisplayData && filteredDisplayData.length) {
    if (filterList && filterList.length) {
      let searchedFilteredList = filterList;
      if (searchedFilteredList.length) {
        visibleNode = (
          <FlatList
            data={searchedFilteredList}
            renderItem={({ item }) => this.getCardNode(item)}
            refreshControl={
              <RefreshControl
                //   size={0}
                refreshing={fetchVisitsDisplayListLoader}
                onRefresh={() => this.fetchVisitsDisplayListCall()}
              />
            }
            // onRefresh={() => this.fetchVisitsDisplayListCall()}
            // refreshing={fetchVisitsDisplayListLoader}
            keyExtractor={(item) => item.pg_id__c}
          />
        )
      } else {
        visibleNode = <NoDataFound text={'No Visits for selected filter.'} />
      }
    } else if (fetchVisitsDisplayListLoader) {
      visibleNode = <Loading />
    } else if (
      filteredDisplayData &&
      !filteredDisplayData.length &&
      !fetchVisitsDisplayListLoader
    ) {
      visibleNode = (
        <View style={{ flex: 1 }}>
          <NoDataFound text={'No Visits for this date.'}>
            <GenericIcon
              name={'refresh'}
              show={true}
              onPress={() => this.fetchVisitsDisplayListCall()}
              style={{ color: Colors.button, fontSize: 35, alignSelf: 'center', padding: 10 }}
            />
          </NoDataFound>
        </View>
      )
    }

    return (
      <View style={Style.container}>
        <View style={{ padding: 12, backgroundColor: Colors.white, elevation: 2 }}>
          <View>
            <TextInput
              placeholder="Search by name..."
              style={{
                height: 40,
                width: '80%',
                borderColor: 'gray',
                borderWidth: 1,
                paddingHorizontal: 8,
                borderRadius: 6,
                fontSize: 15,
                fontWeight: '600'
              }}
              onChangeText={(value) => {
                this.onSearchQueryChange(value);
              }}
              value={searchQuery ? searchQuery : ""}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {visibleNode}
        </View>
        {visitsAction ? (
          <VisitAction closeVisitsAction={closeVisitsAction} openVisitsAction={openVisitsAction} />
        ) : (
          []
        )}
        {user_details.rd_manual == true ? (
          []
        ) : (
          <TouchableOpacity
            style={Style.plusIcon}
            onPress={() => {
              visitsAction ? closeVisitsAction() : openVisitsAction()
            }}
          >
            <GenericIcon
              name={visitsAction ? 'remove' : 'add'}
              style={{ color: Colors.white, fontSize: 45, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  visitsDisplayList: state.visits.visitsDisplayList,
  visitsStorageList: state.visits.visitsStorageList,
  visitsAction: state.visits.visitsAction,
  fetchVisitsDisplayListLoader: state.visits.fetchVisitsDisplayListLoader,
  searchFilters: state.visits.searchFilters,
  filteredDisplayData: state.visits.filteredDisplayData,
  categoryRatingMapping: state.common.categoryRatingMapping,
  startVisitLoader: state.visits.startVisitLoader,
  endVisitLoader: state.visits.endVisitLoader,
  isASM: state.user.isASM,
  psmList: state.user.psmList.concat([{ id: '', name: 'All' }]),
  startedToday: state.user.startDayTime ? HelperService.isToday(state.user.startDayTime) : false,
  endedToday: state.user.endDayTime ? HelperService.isToday(state.user.endDayTime) : false,
  absentToday: state.user.absentDayTime ? HelperService.isToday(state.user.absentDayTime) : false,
  executeVisitData: state.visits.executeVisitData,
  startVisitLoadingId: state.visits.startVisitLoadingId,
  endVisitLoadingId: state.visits.endVisitLoadingId,
  businessChannel: state.user.user_details ? state.user.user_details.business_channel__c : '',
  user_details: state.user.user_details,
})

const mapDispatchToProps = (dispatch) => ({
  fetchVisitsStorageList: (params) => dispatch(VisitsActions.fetchVisitsStorageList(params)),
  fetchVisitsDisplayList: (params) => dispatch(VisitsActions.fetchVisitsDisplayList(params)),
  changeSearchFilters: (params) => dispatch(VisitsActions.changeSearchFilters(params)),
  openVisitsAction: () => dispatch(VisitsActions.openVisitsAction()),
  closeVisitsAction: () => dispatch(VisitsActions.closeVisitsAction()),
  getVisitsDisplayList: (params) => dispatch(VisitsActions.getVisitsDisplayList(params)),
  executeVisit: (params) => dispatch(VisitsActions.executeVisit(params)),
  openModal: (params) => dispatch(CommonActions.openModal(params)),
  disableModal: (params) => dispatch(CommonActions.disableModal(params)),
  startVisit: (params) => dispatch(VisitsActions.startVisit(params)),
  endVisit: (params) => dispatch(VisitsActions.endVisit(params)),
  startVisitLoading: (params) => dispatch(VisitsActions.startVisitLoading(params)),
  endVisitLoading: (params) => dispatch(VisitsActions.endVisitLoading(params)),
  startVisitLoadingStop: (params) => dispatch(VisitsActions.startVisitLoadingStop(params)),
  endVisitLoadingStop: (params) => dispatch(VisitsActions.endVisitLoadingStop(params)),
  pressStartVisit: (params) => dispatch(VisitsActions.pressStartVisit(params)),
  pressEndVisit: (params) => dispatch(VisitsActions.pressEndVisit(params)),
  pressEditVisit: (params) => dispatch(VisitsActions.pressEditVisit(params)),
  pressCancelVisit: (params) => dispatch(VisitsActions.pressCancelVisit(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsDisplayScreen)
