import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import NavigationService from 'App/Services/NavigationService'
import SearchBar from 'App/Components/SearchBar';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import WhiteButton from 'App/Components/WhiteButton';
import BlueButton from 'App/Components/BlueButton';
import DatePicker from 'App/Components/DatePicker'
import DatesScrolling from 'App/Components/DatesScrolling'
import { HelperService } from 'App/Services/Utils/HelperService'
import VisitsActions from 'App/Stores/Visits/Actions'
import BackArrowButton from 'App/Components/BackArrowButton'
import CommonActions from 'App/Stores/Common/Actions';
import _ from 'lodash'
import {
  ApplicationStyles,
  Helpers,
  Images,
  Metrics,
  Colors
} from 'App/Theme'
import {
  Platform,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet
} from 'react-native'
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
  Segment,
  Badge
} from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class AddPlannedVisitsLayout extends React.Component {

  componentDidMount() {
		const {
			changeSearchFilters,
			  agentid,
			  getAreaPjp,
        token,
        agentAreaPjp,
        searchFilters,
        changePlannedSelectedPSM,
        selectedVisitPSM,
        selectedVisitDate,
        changeAddPlannedVisitsSearchFilters
        
	  	} = this.props;

     // changePlannedSelectedPSM(agentid)
    //  getAreaPjp({
       // token,
       // team__c:agentid,
       // date:selectedVisitDate,

      //})
   
	}

  render() {
    const {
      isASM,
      psmList,
      agentAreas,
      searchFilters,
      selectedPlannedVisits,
      selectedVisitDate,
      selectedVisitPSM,
      changePlannedSelectedDate,
      changePlannedSelectedPSM,
      changeAddPlannedVisitsSearchFilters,
      token,
      getAreaPjp,
      searchFilter,
      agentAreaPjp,
      agentBeatPjp,
      startDate,
      loader,
      agentid,
      agentBeat,
      retailerSearchFilters,
      beatList,
      businessChannel,
      agentCity
    } = this.props;

//console.log('test')
    let psmListNode = [];
    if (isASM.length) {
      psmListNode = (
        <SearchableDropdown
          dataSource={psmList}
          placeHolderText={'Select SO'}
          selectedValue={selectedVisitPSM}
          onChange={(value) => {changePlannedSelectedPSM(value);
           
            getAreaPjp({
            token,
            team__c: value,
            date: selectedVisitDate})
          } }
          
          placeholder={'Type or Select SO'}
          invalid={false}
          customPickerStyles={{...Styles.psmPickerStyles, width:'90%', marginLeft:'5%',}}
        />
      );
    }
    
    return (
      <View>
       
         
        <Header style={isASM.length ? { ...Styles.header, ...{ height: hp('33%') } } : { ...Styles.header }}>
        <View style={{paddingTop: hp('1%'), paddingBottom: hp('1%')}}>
       <BackArrowButton />
       </View>
         
          <DatesScrolling
            startDate={HelperService.getNextNDayTimestamp(startDate)}
            endDate={HelperService.getNextNDayTimestamp(30, selectedVisitDate)}
            selectedStartDate={selectedVisitDate}
            selectedEndDate={selectedVisitDate}
            focusedDate={selectedVisitDate}
            allowRangeSelection={false}
            minDate={HelperService.getNextNDayTimestamp(1)}
            onDateChange={(params) => {changePlannedSelectedDate(params.selectedDate), 
              changeAddPlannedVisitsSearchFilters({ edited_field: 'area', edited_value: '' });
              changeAddPlannedVisitsSearchFilters({ edited_field: 'beat', edited_value: '' });
           
                getAreaPjp({
              token,
		          team__c: selectedVisitPSM?selectedVisitPSM: agentid,
              date:params.selectedDate, })
                
               
      
            
            
            
            }}
          />
        
          {psmListNode}
      
         
        
        <View style={Styles.searchableDropdown}>
       { retailerSearchFilters['type']=='Retailer' ?
        loader  ?
          <Text style={Styles.heading}>{'Beat List Loading ..'}</Text>
        
        :
            <View>
              
              <SearchableDropdown
                dataSource={agentBeatPjp&&agentBeatPjp.length?isASM.length?agentBeatPjp.concat([ {id: '', name: 'All'}]):agentBeatPjp: beatList.concat([ {id: '', name: 'All'}])}
                placeHolderText={'Select Beat...'}
                selectedValue={searchFilters['beat']}
                onChange={(beatCode) => changeAddPlannedVisitsSearchFilters({ edited_field: 'beat', edited_value: beatCode })}
                placeholder={'Type or Select Beat'}

                invalid={false}
                customPickerStyles={Styles.pickerStyles}
                key={searchFilters['area'] + _.uniqueId()}
              />
            </View>  
      
        : []}
        { retailerSearchFilters['type']=='Retailer'?[]: 
        loader ?
          <Text style={Styles.heading}>{'City List Loading ..'}</Text>
        
        :
            <View>
              
              <SearchableDropdown
                dataSource={businessChannel=='Wholesale'? agentAreaPjp&&agentAreaPjp.length?isASM.length?agentAreaPjp.concat([ {id: '', name: 'All'}]):agentAreaPjp:retailerSearchFilters['type']=='Wholesaler'? agentAreas :this.props.cityAllList :agentAreaPjp&&agentAreaPjp.length?isASM.length?agentAreaPjp.concat([ {id: '', name: 'All'}]):agentAreaPjp:agentAreas}
                placeHolderText={'Select City...'}
                selectedValue={searchFilters['area']}
                onChange={(areaCode) => changeAddPlannedVisitsSearchFilters({ edited_field: 'area', edited_value: areaCode })}
                placeholder={'Type or Select City'}
                invalid={false}
                customPickerStyles={Styles.pickerStyles}
                key={searchFilters['area'] + _.uniqueId()}
              />
            </View>  
            
          }
            <View>

              
              <WhiteButton vertical style={Styles.viewBtn} textStyle={Styles.viewBtntext} title={'Visits'} onPress={() => NavigationService.navigate('SelectedPlannedVisitsScreen')}>
                <Badge style={selectedPlannedVisits.length==0?Styles.countBadge:Styles.countBadge1}>
                  <Text>{selectedPlannedVisits.length}</Text>
                </Badge>
              </WhiteButton>
            </View>
          </View>
          
          <View style={Styles.searchFilterContainer}>
          
           
          </View>
          <SearchBar
            placeholder={`Search by name`}
            onInputChange={(text) => changeAddPlannedVisitsSearchFilters({ edited_field: 'name', 'edited_value': text })}
            onInputSubmit={(text) => changeAddPlannedVisitsSearchFilters({ edited_field: 'name', 'edited_value': text })}
            onInputClear={(text) => changeAddPlannedVisitsSearchFilters({ edited_field: 'name', 'edited_value': '' })}
            value={searchFilters['name']}
            ContainerStyles={Styles.searchContainer}
          />
        </Header>
        {this.props.children}
      </View>
    )
  }
}



const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid	: state.user.id,
  agentAreas: [{ id: '', name: 'All' }].concat(state.user.agentAreas),
  searchFilters: state.visits.planVisit.searchFilters,
 
  categoryRatingMapping: state.common.categoryRatingMapping,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  selectedVisitDate: state.visits.planVisit.selectedVisitDate,
  startDate: state.visits.planVisit.startDate,
  selectedPlannedVisits: state.visits.planVisit.selectedPlannedVisits,
  isASM  : state.user.psmList,
  psmList : state.user.psmList.concat([ {id: state.user.id, name: 'Self'}]),
  agentAreaPjp				: state.common.agentAreaPjp, 
  agentBeatPjp				: state.common.agentBeatPjp, 
  
  loader						:state.common.fetchAllAreaPjpLoading,
  agentBeat: state.common.agentBeat,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
  beatList: state.retailers.retailersBeatSearchList,
  businessChannel	: state.user.user_details? state.user.user_details.business_channel__c:'',
  agentCity: [{ id: '', name: 'All' }].concat(state.user.agentCity),
  cityAllList : [{ id: '', name: 'All' }].concat(state.common.cityAllList),

});

const mapDispatchToProps = (dispatch) => ({
  changePlannedSelectedDate: (params) => dispatch(VisitsActions.changePlannedSelectedDate(params)),
  changePlannedSelectedPSM: (params) => dispatch(VisitsActions.changePlannedSelectedPSM(params)),
  changeAddPlannedVisitsSearchFilters: (params) => dispatch(VisitsActions.changeAddPlannedVisitsSearchFilters(params)),
  getAreaPjp:(params)				=> dispatch(CommonActions.fetchAllAreaPjp(params)),
  

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlannedVisitsLayout)



const Styles = StyleSheet.create({
  

  header: {
    height: Platform.OS === 'ios' ?hp('25%'): hp('32%'),
		paddingTop: Platform.OS === 'ios' ?hp('-2%'):hp('0%'),
   
    alignItems: 'flex-start',
    
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  searchableDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center'
  },
  pickerStyles: {
    marginBottom: -2,
		backgroundColor: 'white',
    paddingVertical: 8,
 
		paddingHorizontal: '8%',
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
		borderRadius: 25,
		elevation: 5,
		
  },
  pickerStyles1: {
    marginTop: -5,
		backgroundColor: 'white',
    paddingVertical: 8,
    minHeight: hp('5.7%'),
		paddingHorizontal: '9%',
		width: '83%',
		flexDirection: 'row',
		justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
		borderRadius: 25,
		elevation: 5,
		
  },
  psmPickerStyles: {
    marginTop: -5,
		backgroundColor: 'white',
		paddingVertical: 8,
		paddingHorizontal: '8%',
		width: '79%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 25,
		elevation: 5,
		marginLeft:'17%',
  },
  viewBtn: {
    height:  hp('5.2%'),
    width: wp('24%'),
    paddingLeft: 0,
    paddingRight: 20,
    marginLeft: wp('0%'),
    overflow: 'visible', 
    borderRadius:20,
    marginRight:'12.5%'
   },
  viewBtntext: {
    fontSize: wp('3.8%'),
    fontWeight:'bold'
  },
  countBadge: {
    position: 'absolute',
    backgroundColor: Colors.button,
    right: -10,
    top: -10
  },
  countBadge1: {
    position: 'absolute',
    backgroundColor: '#fc0b03',
    right: -10,
    top: -10
  },
  searchContainer: {
    paddingVertical: 10,
    width: '88%',
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 10,
    backgroundColor: 'white',
    fontSize: wp('3.8%'),
    fontWeight:'700',
    color: Colors.blue,
    alignSelf:'center',
    marginBottom:'2.5%',
    marginTop:'2.5%',
    height:hp('6%')
    
  },
  searchFilterContainer: {
    marginTop: hp('.5%'),
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchFilterTypeBox: {
    marginHorizontal: wp('1%'),
    marginBottom: hp('1%'),
    borderWidth: 1.5,
     width: wp('42%')
  },
  searchFilterTypeText: {
    fontSize: wp('3.8%'),
    fontFamily: ApplicationStyles.textMediumFont
  },
  heading: {
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.2%'),
	marginBottom: 0, 
  fontWeight:'bold',
  marginRight:'5%'
  },
});
