import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Text,
  Input,
  Item,
  Right,
  Spinner,
} from 'native-base'
import NavigationService from 'App/Services/NavigationService'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { HelperService } from 'App/Services/Utils/HelperService'
import DashboardActions from 'App/Stores/Dashboard/Actions'
import GenericIcon from 'App/Components/GenericIcon'
import DatePicker from 'App/Components/DatePicker'
import WhiteButton from 'App/Components/WhiteButton'
import DatePickerStyles from 'App/Components/DatePicker/DatePickerStyles'
import SearchableDropdown from 'App/Components/SearchableDropdown'
import DashboardTabs from 'App/Containers/Dashboard/DashboardTabs'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import _ from 'lodash'

class DashboardLayout extends React.Component {
  onDateChange(params) {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props

    changeSearchFilters({
      edited_field: 'startDate',
      edited_value: params.selectedStartDate,
    })

    changeSearchFilters({
      edited_field: 'endDate',
      edited_value: params.selectedEndDate,
    })

    let requestParams = {
      token,
      agentid,
      startDate: params.selectedStartDate,
      endDate: params.selectedEndDate,
      psm__c: searchFilters['psm__c'],
      // data: 'startday',
    }

    console.log('DL requestParams', requestParams)

    this.fetchData(requestParams)
  }

  onMonthChange(month) {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props

    changeSearchFilters({
      edited_field: 'selectedMonth',
      edited_value: month,
    })

    let timestamps = HelperService.getMonthStartAndEndDateTimestamp(month)

    changeSearchFilters({
      edited_field: 'startDate',
      edited_value: timestamps[0],
    })

    changeSearchFilters({
      edited_field: 'endDate',
      edited_value: timestamps[1],
    })

    let requestParams = {
      token,
      agentid,
      startDate: timestamps[0],
      endDate: timestamps[1],
      psm__c: searchFilters['psm__c'],
      data: 'startday',
    }

    this.fetchData(requestParams)
  }
  onSoChange(value) {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props

    changeSearchFilters({ edited_field: 'psm__c', edited_value: value })
    console.log("SSSSS===", searchFilters);
    let requestParams = {
      token,
      agentid,
      startDate: searchFilters.startDate,
      // endDate: params.selectedEndDate,
      psm__c: value,
    }

    this.fetchData(requestParams)
  }
  fetchCall() {
    const { token, agentid, searchFilters, changeSearchFilters } = this.props
    //console.log(token, agentid, 'QWERTY')

    let requestParams = {
      token,
      agentid,
      startDate: HelperService.getCurrentTimestamp(),
      psm__c: searchFilters['psm__c'] ? searchFilters['psm__c'] : agentid,
     
      // startDate: "1659551400000",
    }

    this.fetchData(requestParams)
    //getSiteCount(params)
    //getCounters(params)
    //getEventCount(params)
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
    getDashboardSummary(params)
  }

  render() {
    // console.log("DashboardLayout");
    const { changeSearchFilters, searchFilters, children, psmList, isASM, loaders } = this.props
    console.log("DashboardLayout==", psmList);

    let monthPickerNode = (
      <View style={Styles.monthPicker}>
        <Text style={Styles.dateText}>
          {HelperService.getMonthMappingName(searchFilters['selectedMonth'])}
        </Text>
      </View>
    )

    let datePickerNode = (
      <View>
        <View style={Styles.datePicker}>
          <Text style={Styles.dateText}>
            {HelperService.getDashboardDisplayDate(
              searchFilters['startDate'],
              searchFilters['endDate']
            )}
          </Text>
          <GenericIcon
            name={'calendar'}
            show={true}
            style={{ ...DatePickerStyles.icon, ...DatePickerStyles.iconActive, ...Styles.dateIcon }}
          />
        </View>
      </View>
    )

    let visiblePickerNode = []

    if (searchFilters['selectedDateType'] == 'Month') {
      visiblePickerNode = (
        <View style={{ flexDirection: 'row', width: wp('43%') }}>
          <TouchableOpacity
            transparent
            onPress={() =>
              this.onMonthChange(HelperService.getPreviousMonth(searchFilters['selectedMonth']))
            }
          >
            <Icon
              name={'ios-arrow-back'}
              ios={'ios-arrow-back'}
              android={'md-arrow-dropleft'}
              style={Styles.dateChangeIcon}
            />
          </TouchableOpacity>
          {monthPickerNode}
          <TouchableOpacity
            transparent
            onPress={() =>
              this.onMonthChange(HelperService.getNextMonth(searchFilters['selectedMonth']))
            }
          >
            <Icon
              name={'ios-arrow-forward'}
              ios={'ios-arrow-forward'}
              android={'md-arrow-dropright'}
              style={Styles.dateChangeIcon}
            />
          </TouchableOpacity>
        </View>
      )
    } else {
      visiblePickerNode = (
        <View>
          <DatePicker
            allowRangeSelection={true}
            selectedStartDate={searchFilters['startDate']}
            selectedEndDate={searchFilters['endDate']}
            onDateChange={(params) => this.onDateChange(params)}
          >
            {datePickerNode}
          </DatePicker>
        </View>
      )
    }

    let psmListNode = []
    if (isASM.length) {
      psmListNode = (
        <View style={{ height: hp('10%'), marginBottom: 0, paddingBottom: 0 }}>
          <SearchableDropdown
            dataSource={psmList}
            placeHolderText={'Select SO'}
            selectedValue={searchFilters['psm__c']}
            onChange={(value) => this.onSoChange(value)}
            placeholder={'Type or Select PSM'}
            invalid={false}
            customPickerStyles={Styles.psmPickerStyles}
          />
        </View>
      )
    }

    return (
      <View>
        <Header
          style={
            isASM.length ? { ...Styles.header, ...{ height: hp('29%') } } : { ...Styles.header }
          }
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              alignSelf: 'center',
              marginBottom: hp('1%'),
            }}
          >
            <View>
              <WhiteButton
                title={'Date'}
                style={Styles.actionButton}
                textStyle={Styles.actionButtonText}
                onPress={() =>
                  changeSearchFilters({ edited_field: 'selectedDateType', edited_value: 'Date' })
                }
                selected={searchFilters['selectedDateType'] == 'Date'}
                disabled={searchFilters['selectedTab'] == 0}
              />
            </View>
            <View>
              <WhiteButton
                title={'Month'}
                style={Styles.actionButton}
                textStyle={Styles.actionButtonText}
                onPress={() =>
                  changeSearchFilters({ edited_field: 'selectedDateType', edited_value: 'Month' })
                }
                selected={searchFilters['selectedDateType'] == 'Month'}
                disabled={searchFilters['selectedTab'] == 0}
              />
            </View>
            {visiblePickerNode}
          </View>
          {psmListNode}
          {loaders.dashboardSummaryLoader ? (
            <View style={Styles.loadingIcon}>
              <Spinner color={Colors.primary} size={'small'} />
            </View>
          ) : (
            <Icon
              name={'refresh'}
              onPress={() => this.fetchCall()}
              style={Styles.refreshIcon}
              type={'FontAwesome'}
            />
          )}
          <DashboardTabs />
        </Header>
        {children}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  isASM: state.user.psmList,
  psmList: state.user.psmList.concat([{ id: state.user.id, name: 'Self' }]),
  searchFilters: state.dashboard.searchFilters,
  data: state.dashboard.data,
  loaders: state.dashboard.loaders,
})

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(DashboardActions.changeDashboardSearchFilters(params)),
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
)(DashboardLayout)

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    height: hp('21%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingTop: hp('2%'),
    elevation: 2,
  },
  datePicker: {
    alignSelf: 'center',
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: 'row',
    width: wp('43%'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  monthPicker: {
    alignSelf: 'center',
    backgroundColor: Colors.button,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: wp('25%'),
  },
  dateText: {
    fontFamily: ApplicationStyles.textMediumFont,
    color: Colors.white,
    fontSize: wp('3.3%'),
    textTransform: 'capitalize',
  },
  dateIcon: {
    color: Colors.white,
    fontSize: wp('7%'),
    marginLeft: 0,
    marginRight: 0,
    zIndex: 2,
    paddingLeft: wp('3%'),
  },
  dateChangeIcon: {
    color: Colors.button,
    alignSelf: 'center',
    paddingHorizontal: wp('3%'),
    fontSize: wp('11%'),
  },
  psmPickerStyles: {
    marginTop: -5,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: '8%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
    marginLeft: '5%',
  },
  actionButton: {
    borderWidth: 1.5,
    width: wp('20%'),
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp('1.2%'),
  },
  actionButtonText: {
    fontSize: wp('3%'),
    fontFamily: ApplicationStyles.textMediumFont,
  },
  selectedActionButton: {
    borderWidth: 1.5,
    width: wp('20%'),
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: Colors.clrF1F9FF,
    marginHorizontal: wp('1.2%'),
    height: 35,
  },
  refreshIcon: {
    color: Colors.primary,
    fontSize: wp('5.5%'),
    alignSelf: 'center',
    padding: hp('1%'),
    paddingBottom: 0,
    position: 'absolute',
    right: wp('3.3%'),
    marginTop: hp('10%'),
    zIndex: 2,
  },
  loadingIcon: {
    color: Colors.primary,
    fontSize: wp('6.9%'),
    alignSelf: 'center',
    position: 'absolute',
    right: wp('5.3%'),
    marginTop: hp('13.2%'),
    zIndex: 2,
  },
})
