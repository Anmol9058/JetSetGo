import { HelperService } from 'App/Services/Utils/HelperService'
import DashboardActions from 'App/Stores/Dashboard/Actions'
import { Icon, Text } from 'native-base'
import React from 'react'
import { Dimensions, FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import Style from './DashboardScreenStyle'

const { width, height } = Dimensions.get('window')

class DailyReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attendanceList: [],
      visitList: [],
      travelList: [],
      visitedAreaList: [],
    }
  }
  //numberWithCommas = (x) => {
  // return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //}
  componentDidMount() {

    this.fetchCall()
    // console.log(this.props.getDashboardSummary());
    //this.props.getDashboardSummary({});
    //this.filteredData();
    // console.log(this.props.psmList, 'PSMLIST')
    // console.log('Dashboard summary detail', this.props.data)
    // if (!Array.isArray(this.props.data.dashboardSummary)) {
    // let {
    //  area,
    // attendence,
    // date_provided,
    // orders,
    //team,
    //visits,
    // } = this.props.data.dashboardSummary
    //let attendanceArr = [
    //  { title: 'ATTENDANCE', detail: 'Present' },
    //{
    //title: 'DAY STARTED AT',
    //detail:
    //attendence.start_time !== 'No Record'
    //? moment(attendence.start_time, 'HH:mm:ss').format('hh:mA')
    //: attendence.start_time,
    // },
    //{
    //title: 'DAY ENDED AT',
    //detail:
    //attendence.end_time !== 'No Record'
    //? moment(attendence.end_time, 'HH:mm:ss').format('hh:mA')
    //: attendence.end_time,
    // },
    // { title: 'TOTAL HRS WORKED', detail: attendence.work_hour&&attendence.work_hour.hours ?attendence.work_hour.hours:0},
    //]
    //let visitArr = [
    // { title: "TODAY'S VISIT", detail: visits.visit_count },
    //{ title: 'PLANNED VISIT', detail: visits.planned },
    //{ title: 'UNPLANNED VISIT', detail: visits.unplanned },
    // { title: 'CANCELLED VISIT', detail: visits.cancelled },
    //]

    // let travelArr = [
    // { title: "TODAY'S KM", detail: area.distance_travelled_in_kms },
    //{ title: "TODAY'S ORDER", detail: orders.order_count },
    //{ title: 'ORDER VALUE', detail: this.numberWithCommas(orders.order_value) },
    //]
    //this.setState({
    // attendanceList: attendanceArr,
    //visitList: visitArr,
    //travelList: travelArr,
    //visitedAreaList: area.visited_areas,
    //})
    //}
  }
  fetchCall() {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props


    let requestParams = {
      token,
      agentid,
      startDate: searchFilters['startDate'],
      psm__c: searchFilters['psm__c'] ? searchFilters['psm__c'] : agentid,
    }

    this.fetchData(requestParams)
  }

  fetchData(params) {
    const {
      getOrderValue,
      getVisitCount,
      getSiteCount,
      getCounters,
      getEventCount,
      getDashboardSummary,
    } = this.props

    //getOrderValue(params);
    //getVisitCount(params);
    //getSiteCount(params);
    //getCounters(params);
    //getEventCount(params);
    console.log('DL R', params)
    getDashboardSummary(params)
  }

  filteredData(list) {
    let filteredList = {}
    const { searchFilters } = this.props

    let selectedPSM = searchFilters['psm__c']

    if (selectedPSM) {
      if (list[selectedPSM]) {
        filteredList[selectedPSM] = list[selectedPSM]
      }
      return filteredList
    }

    return list
  }

  _renderAttendanceRow = ({ item, index }) => {
    return (
      <View key={index} style={[Style.itemContainer, { width: width / 3 }]}>
        <Text style={Style.itemTitle}>{item.title}</Text>
        <Text style={[Style.itemDetail, { fontSize: item.title === 'TOTAL HRS WORKED' ? 18 : 18 }]}>
          {item.detail}
        </Text>
      </View>
    )
  }
  _renderVisitRow = ({ item, index }) => {
    return (
      <View key={index} style={[Style.itemContainer, { width: width / 3 }]}>
        <Text style={Style.itemTitle}>{item.title}</Text>
        <Text style={[Style.itemDetail, { fontSize: 24 }]}>{item.detail}</Text>
      </View>
    )
  }

  _renderTravelRow = ({ item, index }) => {
    return (
      <View key={index} style={[Style.itemContainer, { width: width / 3 }]}>
        <Text style={Style.itemTitle}>{item.title}</Text>
        {item.title === 'ORDER VALUE' ? (
          <View style={Style.orderValueWrapper}>
            <Icon
              type="FontAwesome"
              name="rupee"
              style={{ color: '#08b3a6', fontSize: 20, marginTop: 3 }}
            />
            <Text style={Style.orderValueTitle}>{item.detail}</Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={
                item.title == 'DISTANCE TRAVELLED TODAY'
                  ? [{ fontSize: 0, marginTop: 0 }]
                  : [{ fontSize: 15, marginTop: 10, textAlign: 'center' }]
              }
            >
              {item.title == 'DISTANCE TRAVELLED TODAY' ? '' : 'Primary'}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [{ fontSize: 15, marginTop: 10, textAlign: 'left' }]
                    : [{ fontSize: 0, textAlign: 'center' }]
                }
              >
                BOX
              </Text>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }] &&
                      item.title == "TODAY'S ORDERS"
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 50 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                }
              >
                {item.detail_}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [{ fontSize: 15, marginTop: 10, textAlign: 'left' }]
                    : [{ fontSize: 0, marginTop: 0 }]
                }
              >
                REL
              </Text>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }] &&
                      item.title == "TODAY'S ORDERS"
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 50 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                }
              >
                {item.rel_}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [{ fontSize: 15, marginTop: 10, textAlign: 'left' }]
                    : [{ fontSize: 0, marginTop: 0 }]
                }
              >
                ROL
              </Text>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }] &&
                      item.title == "TODAY'S ORDERS"
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 50 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                }
              >
                {item.rol_}
              </Text>
            </View>

            {/* <Text style={[Style.itemDetail1, { fontSize: 13 }]}>{item.detail_}</Text> */}

            <Text
              style={
                item.title == 'DISTANCE TRAVELLED TODAY'
                  ? [{ fontSize: 0, marginTop: 0, textAlign: 'center' }]
                  : [{ fontSize: 15, marginTop: 30, textAlign: 'center' }] &&
                    item.title == 'ORDERS QUANTITY'
                  ? { marginTop: 10, textAlign: 'center' }
                  : { textAlign: 'center', marginTop: 10 }
              }
            >
              {item.title == 'DISTANCE TRAVELLED TODAY' ? '' : 'Secondary'}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [{ fontSize: 15, marginTop: 10, textAlign: 'left' }]
                    : [{ fontSize: 0, textAlign: 'center' }]
                }
              >
                BOX
              </Text>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }] &&
                      item.title == "TODAY'S ORDERS"
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 50 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                }
              >
                {item.detail}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [{ fontSize: 15, marginTop: 10, textAlign: 'left' }]
                    : [{ fontSize: 0, marginTop: 0, textAlign: 'center' }]
                }
              >
                REL
              </Text>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }] &&
                      item.title == "TODAY'S ORDERS"
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 50 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                }
              >
                {item.rel}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [{ fontSize: 15, marginTop: 10, textAlign: 'left' }]
                    : [{ fontSize: 0, marginTop: 0, textAlign: 'center' }]
                }
              >
                ROL
              </Text>
              <Text
                style={
                  item.title == 'ORDERS QUANTITY'
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }] &&
                      item.title == "TODAY'S ORDERS"
                    ? [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 50 }]
                    : [Style.itemDetail1, { fontSize: 15, marginTop: 10, marginLeft: 20 }]
                }
              >
                {item.rel}
              </Text>
            </View>

            {/* <Text style={[Style.itemDetail1, { fontSize: 13 }]}>{item.detail}</Text> */}
          </View>
        )}
      </View>
    )
  }

  //_renderVisitedAreaRow = ({ item, index }) => {
  // return (
  //<View key={index.toString()} style={[Style.itemContainer, { width: width / 3 }]}>
  // <Text style={Style.visitedAreaName}>{item}</Text>
  //</View>
  // )
  // }

  render() {
    // console.log("DailyReportScreen render");
    const { data } = this.props

    // console.log("DailyReportScreen render data", data[0].total_absent);

    let attendanceArr = []
    let visitArr = []
    let travelArr = []
    let visitedAreaList = []
   
    let attendanceArr2 = [
      {
        title: 'TOTAL PRESENT',
        detail: data && data[0] && data[0].total_present ? data[0].total_present : 'No Record',
      },
      {
        title: 'TOTAL ABSENT',
        detail: data && data[0] && data[0].total_absent ? data[0].total_absent : '0',
      },
    ]

    attendanceArr = [
      {
        title: 'ATTENDANCE',
        detail: data && data[0] && data[0].attendance ? data[0].attendance : 'No Record',
      },
      {
        title: 'DAY STARTED AT',
        detail:
          data && data[0] && data[0].start_day && data[0].start_day !== 'No Record'
            ? HelperService.removeTimestringFromDate(data[0].start_day)
            : 'No Record',
      },
      {
        title: 'DAY ENDED AT',
        detail:
          data && data[0] && data[0].end_day && data.end_day !== 'No Record'
            ? HelperService.removeTimestringFromDate(data[0].end_day)
            : 'No Record',
      },
      {
        title: 'TOTAL HRS WORKED',
        detail:
          data[0] && data[0].total_hours_worked
            ? HelperService.normaliseValue(data[0].total_hours_worked, 2)
            : ' No Record',
      },
    ]

    visitArr = [
      {
        title: "TOTAL VISITS",
        detail: data && data[0] && data[0].total_visit ? data[0].total_visit : 0,
      },
      { title: 'PLANNED VISITS', detail: data && data[0] ? data[0].planned : 0 },
      { title: 'UNPLANNED VISITS', detail: data && data[0] ? data[0].unplanned : 0 },
      { title: 'CANCELLED VISITS', detail: data && data[0] ? data[0].cancelled : 0 },
      { title: 'COMPLETED VISITS', detail: data && data[0] ? data[0].completed : 0 },
    ]

    travelArr = [
      {
        title: 'ORDERS VALUE',
        detail_:
          data && data[0] && data[0].order_value_primary
            ? HelperService.currencyValue(data[0].order_value_primary | 0)
            : 0,
        detail:
          data && data[0] && data[0].order_value_secondary
            ? HelperService.currencyValue(data[0].order_value_secondary | 0)
            : 0,
      },

      {
        title: 'ORDERS QUANTITY',
        detail_: data && data[0] && data[0].BOXqtyPrimary ? data[0].BOXqtyPrimary : 0,
        detail: data && data[0] && data[0].BOXqtySecondary ? data[0].BOXqtySecondary : 0,
        rel_: data && data[0] && data[0].RELqtyPrimary ? data[0].RELqtyPrimary : 0,
        rel: data && data[0] && data[0].RELqtySecondary ? data[0].RELqtySecondary : 0,
        rol_: data && data[0] && data[0].ROLqtyPrimary ? data[0].ROLqtyPrimary : 0,
        rol: data && data[0] && data[0].ROLqtySecondary ? data[0].ROLqtySecondary : 0,
      },
      {
        title: "TODAY'S ORDERS",
        detail_: data && data[0] && data[0].total_order_primary ? data[0].total_order_primary : 0,
        detail:
          data && data[0] && data[0].total_order_secondary ? data[0].total_order_secondary : 0,
      },
      {
        title: 'DISTANCE TRAVELLED TODAY',
        detail: data && data[0] && data[0].order_value ? data.distance_travelled_in_kms : 0,
      },
    ]

    if (data && data[0] && data[0].total_present) {
      attendanceArr = attendanceArr2.concat(attendanceArr)
    }
  

    // visitedAreaList = area ? area.visited_areas :  [];
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            // size={0}
            refreshing={this.props.loaders}
            onRefresh={() => this.fetchCall()}
            //  size={0}
          />
        }
      >
        <View style={{ paddingVertical: 10,backgroundColor:'white' }}>
          <View style={{ paddingLeft: 10, paddingTop: 10 }}>
            <FlatList
              horizontal={true}
              data={attendanceArr}
              refreshing={this.props.loaders.dashboardSummaryLoader}
              // onRefresh={this.fetchCall()}
              renderItem={this._renderAttendanceRow}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.attendanceList}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />
              }}
              ListFooterComponent={() => {
                return <View style={{ width: 10 }} />
              }}
            />
          </View>
          <View style={{ paddingLeft: 10, paddingTop: 30 }}>
            <FlatList
              horizontal={true}
              data={visitArr}
              refreshing={this.props.loaders.dashboardSummaryLoader}
              // onRefresh={this.props.getDashboardSummary()}
              renderItem={this._renderVisitRow}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.visitList}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />
              }}
              ListFooterComponent={() => {
                return <View style={{ width: 10 }} />
              }}
            />
          </View>
          <View style={{ paddingLeft: 10, paddingTop: 30 }}>
            <FlatList
              horizontal={true}
              data={travelArr}
              renderItem={this._renderTravelRow}
              refreshing={this.props.loaders.dashboardSummaryLoader}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.travelList}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />
              }}
              ListFooterComponent={() => {
                return <View style={{ width: 10 }} />
              }}
            />
          </View>
          {
            //<Text style={Style.visitedAreaHeading}>{'AREAS VISITED'}</Text>
            // <View style={{ paddingLeft: 10, paddingTop: 15 }}>
            // <FlatList
            // horizontal={true}
            // data={visitedAreaList}
            // refreshing={this.props.loaders.dashboardSummaryLoader}
            // renderItem={this._renderVisitedAreaRow}
            // keyExtractor={(item, index) => index.toString()}
            // extraData={this.visitedAreaList}
            //showsHorizontalScrollIndicator={false}
            // ItemSeparatorComponent={() => {
            //  return <View style={{ width: 10 }} />
            // }}
            //ListFooterComponent={() => {
            //return <View style={{ width: 10 }} />
            // }}
            // ListEmptyComponent={() => {
            // return <Text style={{ fontSize: 14, color: '#343434' }}>{'No data found'}</Text>
            // }}
            // />
            //</View>
          }
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.isASM,
  psmList: state.user.psmList.concat([{ id: '', name: 'All' }]),
  searchFilters: state.dashboard.searchFilters,
  data: state.dashboard.data.dashboardSummary,
  loaders: state.dashboard.loaders.dashboardSummaryLoader,
})

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(DashboardActions.changeSearchFilters(params)),
  getOrderValue: (params) => dispatch(DashboardActions.getOrderValue(params)),
  getVisitCount: (params) => dispatch(DashboardActions.getVisitCount(params)),
  getSiteCount: (params) => dispatch(DashboardActions.getSiteCount(params)),
  getCounters: (params) => dispatch(DashboardActions.getCounters(params)),
  getEventCount: (params) => dispatch(DashboardActions.getEventCount(params)),
  getDashboardSummary: (params) => dispatch(DashboardActions.getDashboardSummary(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyReport)
