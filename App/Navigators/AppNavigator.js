import AbsentScreen from 'App/Containers/Absent'
import CompletedDayScreen from 'App/Containers/CompletedDay'
import DashboardScreen from 'App/Containers/Dashboard'
import EndDayScreen from 'App/Containers/EndDay'
import LoginOtpScreen from 'App/Containers/Login/LoginOtpScreen'
import LoginScreen from 'App/Containers/Login/LoginScreen'
import OrderInfoScreen from 'App/Containers/Orders/OrderInfoScreen'
import OrdersListScreen from 'App/Containers/Orders/OrdersListScreen'
import ReOrderInfoScreen from 'App/Containers/Orders/ReOrderInfoScreen'
import PresentScreen from 'App/Containers/Present'
import InOfficeScreen from 'App/Containers/Present/InOfficeScreen'
import WorkFromHomeScreen from 'App/Containers/Present/WorkFromHomeScreen'
import DealerInfoScreen from 'App/Containers/Retailers/DealerInfoScreen'
import NewRetailer from 'App/Containers/Retailers/NewRetailer'
import UpdateRetailer from 'App/Containers/Retailers/NewRetailer/UpdateRetailer'
import RetailerInfoScreen from 'App/Containers/Retailers/RetailerInfoScreen'
import RetailerList from 'App/Containers/Retailers/RetailerList'
import RetailerOrdersListScreen from 'App/Containers/Retailers/RetailerOrdersListScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import StartDayScreen from 'App/Containers/StartDay'
import StartDaySelectionScreen from 'App/Containers/StartDay/StartDaySelectionScreen'
import UnplannedOptionsScreen from 'App/Containers/UnplannedVisits/OptionsScreen'
import RetailerResultListScreen from 'App/Containers/UnplannedVisits/RetailerResultList'
import SearchByAreaScreen from 'App/Containers/UnplannedVisits/SearchByAreaScreen'
import SearchByLocationScreen from 'App/Containers/UnplannedVisits/SearchByLocationScreen'
import AddPlannedVisitsScreen from 'App/Containers/Visits/PlannedVisit/AddPlannedVisitsScreen'
import SelectedPlannedVisitsScreen from 'App/Containers/Visits/PlannedVisit/SelectedPlannedVisitsScreen'
import VisitBookOrder from 'App/Containers/Visits/VisitBookOrder'
import StartVisitForm from 'App/Containers/Visits/VisitForm'
import VisitsScreen from 'App/Containers/Visits/VisitsDisplayScreen'

import EventInfoScreen from 'App/Containers/Event/EventInfoScreen'
import EventList from 'App/Containers/Event/EventList'
import EventParticipantListScreen from 'App/Containers/Event/EventParticipantListScreen'
import NewEvent from 'App/Containers/Event/NewEvent'
import UpdateEvent from 'App/Containers/Event/NewEvent/UpdateEvent'
import ExpenseItemTabScreen from 'App/Containers/ExpenseItem/ExpenseItemTabScreen/ExpenseItemTabScreen'
import InfluencerSiteList from 'App/Containers/Influencers/InfluencerSiteList'
import InvoiceInfoScreen from 'App/Containers/Invoice'
import LocalAttachmentScreen from 'App/Containers/LocalExpense/LocalAttachmentScreen/LocalAttachmentScreen'
import LocalExpenseInfoScreen from 'App/Containers/LocalExpense/LocalExpenseInfoScreen/LocalExpenseInfoScreen'
import LocalExpenseListScreen from 'App/Containers/LocalExpense/LocalExpenseListScreen/LocalExpenseListScreen'
import LocalExpenseTabScreen from 'App/Containers/LocalExpense/LocalExpenseTabScreen'
import TeamExpenseInfoScreen from 'App/Containers/LocalExpense/TeamExpenseInfoScreen/TeamExpenseInfoScreen'
import TeamExpenseListScreen from 'App/Containers/LocalExpense/TeamExpenseListScreen/TeamExpenseListScreen/'
import UpdateLocalExpenseScreen from 'App/Containers/LocalExpense/UpdateExpenseScreen'
import DealerOrderInfoScreen from 'App/Containers/Orders/OrderInfoScreen/DealerOrderInfoScreen'
import OutstationAttachmentScreen from 'App/Containers/OutstationExpense/OutstationAttachmentScreen'
import OutstationExpenseListScreen from 'App/Containers/OutstationExpense/OutstationExpenseListScreen'
import OutstationExpenseTabScreen from 'App/Containers/OutstationExpense/OutstationExpenseTabScreen'
import SelectVisitScreen from 'App/Containers/OutstationExpense/OutstationMyExpenseScreen/SelectVisitScreen/SelectVisitScreen'
import TourApprovalScreen from 'App/Containers/OutstationExpense/OutstationMyExpenseScreen/TourApprovalScreen/TourApprovalScreen'
import ConvenienceInfoScreen from 'App/Containers/OutstationExpense/TeamOutstationView/Conveneince/ConvenienceInfo'
import ConvenienceListView from 'App/Containers/OutstationExpense/TeamOutstationView/Conveneince/ConvenienceList'
import FoodInfoScreen from 'App/Containers/OutstationExpense/TeamOutstationView/Food/FoodInfo'
import FoodListView from 'App/Containers/OutstationExpense/TeamOutstationView/Food/FoodList'
import HotelInfoScreen from 'App/Containers/OutstationExpense/TeamOutstationView/Hotel/HotelInfo'
import HotelListView from 'App/Containers/OutstationExpense/TeamOutstationView/Hotel/HotelList'
import IncidentalInfoScreen from 'App/Containers/OutstationExpense/TeamOutstationView/Incidental/IncidentalInfo'
import IncidentalListView from 'App/Containers/OutstationExpense/TeamOutstationView/Incidental/IncidentalList'
import LocalExpenseInfo from 'App/Containers/OutstationExpense/TeamOutstationView/LocalExpense/LocalExpenseInfo'
import LocalExpenseListView from 'App/Containers/OutstationExpense/TeamOutstationView/LocalExpense/LocalExpenseList'
import OtherInfoScreen from 'App/Containers/OutstationExpense/TeamOutstationView/Other/OtherInfo'
import OtherListView from 'App/Containers/OutstationExpense/TeamOutstationView/Other/OtherList'
import TravelInfoScreen from 'App/Containers/OutstationExpense/TeamOutstationView/Travel/TravelInfo'
import TravelListView from 'App/Containers/OutstationExpense/TeamOutstationView/Travel/TravelList'
import AddConvenienceScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Convenience/AddConvenience/AddConvenience'
import ConvenienceListScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Convenience/ConvenienceListScreen'
import ConvenienceUpdateScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Convenience/ConvenienceUpdateScreen'
import AddFoodScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Food/AddFood/AddFood'
import FoodInfo from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Food/FoodInfo'
import FoodListScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Food/FoodListScreen'
import UpdateFoodScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Food/UpdateFood'
import AddHotelScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/AddHotel/AddHotel'
import HotelInfo from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/HotelInfo'
import HotelListScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/HotelListScreen'
import UpdateHotelScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Hotel/UpdateHotel'
import AddIncidentalScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/AddIncidental/AddIncidental'
import IncidentalInfo from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/IncidentalInfo'
import IncidentalListScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/IncidentalListScreen'
import UpdateIncidentalScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Incidental/UpdateIncidental'
import LocalExpenseInfoView from 'App/Containers/OutstationExpense/UpdateOutstationScreen/LocalExpense/LocalExpenseInfoView'
import LocalExpenseList from 'App/Containers/OutstationExpense/UpdateOutstationScreen/LocalExpense/LocalExpenseList'
import UpdateLocalExpense from 'App/Containers/OutstationExpense/UpdateOutstationScreen/LocalExpense/UpdateLocalExpense/UpdateLocalExpenseScreen'
import AddOtherScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Other/AddOther/AddOther'
import OtherInfo from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Other/OtherInfo'
import OtherListScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Other/OtherListScreen'
import UpdateOtherScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Other/UpdateOther'
import AddTravelScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/AddTravel'
import TravelInfo from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/TravelInfo'
import TravelListScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/TravelListScreen'
import TravelUpdateScreen from 'App/Containers/OutstationExpense/UpdateOutstationScreen/Travel/TravelUpdateScreen'
import ParticipantsScreen from 'App/Containers/Participants'
import ProfileScreen from 'App/Containers/Profile'
import DealerInvoiceListScreen from 'App/Containers/Retailers/DealerInvoiceListScreen'
import DealerOrdersListScreen from 'App/Containers/Retailers/DealerOrdersListScreen'
import DealerOutstandingListScreen from 'App/Containers/Retailers/DealerOutstandingListScreen'
import NewTourScreen from 'App/Containers/Tour/NewTourScreen/NewTourScreen'
import TourAttachmentScreen from 'App/Containers/Tour/TourAttachementScreen'
import TourInfoScreen from 'App/Containers/Tour/TourInfoScreen'
import TourTabScreen from 'App/Containers/Tour/TourTabScreen/TourTabScreen'
import UpdateTourScreen from 'App/Containers/Tour/UpdateTourScreen'
import VisitBookOrderHeader from 'App/Containers/Visits/VisitBookOrder/VisitBookOrderHeader'
import VisitHistory from 'App/Containers/Visits/VisitHistory/VisitHistory'
import VisitInfoScreen from 'App/Containers/Visits/VisitInfoScreen'
import VisitOrderCart from 'App/Containers/Visits/VisitOrderCart'
import VisitRetailerInfo from 'App/Containers/Visits/VisitRetailerInfo'
import AddParticipantScreen from '../Containers/Event/AddParticipantScreen'
import InfluencerInfoScreen from '../Containers/Influencers/InfluencerInfoScreen'
import InfluencersListScreen from '../Containers/Influencers/InfluencerList'
import NewInfluencers from '../Containers/Influencers/NewInfluencer'
import UpdateInfluencer from '../Containers/Influencers/NewInfluencer/updateInfluencer'
import NewSiteProduct from '../Containers/Sites/AddSiteProduct/AddSiteProduct'
import UpdateSiteProduct from '../Containers/Sites/AddSiteProduct/UpdateSiteProduct'
import NewSites from '../Containers/Sites/NewSites'
import UpdateSite from '../Containers/Sites/NewSites/UpdateSite'
import SiteProductInfoScreen from '../Containers/Sites/SiteProductInfoScreen'
import SiteProductListScreen from '../Containers/Sites/SiteProductListScreen'
import SitesInfoScreen from '../Containers/Sites/SitesInfoScreen'
import SitesList from '../Containers/Sites/SitesList'
import SiteListScreen from '../Containers/Sites/SitesList/SiteList'
import VisitHistoryDetails from '../Containers/Visits/VisitHistory/VisitHistoryDetails'

import ExpenseMenuTabScreen from 'App/Containers/ExpenseListMenu/ExpenseMenuTabScreen'
import MyExpenseDateWise from 'App/Containers/ExpenseListMenu/MyExpenseScreen/MyExpenseDateWise/MyExpenseDateWise'
import DatewiseListScreen from '../Containers/ExpenseListMenu/MyExpenseScreen/MyExpenseDateWise/SubScreens/DatewiseListScreen'
import EditIconScreen from '../Containers/ExpenseListMenu/MyExpenseScreen/MyExpenseDateWise/SubScreens/EditIconScreen'
import MyExpenseUpload from '../Containers/ExpenseListMenu/MyExpenseScreen/MyExpenseDateWise/SubScreens/MyExpenseUpload'


import DealerPaymentsListScreen from 'App/Containers/Retailers/DealerPaymentsListScreen'
import VisitRetailerOutstanding from 'App/Containers/Visits/VisitRetailerOutstanding'
import OutstandingPaymentInfo from 'App/Containers/Visits/VisitRetailerOutstanding/OutstandingPaymentInfo'

import SchemesListScreen from 'App/Containers/Schemes'
import OrderLevelSchemeInfoScreen from 'App/Containers/Schemes/orderLevelSchemeInfo'
import ProductLevelSchemeInfoScreen from 'App/Containers/Schemes/productLevelSchemeInfo'

import MenuScreen from 'App/Containers/Menu'
import MenuDetailScreen from 'App/Containers/Menu/MenuDetailScreen'

import ComplaintsScreen from 'App/Containers/Retailers/Complaints'
import NewComplaintsScreen from 'App/Containers/Retailers/Complaints/NewComplaints'
import MyDetails from '../Containers/Dashboard/SummaryTables/MyDetails'
import ComplaintListScreen from "../Containers/Retailers/Complaints/ComplaintListScreen"
import Addtocart from './../Containers/Bookorder/addtocart'
import Bookorder from './../Containers/Bookorder/bookorder'
import EventListScreen from './../Containers/Event/EventList/EventList'
import Selectbrand from './../Containers/Product/selectbrand'
import Selectgsm from './../Containers/Product/selectgsm'
import Selectproduct from './../Containers/Product/selectproduct'

import ResolvedListScreen from '../Containers/Retailers/Complaints/ResolvedListScreen/index'

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreditLimit from 'App/Containers/CreditLimit'
import DsrListScreen from 'App/Containers/Retailers/RetailerInfoScreen/DsrScreen/DsrListScreen'
import NewDsrScreen from 'App/Containers/Retailers/RetailerInfoScreen/DsrScreen/NewDsrScreen'
import SurveyListScreen from "App/Containers/Survey"
import SurveyFormScreen from 'App/Containers/Survey/SurveyForm'
import AddCompetitorForm from 'App/Containers/Visits/VisitForm/AddCompetitorForm'
import AddStockForm from 'App/Containers/Visits/VisitForm/AddStockForm'
import UpdateCompetitorForm from 'App/Containers/Visits/VisitForm/UpdateCompetitorForm'
import UpdateStockForm from 'App/Containers/Visits/VisitForm/UpdateStockForm'
import DailyReport from '../Containers/Dashboard/DailyReport'
import ProductCategoryScreen from '../Containers/ProductCategory'
import ComplaintsSecondScreen from '../Containers/Retailers/Complaints/ComplaintSecondScreen/ComplaintsSecondScreen'
import { navigatorRef } from '../Services/NavigationService'
const Stack = createNativeStackNavigator();
/**
 * The root screen contains the application's navigation.
 *
 */
function AppNavigator({onNavigationStateChange}) {

  return (
    <NavigationContainer
      onStateChange={onNavigationStateChange}
      ref={navigatorRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
<Stack.Screen name="SplashScreen" component={SplashScreen}/>
<Stack.Screen name="CreditLimit" component={CreditLimit}/> 
<Stack.Screen name="EventListScreen" component={EventListScreen}/> 
<Stack.Screen name="StartDayScreen" component={StartDayScreen}/> 
<Stack.Screen name="Selectproduct" component={Selectproduct}/> 
<Stack.Screen name="Selectbrand" component={Selectbrand}/>
<Stack.Screen name="Selectgsm" component={Selectgsm}/> 
<Stack.Screen name="StartDaySelectionScreen" component={StartDaySelectionScreen}/> 
<Stack.Screen name="EndDayScreen" component={EndDayScreen}/> 
<Stack.Screen name="PresentScreen" component={PresentScreen}/> 
<Stack.Screen name="WorkFromHomeScreen" component={WorkFromHomeScreen}/> 
<Stack.Screen name="InOfficeScreen" component={InOfficeScreen}/> 
<Stack.Screen name="AbsentScreen" component={AbsentScreen}/> 
<Stack.Screen name="CompletedDayScreen" component={CompletedDayScreen}/> 
<Stack.Screen name="LoginScreen" component={LoginScreen}/> 
<Stack.Screen name="LoginOtpScreen" component={LoginOtpScreen}/> 
<Stack.Screen name="VisitsScreen" component={VisitsScreen}/> 
<Stack.Screen name="DashboardScreen" component={DashboardScreen}/> 
<Stack.Screen name="NewRetailer" component={NewRetailer}/> 
<Stack.Screen name="RetailerList" component={RetailerList}/> 
<Stack.Screen name="RetailerInfoScreen" component={RetailerInfoScreen}/> 
<Stack.Screen name="DealerInfoScreen" component={DealerInfoScreen}/> 
<Stack.Screen name="OrdersListScreen" component={OrdersListScreen}/> 
<Stack.Screen name="OrderInfoScreen" component={OrderInfoScreen}/> 
<Stack.Screen name="RetailerOrdersListScreen" component={RetailerOrdersListScreen}/> 
<Stack.Screen name="DealerInvoiceListScreen" component={DealerInvoiceListScreen}/> 
<Stack.Screen name="DealerOrdersListScreen" component={DealerOrdersListScreen}/> 
<Stack.Screen name="DealerOutstandingListScreen" component={DealerOutstandingListScreen}/> 
<Stack.Screen name="EventParticipantListScreen" component={EventParticipantListScreen}/> 
<Stack.Screen name="AddParticipantScreen" component={AddParticipantScreen}/> 
<Stack.Screen name="UpdateRetailer" component={UpdateRetailer}/> 
<Stack.Screen name="AddPlannedVisitsScreen" component={AddPlannedVisitsScreen}/> 
<Stack.Screen name="SelectedPlannedVisitsScreen" component={SelectedPlannedVisitsScreen}/> 
<Stack.Screen name="UnplannedOptionsScreen" component={UnplannedOptionsScreen}/> 
<Stack.Screen name="RetailerResultListScreen" component={RetailerResultListScreen}/> 
<Stack.Screen name="StartVisitForm" component={StartVisitForm}/> 
<Stack.Screen name="SearchByAreaScreen" component={SearchByAreaScreen}/> 
<Stack.Screen name="SearchByLocationScreen" component={SearchByLocationScreen}/> 
<Stack.Screen name="VisitBookOrder" component={VisitBookOrder}/> 
<Stack.Screen name="VisitOrderCart" component={VisitOrderCart}/> 
<Stack.Screen name="VisitRetailerInfo" component={VisitRetailerInfo}/> 
<Stack.Screen name="VisitInfoScreen" component={VisitInfoScreen}/> 
<Stack.Screen name="VisitHistory" component={VisitHistory}/> 
<Stack.Screen name="VisitHistoryDetails" component={VisitHistoryDetails}/> 
<Stack.Screen name="EventList" component={EventList}/> 
<Stack.Screen name="NewEvent" component={NewEvent}/> 
<Stack.Screen name="EventInfoScreen" component={EventInfoScreen}/> 
<Stack.Screen name="UpdateEvent" component={UpdateEvent}/> 
<Stack.Screen name="InfluencersListScreen" component={InfluencersListScreen}/> 
<Stack.Screen name="InfluencerInfoScreen" component={InfluencerInfoScreen}/> 
<Stack.Screen name="ProfileScreen" component={ProfileScreen}/> 
<Stack.Screen name="ParticipantsScreen" component={ParticipantsScreen}/> 
<Stack.Screen name="SiteListScreen" component={SiteListScreen}/> 
<Stack.Screen name="NewInfluencers" component={NewInfluencers}/> 
<Stack.Screen name="UpdateInfluencer" component={UpdateInfluencer}/> 
<Stack.Screen name="NewSites" component={NewSites}/> 
<Stack.Screen name="UpdateSite" component={UpdateSite}/> 
<Stack.Screen name="SitesList" component={SitesList}/> 
<Stack.Screen name="SitesInfoScreen" component={SitesInfoScreen}/> 
<Stack.Screen name="NewSiteProduct" component={NewSiteProduct}/> 
<Stack.Screen name="UpdateSiteProduct" component={UpdateSiteProduct}/> 
<Stack.Screen name="SiteProductListScreen" component={SiteProductListScreen}/> 
<Stack.Screen name="SiteProductInfoScreen" component={SiteProductInfoScreen}/> 
<Stack.Screen name="InvoiceInfoScreen" component={InvoiceInfoScreen}/> 
<Stack.Screen name="InfluencerSiteList" component={InfluencerSiteList}/> 
<Stack.Screen name="DealerOrderInfoScreen" component={DealerOrderInfoScreen}/> 
<Stack.Screen name="LocalExpenseListScreen" component={LocalExpenseListScreen}/> 
<Stack.Screen name="UpdateLocalExpenseScreen" component={UpdateLocalExpenseScreen}/> 
<Stack.Screen name="LocalAttachmentScreen" component={LocalAttachmentScreen}/> 
<Stack.Screen name="LocalExpenseTabScreen" component={LocalExpenseTabScreen}/> 
<Stack.Screen name="TeamExpenseListScreen" component={TeamExpenseListScreen}/> 
<Stack.Screen name="TourTabScreen" component={TourTabScreen}/> 
<Stack.Screen name="TourInfoScreen" component={TourInfoScreen}/> 
<Stack.Screen name="NewTourScreen" component={NewTourScreen}/> 
<Stack.Screen name="UpdateTourScreen" component={UpdateTourScreen}/> 
<Stack.Screen name="TourAttachmentScreen" component={TourAttachmentScreen}/> 
<Stack.Screen name="OutstationExpenseTabScreen" component={OutstationExpenseTabScreen}/> 
<Stack.Screen name="OutstationExpenseListScreen" component={OutstationExpenseListScreen}/> 
<Stack.Screen name="OutstationAttachmentScreen" component={OutstationAttachmentScreen}/> 
<Stack.Screen name="AddTravelScreen" component={AddTravelScreen}/> 
<Stack.Screen name="TravelListScreen" component={TravelListScreen}/> 
<Stack.Screen name="TravelUpdateScreen" component={TravelUpdateScreen}/> 
<Stack.Screen name="ConvenienceListScreen" component={ConvenienceListScreen}/> 
<Stack.Screen name="ConvenienceUpdateScreen" component={ConvenienceUpdateScreen}/> 
<Stack.Screen name="AddConvenienceScreen" component={AddConvenienceScreen}/> 
<Stack.Screen name="AddHotelScreen" component={AddHotelScreen}/> 
<Stack.Screen name="HotelListScreen" component={HotelListScreen}/> 
<Stack.Screen name="UpdateHotelScreen" component={UpdateHotelScreen}/> 
<Stack.Screen name="AddOtherScreen" component={AddOtherScreen}/> 
<Stack.Screen name="OtherListScreen" component={OtherListScreen}/> 
<Stack.Screen name="UpdateOtherScreen" component={UpdateOtherScreen}/> 
<Stack.Screen name="AddIncidentalScreen" component={AddIncidentalScreen}/> 
<Stack.Screen name="IncidentalListScreen" component={IncidentalListScreen}/> 
<Stack.Screen name="UpdateIncidentalScreen" component={UpdateIncidentalScreen}/> 
<Stack.Screen name="AddFoodScreen" component={AddFoodScreen}/> 
<Stack.Screen name="FoodListScreen" component={FoodListScreen}/> 
<Stack.Screen name="UpdateFoodScreen" component={UpdateFoodScreen}/> 
<Stack.Screen name="LocalExpenseInfoScreen" component={LocalExpenseInfoScreen}/> 
<Stack.Screen name="TourApprovalScreen" component={TourApprovalScreen}/> 
<Stack.Screen name="SelectVisitScreen" component={SelectVisitScreen}/> 
<Stack.Screen name="LocalExpenseList" component={LocalExpenseList}/> 
<Stack.Screen name="ConvenienceListView" component={ConvenienceListView}/> 
<Stack.Screen name="HotelListView" component={HotelListView}/> 
<Stack.Screen name="IncidentalListView" component={IncidentalListView}/> 
<Stack.Screen name="FoodListView" component={FoodListView}/> 
<Stack.Screen name="TravelListView" component={TravelListView}/> 
<Stack.Screen name="LocalExpenseListView" component={LocalExpenseListView}/> 
<Stack.Screen name="OtherListView" component={OtherListView}/> 
<Stack.Screen name="TravelInfoScreen" component={TravelInfoScreen}/> 
<Stack.Screen name="ConvenienceInfoScreen" component={ConvenienceInfoScreen}/> 
<Stack.Screen name="HotelInfoScreen" component={HotelInfoScreen}/> 
<Stack.Screen name="FoodInfoScreen" component={FoodInfoScreen}/> 
<Stack.Screen name="IncidentalInfoScreen" component={IncidentalInfoScreen}/> 
<Stack.Screen name="LocalExpenseInfo" component={LocalExpenseInfo}/> 
<Stack.Screen name="OtherInfoScreen" component={OtherInfoScreen}/> 
<Stack.Screen name="TravelInfo" component={TravelInfo}/> 
<Stack.Screen name="HotelInfo" component={HotelInfo}/> 
<Stack.Screen name="FoodInfo" component={FoodInfo}/> 
<Stack.Screen name="IncidentalInfo" component={IncidentalInfo}/> 
<Stack.Screen name="OtherInfo" component={OtherInfo}/> 
<Stack.Screen name="LocalExpenseInfoView" component={LocalExpenseInfoView}/> 
<Stack.Screen name="TeamExpenseInfoScreen" component={TeamExpenseInfoScreen}/> 
<Stack.Screen name="ExpenseItemTabScreen" component={ExpenseItemTabScreen}/> 
<Stack.Screen name="UpdateLocalExpense" component={UpdateLocalExpense}/> 
<Stack.Screen name="VisitRetailerOutstanding" component={VisitRetailerOutstanding}/> 
<Stack.Screen name="OutstandingPaymentInfo" component={OutstandingPaymentInfo}/> 
<Stack.Screen name="DealerPaymentsListScreen" component={DealerPaymentsListScreen}/> 
<Stack.Screen name="SchemesListScreen" component={SchemesListScreen}/> 
<Stack.Screen name="OrderLevelSchemeInfoScreen" component={OrderLevelSchemeInfoScreen}/> 
<Stack.Screen name="ProductLevelSchemeInfoScreen" component={ProductLevelSchemeInfoScreen}/> 
<Stack.Screen name="ReOrderInfoScreen" component={ReOrderInfoScreen}/> 
<Stack.Screen name="MenuScreen" component={MenuScreen}/> 
<Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen}/> 
<Stack.Screen name="ComplaintsScreen" component={ComplaintsScreen}/> 
<Stack.Screen name="NewComplaintsScreen" component={NewComplaintsScreen}/> 
<Stack.Screen name="ComplaintListScreen" component={ComplaintListScreen}/> 
<Stack.Screen name="ResolvedListScreen" component={ResolvedListScreen}/> 
<Stack.Screen name="ComplaintsSecondScreen" component={ComplaintsSecondScreen}/> 
<Stack.Screen name="MyDetails" component={MyDetails}/> 

<Stack.Screen name="AddCompetitorForm" component={AddCompetitorForm}/> 
<Stack.Screen name="AddStockForm" component={AddStockForm}/> 
<Stack.Screen name="UpdateStockForm" component={UpdateStockForm}/> 
<Stack.Screen name="UpdateCompetitorForm" component={UpdateCompetitorForm}/> 

<Stack.Screen name="Bookorder" component={Bookorder}/> 
<Stack.Screen name="Addtocart" component={Addtocart}/> 
<Stack.Screen name="DailyReport" component={DailyReport}/> 
<Stack.Screen name="NewDsrScreen" component={NewDsrScreen}/> 
<Stack.Screen name="DsrListScreen" component={DsrListScreen}/> 
<Stack.Screen name="VisitBookOrderHeader" component={VisitBookOrderHeader}/> 
<Stack.Screen name="SurveyListScreen" component={SurveyListScreen}/> 
<Stack.Screen name="SurveyFormScreen" component={SurveyFormScreen}/> 

<Stack.Screen name="ExpenseMenuTabScreen" component={ExpenseMenuTabScreen}/> 
<Stack.Screen name="MyExpenseDateWise" component={MyExpenseDateWise}/> 
<Stack.Screen name="EditIconScreen" component={EditIconScreen}/> 
<Stack.Screen name="MyExpenseUpload" component={MyExpenseUpload}/> 
<Stack.Screen name="DatewiseListScreen" component={DatewiseListScreen}/> 
<Stack.Screen name="ProductCategoryScreen" component={ProductCategoryScreen}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;



// const StackNavigator = createStackNavigator(
//   {
//     SplashScreen,
//     CreditLimit,
//     EventListScreen,
//     StartDayScreen,
//     Selectproduct,
//     Selectbrand,
//     Selectgsm,
//     StartDaySelectionScreen,
//     EndDayScreen,
//     PresentScreen,
//     WorkFromHomeScreen,
//     InOfficeScreen,
//     AbsentScreen,
//     CompletedDayScreen,
//     LoginScreen,
//     LoginOtpScreen,
//     VisitsScreen,
//     DashboardScreen,
//     NewRetailer,
//     RetailerList,
//     RetailerInfoScreen,
//     DealerInfoScreen,
//     OrdersListScreen,
//     OrderInfoScreen,
//     RetailerOrdersListScreen,
//     DealerInvoiceListScreen,
//     DealerOrdersListScreen,
//     DealerOutstandingListScreen,
//     EventParticipantListScreen,
//     AddParticipantScreen,
//     UpdateRetailer,
//     AddPlannedVisitsScreen,
//     SelectedPlannedVisitsScreen,
//     UnplannedOptionsScreen,
//     RetailerResultListScreen,
//     StartVisitForm,
//     SearchByAreaScreen,
//     SearchByLocationScreen,
//     VisitBookOrder,
//     VisitOrderCart,
//     VisitRetailerInfo,
//     VisitInfoScreen,
//     VisitHistory,
//     VisitHistoryDetails,
//     EventList,
//     NewEvent,
//     EventInfoScreen,
//     UpdateEvent,
//     InfluencersListScreen,
//     InfluencerInfoScreen,
//     ProfileScreen,
//     ParticipantsScreen,
//     SiteListScreen,
//     NewInfluencers,
//     UpdateInfluencer,
//     NewSites,
//     UpdateSite,
//     SitesList,
//     SitesInfoScreen,
//     NewSiteProduct,
//     UpdateSiteProduct,
//     SiteProductListScreen,
//     SiteProductInfoScreen,
//     InvoiceInfoScreen,
//     InfluencerSiteList,
//     DealerOrderInfoScreen,
//     LocalExpenseListScreen,
//     UpdateLocalExpenseScreen,
//     LocalAttachmentScreen,
//     LocalExpenseTabScreen,
//     TeamExpenseListScreen,
//     TourTabScreen,
//     TourInfoScreen,
//     NewTourScreen,
//     UpdateTourScreen,
//     TourAttachmentScreen,
//     OutstationExpenseTabScreen,
//     OutstationExpenseListScreen,
//     OutstationAttachmentScreen,
//     AddTravelScreen,
//     TravelListScreen,
//     TravelUpdateScreen,
//     ConvenienceListScreen,
//     ConvenienceUpdateScreen,
//     AddConvenienceScreen,
//     AddHotelScreen,
//     HotelListScreen,
//     UpdateHotelScreen,
//     AddOtherScreen,
//     OtherListScreen,
//     UpdateOtherScreen,
//     AddIncidentalScreen,
//     IncidentalListScreen,
//     UpdateIncidentalScreen,
//     AddFoodScreen,
//     FoodListScreen,
//     UpdateFoodScreen,
//     LocalExpenseInfoScreen,
//     TourApprovalScreen,
//     SelectVisitScreen,
//     LocalExpenseList,
//     ConvenienceListView,
//     HotelListView,
//     IncidentalListView,
//     FoodListView,
//     TravelListView,
//     LocalExpenseListView,
//     OtherListView,
//     TravelInfoScreen,
//     ConvenienceInfoScreen,
//     HotelInfoScreen,
//     FoodInfoScreen,
//     IncidentalInfoScreen,
//     LocalExpenseInfo,
//     OtherInfoScreen,
//     TravelInfo,
//     HotelInfo,
//     FoodInfo,
//     IncidentalInfo,
//     OtherInfo,
//     LocalExpenseInfoView,
//     TeamExpenseInfoScreen,
//     ExpenseItemTabScreen,
//     UpdateLocalExpense,
//     VisitRetailerOutstanding,
//     OutstandingPaymentInfo,
//     DealerPaymentsListScreen,
//     SchemesListScreen,
//     OrderLevelSchemeInfoScreen,
//     ProductLevelSchemeInfoScreen,
//     ReOrderInfoScreen,
//     MenuScreen,
//     MenuDetailScreen,
//     ComplaintsScreen,
//     NewComplaintsScreen,
//     ComplaintListScreen,
//     ResolvedListScreen,
//     ComplaintsSecondScreen,
//     MyDetails,

//     AddCompetitorForm,
//     AddStockForm,
//     UpdateStockForm,
//     UpdateCompetitorForm,

//     Bookorder,
//     Addtocart,
//     DailyReport,
//     NewDsrScreen,
//     DsrListScreen,
//     VisitBookOrderHeader,
//     SurveyListScreen,
//     SurveyFormScreen,

//     ExpenseMenuTabScreen,
//     MyExpenseDateWise,
//     EditIconScreen,
//     MyExpenseUpload,
//     DatewiseListScreen,
//     ProductCategoryScreen
//   },
//   {
//     // By default the application will show the splash screen
//     initialRouteName: 'SplashScreen',
//     headerMode: 'none',
//     transitionConfig: () => ({
//       transitionSpec: {
//         duration: 300,
//         easing: Easing.out(Easing.poly(4)),
//         timing: Animated.timing,
//         useNativeDriver: true
//       },
//       screenInterpolator: sceneProps => {
//                 const {layout, position, scene} = sceneProps;
//                 const {index} = scene;

//                 const width = layout.initWidth;
//                 const translateX = position.interpolate({
//                     inputRange: [index - 1, index, index + 1],
//                     outputRange: [width, 0, 0],
//                 });

//                 const opacity = position.interpolate({
//                     inputRange: [index - 1, index - 0.99, index],
//                     outputRange: [0, 1, 1],
//                 });

//                 return {opacity, transform: [{translateX: translateX}]};
//             },
//     })
//   }
// )

// export default createAppContainer(StackNavigator)