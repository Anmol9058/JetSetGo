import { call, put, select } from 'redux-saga/effects'
import { userService } from '../Services/Api/UserService'
import NavigationService from '../Services/NavigationService'
import { HelperService } from '../Services/Utils/HelperService'
import CommonActions from '../Stores/Common/Actions'
import DashboardActions from '../Stores/Dashboard/Actions'
import RetailersActions from '../Stores/Retailers/Actions'
import UserActions from '../Stores/User/Actions'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */

export function* startup({ params }) {
  let user = yield select(state => state.user)
  let retailers = yield select(state => state.retailers)
  
  const {
    id,
    token,
    startDayTime,
    endDayTime,
    absentDayTime,
  
  } = user;

  const {
    retailersOffset,
    retailersLimit
  } = retailers;

 


  let startedToday = startDayTime ? HelperService.isToday(startDayTime) : false;
  let endedToday = endDayTime ? HelperService.isToday(endDayTime) : false;
  let absentToday = absentDayTime ? HelperService.isToday(absentDayTime) : false;

  let logged_in = token && id &&HelperService.datesAreOnSameDay(HelperService.getCurrentTimestamp(), user.is_logged_in);
  if (logged_in) { // if user us already logged in
    if (startedToday) { // user has started the day
      NavigationService.navigateAndReset('DashboardScreen');
    } else if (endedToday) { // user has ended the day
      NavigationService.navigateAndReset('DashboardScreen');
    } else if (absentToday) { // user has ended the day
      NavigationService.navigateAndReset('DashboardScreen');
    } else { // user has neither started or ended the day
      NavigationService.navigateAndReset('DashboardScreen');
    }

   
    yield put(UserActions.fetchAllAreas({token,agentid: id}));

   
    //api to check agent attendance details : Todo=> uncomment
    yield put(UserActions.checkAttendance({
      token,
      date: HelperService.getCurrentTimestamp()
    }));

    
    
    //fetch all PSMs for a agent
    yield put(UserActions.fetchAllPsm({
      token,
      agentid: id
    }));


    //fetch all competitors logged in already 
   yield put(RetailersActions.fetchRetailerCompetitors({
      token,
     agentid: id
    }));


    //fetch all retailers on startup if logged in already 
    yield put(RetailersActions.fetchRetailers({
      token,
      agentid: id,
      offset: retailersOffset,
      limit: retailersLimit
    }));
    yield put(RetailersActions.getRetailerTarget({
      token,
     
    }));

   
    yield put(CommonActions.fetchObjective({ token,})),
    yield put(CommonActions.fetchState({ token,})),
    yield put(CommonActions.fetchCity({ token, }))
    yield put(CommonActions.fetchAllCity({ token,}))
    yield put(UserActions.getTaxDetails({token, }));

    
    yield put(CommonActions.fetchBeat({ token,}),)

    yield put(DashboardActions.getTargetTeam({ token,}),)
    // yield put(SurveyActions.getSurveys({ token,}),)
    // yield put(ExpensesActions.getMyExpenses({ token,}),)
    //yield put(ExpensesActions.updateTravelExpense({ token,}),)

    //yield put(CommonActions.fetchRetailerArea({ token,}),)

    yield put(CommonActions.fetchDealerType({ token,}),)

    const appData = yield call(userService.getAppVersion, {token}); 
    
    let android_version = appData?appData.name:'';
   
    
    appData ? HelperService.checkAppVersion(android_version) : '';

  } else { // if user is not logged in
    NavigationService.navigateAndReset('LoginScreen')
    yield put(UserActions.userLogoutSuccess({}));
  }
}
