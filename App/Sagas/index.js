import { networkSaga, offlineActionTypes } from 'react-native-offline';
import { all, fork, takeLatest } from 'redux-saga/effects';
import { CommonTypes } from '../Stores/Common/Actions';
import { DashboardTypes } from '../Stores/Dashboard/Actions';
import { EventTypes } from '../Stores/Events/Actions';
import { ExpenseTypes } from '../Stores/ExpenseItem/Actions';
import { ExpensesTypes } from "../Stores/Expenses/Actions";
import { InfluencersTypes } from '../Stores/Influencers/Actions';
import { LocalTypes } from '../Stores/LocalExpense/Actions';
import { OrdersTypes } from '../Stores/Orders/Actions';
import { OutstationTypes } from '../Stores/OutstationExpense/Actions';
import { ProductTypes } from '../Stores/Products/Actions';
import { RetailersTypes } from '../Stores/Retailers/Actions';
import { SitesTypes } from '../Stores/Sites/Actions';
import { StartupTypes } from '../Stores/Startup/Actions';
import { SurveysTypes } from "../Stores/Surveys/Actions";
import { TourTypes } from '../Stores/Tour/Actions';
import { UserTypes } from '../Stores/User/Actions';
import { VisitsTypes } from '../Stores/Visits/Actions';
import {
    getCounters,
    getDashboardSummary,
    getEventCount,
    getOrderValue,
    getSiteCount,
    getTargetTeam,
    getVisitCount,
} from './DashboardSaga';

import {
    addParticipants,
    fetchEvents,
    fetchParticipants,
    watchCreateEventRequest,
    watchUpdateEventRequest
} from './EventsSaga';

import {
    extractInfluencerInfoData,
    fetchInfluencerSites,
    fetchInfluencers,
    watchCreateInfluencerRequest,
    watchUpdateInfluencerRequest
} from './InfluencersSaga';

import {
    runQueue
} from './OfflineSaga';

import {
    fetchAllOrders,
    fetchDealerOrderDetails,
    fetchOrderDetails,
    repeatOrder
} from './OrdersSaga';

import {
    changeDealerDiscount,
    changeRemark,
    fetchProductBrand,
    fetchProductCategories,
    fetchProductGsm,
    fetchProductItem,
    fetchProductItemPrice,
    fetchProductSubSubCategories,
    fetchSchemes,
    makeCategoryDisplayList,
    makeSubCategoryDisplayList,
    makeSubSubCategoryDisplayList
} from './ProductSaga';

import {
    addOrderLine,
    createCompetitor,
    createDsrArea,
    deleteOrderLine,
    editOrderQuantity,
    extractRetailerInfoData,
    fetchComplaintType,
    fetchComplaints,
    fetchCreditLimit,
    fetchDealerInvoice,
    fetchDealerOrders,
    fetchDealerOutstanding,
    fetchDealerPayments,
    fetchDealers,
    fetchDsr,
    fetchDsrArea,
    fetchDsrAreaList,
    fetchInvoiceComplaint,
    fetchInvoiceDetail,
    fetchOrderComplaint,
    fetchRetailerCompetitors,
    fetchRetailerDealerSearchByLocation,
    fetchRetailerOrders,
    fetchRetailers,
    fetchSubComplaintType,
    getRetailerTarget,
    updateRetailerLocation,
    watchCreateComplaintRequest,
    watchCreateDsrRequest,
    watchCreateRetailerRequest,
    watchUpdateRetailerRequest,
    watchsubmitPaymentsForm,
} from './RetailersSaga';

import {
    fetchSiteProducts,
    fetchSites,
    watchCreateSiteProductRequest,
    watchCreateSiteRequest,
    watchUpdateSiteProductRequest,
    watchUpdateSiteRequest
} from './SitesSaga';

import {
    startup
} from './StartupSaga';

import {
    fetchLocalExpenseData,
    fetchLocalImage,
    fetchLocalItemExpenses,
    fetchTeamExpenses,
    fetchTeamItemExpenses,
    watchApproveRejectLocalRequest,
    watchSendForApprovalLocalExpenseRequest,
    watchUpdateExpenseRequest,
    watchUploadLocalImageRequest
} from './LocalExpenseSaga';


import {
    fetchLocalItem,
    fetchOutstationItem,
    moveLocalToOutstationExpense,
    moveOutstationToLocalExpense
} from './ExpenseItemSaga';

import {
    fetchApprovedTour,
    fetchConvenienceExpenses,
    fetchExpenseImage,
    fetchFoodExpenses,
    fetchHotelExpenses,
    fetchIncidentalExpenses,
    fetchLocalExpensesType,
    fetchMyOutstationExpenses,
    fetchMyOutstationItemExpenses,
    fetchOtherExpenses,
    fetchTeamOutstationExpenses,
    fetchTravelExpenses,
    submitExpenseItem,
    updateEmailStatus,
    updateLocalExpenseStatus,
    watchAddConvenienceExpenseRequest,
    watchAddExpenseRequest,
    watchAddFoodExpenseRequest,
    watchAddHotelExpenseRequest,
    watchAddIncidentalExpenseRequest,
    watchAddLocalExpenseRequest,
    watchAddOtherExpenseRequest,
    watchAddTravelExpenseRequest,
    watchApproveRejectOutstationRequest,
    watchSendForApprovalOutstationExpenseRequest,
    watchUpdateConvenienceExpenseRequest,
    watchUpdateFoodExpenseRequest,
    watchUpdateHotelExpenseRequest,
    watchUpdateIncidentalExpenseRequest,
    watchUpdateLocalExpenseRequest,
    watchUpdateOtherExpenseRequest,
    watchVisitExpenseItemRequest,
    watchVisitsByTourRequest
} from './OutstationSaga';

import {
    checkAttendance,
    endDay,
    fetchAgentAreas,
    fetchAgentDetails,
    fetchAllPsm,
    getTaxDetails,
    markAbsent,
    watchUserLoginRequest,
    watchUserLogoutRequest,
    watchUserStartDayRequest,
} from './UserSaga';

import {
    addBulkVisitsToPlan,
    addItemToCart,
    cancelVisit,
    editCartOrder,
    editVisit,
    endVisit,
    fetchHistory,
    fetchVisitImage,
    fetchVisitInfo,
    fetchVisitsDisplayList,
    fetchVisitsStorageList,
    getCompetitor,
    getParentAreas,
    getStock,
    getVisitsDisplayList,
    pressCancelVisit,
    pressEditVisit,
    pressEndVisit,
    pressStartVisit,
    removeBulkVisitsToPlan,
    removeItemFromCart,
    startVisit,
    submitSelectedPlannedVisits,
    submitSelectedUnplannedVisit,
    watchAddVisitInfo,
    watchCompetitorForm,
    watchPlaceOrder,
    watchStockForm,
    watchUpdateCompetitorForm,
    watchUpdateStockForm
} from './VisitsSaga';

import {
    fetchCities,
    fetchMyTour,
    fetchTeamTour,
    watchApproveRejectTourRequest,
    watchCreateTourRequest,
    watchSendForApprovalTourRequest,
    watchUpdateTourRequest
} from './TourSaga';

import {
    answerQuestion,
    getSurveys,
    gotoNextQuestion,
    gotoPreviousQuestion,
    startSurvey,
    submitSurvey
} from './SurveysSaga';

import {
    getMyExpenseLines,
    getMyExpenses,
    updateTravelExpense
} from './ExpensesSaga';



import {
    fetchAgentAreaPjp,
    fetchAllCity,
    fetchAllInsurance,
    fetchAllPlant,
    fetchAllRoute,
    fetchBeat,
    fetchCity,
    fetchCurrentLocation,
    fetchDealerType,
    fetchDistChannel,
    fetchIncoTerm,
    fetchObjective,
    fetchRetailerArea,
    fetchState,
    fetchTodayAreaPjp,
    getBillParty,
    getDivsion,
    getPayment,
    uploadImage,
} from './CommonSaga';



export default function* root() {
    yield all([
        fork(networkSaga, {
            pingInterval: 30000
        }),
        takeLatest(StartupTypes.STARTUP, startup),// Run the startup saga when the application starts
        takeLatest(offlineActionTypes.CONNECTION_CHANGE, runQueue),

        fork(watchUserLoginRequest),
        fork(watchUserStartDayRequest),
        fork(watchUserLogoutRequest),
        takeLatest(UserTypes.FETCH_ALL_AREAS, fetchAgentAreas),
        takeLatest(UserTypes.FETCH_AGENT_DETAILS, fetchAgentDetails),
        takeLatest(UserTypes.END_USER_DAY, endDay),
        takeLatest(UserTypes.MARK_USER_ABSENT, markAbsent),
        takeLatest(UserTypes.CHECK_ATTENDANCE, checkAttendance),
        takeLatest(UserTypes.FETCH_ALL_PSM, fetchAllPsm),
        takeLatest(UserTypes.GET_TAX_DETAILS,getTaxDetails),



       
        fork(watchCreateRetailerRequest),
        fork(watchCreateComplaintRequest),
        fork(watchUpdateRetailerRequest),
        fork(watchsubmitPaymentsForm),
        fork(watchCreateDsrRequest),
        takeLatest(RetailersTypes.FETCH_RETAILERS, fetchRetailers),
        takeLatest(RetailersTypes.FETCH_DEALERS, fetchDealers),
        takeLatest(RetailersTypes.FETCH_RETAILER_ORDERS, fetchRetailerOrders),
        takeLatest(RetailersTypes.UPDATE_RETAILER_LOCATION, updateRetailerLocation),
        takeLatest(RetailersTypes.FETCH_RETAILER_COMPETITORS, fetchRetailerCompetitors),
        takeLatest(RetailersTypes.FETCH_RETAILER_DEALER_SEARCH_BY_LOCATION, fetchRetailerDealerSearchByLocation),
        takeLatest(RetailersTypes.EXTRACT_RETAILER_INFO_DATA, extractRetailerInfoData),
        takeLatest(RetailersTypes.FETCH_INVOICE_DETAIL, fetchInvoiceDetail),
        takeLatest(RetailersTypes.FETCH_DEALER_ORDERS, fetchDealerOrders),
        takeLatest(RetailersTypes.FETCH_DEALER_INVOICE, fetchDealerInvoice),
        takeLatest(RetailersTypes.FETCH_DEALER_OUTSTANDING, fetchDealerOutstanding),
        takeLatest(RetailersTypes.FETCH_DEALER_PAYMENTS, fetchDealerPayments),
        takeLatest(RetailersTypes.CREATE_COMPETITOR, createCompetitor),
        takeLatest(RetailersTypes.FETCH_DSR, fetchDsr),
        takeLatest(RetailersTypes.FETCH_DSR_AREA, fetchDsrArea),
        takeLatest(RetailersTypes.FETCH_DSR_AREA_LIST, fetchDsrAreaList),
        takeLatest(RetailersTypes.CREATE_DSR_AREA, createDsrArea),
        
        takeLatest(RetailersTypes.FETCH_CREDIT_LIMIT, fetchCreditLimit), 
        takeLatest(RetailersTypes.DELETE_ORDER_LINE, deleteOrderLine), 
        takeLatest(RetailersTypes.EDIT_ORDER_QUANTITY, editOrderQuantity),
        takeLatest(RetailersTypes.ADD_ORDER_LINE, addOrderLine),
        takeLatest(RetailersTypes.FETCH_COMPLAINTS,fetchComplaints ),
        takeLatest(RetailersTypes.FETCH_COMPLAINT_TYPE,fetchComplaintType),
        takeLatest(RetailersTypes.FETCH_SUB_COMPLAINT_TYPE,fetchSubComplaintType),
        takeLatest(RetailersTypes.FETCH_ORDER_COMPLAINT,fetchOrderComplaint),
        takeLatest(RetailersTypes.FETCH_INVOICE_COMPLAINT,fetchInvoiceComplaint),
        takeLatest(RetailersTypes.GET_RETAILER_TARGET,getRetailerTarget),
        



        
        fork(watchCreateEventRequest),
        fork(watchUpdateEventRequest),
        takeLatest(EventTypes.FETCH_EVENTS, fetchEvents),
        takeLatest(EventTypes.FETCH_PARTICIPANTS, fetchParticipants),
        takeLatest(EventTypes.ADD_PARTICIPANTS, addParticipants),



        fork(watchCreateSiteRequest),
        fork(watchUpdateSiteRequest),
        fork(watchCreateSiteProductRequest),
        fork(watchUpdateSiteProductRequest),
        takeLatest(SitesTypes.FETCH_SITES, fetchSites),
        takeLatest(SitesTypes.FETCH_SITE_PRODUCTS, fetchSiteProducts),



        fork(watchCreateInfluencerRequest),
        fork(watchUpdateInfluencerRequest),
        takeLatest(InfluencersTypes.FETCH_INFLUENCERS, fetchInfluencers),
        takeLatest(InfluencersTypes.FETCH_INFLUENCER_SITES, fetchInfluencerSites),
        takeLatest(InfluencersTypes.EXTRACT_INFLUENCER_INFO_DATA, extractInfluencerInfoData),


        fork(watchUpdateExpenseRequest),
        fork(watchSendForApprovalLocalExpenseRequest),
        fork(watchApproveRejectLocalRequest),
        fork(watchUploadLocalImageRequest),
        takeLatest(LocalTypes.FETCH_LOCAL_EXPENSE_DATA, fetchLocalExpenseData),
        takeLatest(LocalTypes.FETCH_LOCAL_ITEM_EXPENSES, fetchLocalItemExpenses),
        takeLatest(LocalTypes.FETCH_TEAM_EXPENSES, fetchTeamExpenses),
        takeLatest(LocalTypes.FETCH_TEAM_ITEM_EXPENSES, fetchTeamItemExpenses),
        takeLatest(LocalTypes.FETCH_LOCAL_IMAGE, fetchLocalImage),


        takeLatest(ExpenseTypes.FETCH_OUTSTATION_ITEM, fetchOutstationItem),
        takeLatest(ExpenseTypes.FETCH_LOCAL_ITEM, fetchLocalItem),
        takeLatest(ExpenseTypes.MOVE_LOCAL_TO_OUTSTATION_EXPENSE, moveLocalToOutstationExpense),
        takeLatest(ExpenseTypes.MOVE_OUTSTATION_TO_LOCAL_EXPENSE, moveOutstationToLocalExpense),

      //  fork(watchUpdateTravelExpenseRequest),
        fork(watchUpdateConvenienceExpenseRequest),
        fork(watchUpdateFoodExpenseRequest),
        fork(watchUpdateIncidentalExpenseRequest),
        fork(watchUpdateOtherExpenseRequest),
        fork(watchUpdateLocalExpenseRequest),
        fork(watchUpdateHotelExpenseRequest),
        fork(watchAddTravelExpenseRequest),
        fork(watchAddConvenienceExpenseRequest),
        fork(watchAddFoodExpenseRequest),
        fork(watchAddExpenseRequest),
        fork(watchAddIncidentalExpenseRequest),
        fork(watchAddOtherExpenseRequest),
        fork(watchAddLocalExpenseRequest),
        fork(watchAddHotelExpenseRequest),
        fork(watchUpdateConvenienceExpenseRequest),
        fork(watchUpdateHotelExpenseRequest),
        fork(watchVisitsByTourRequest),
        fork(watchSendForApprovalOutstationExpenseRequest),
        fork(watchApproveRejectOutstationRequest),
        fork(watchVisitExpenseItemRequest),
        takeLatest(OutstationTypes.SUBMIT_EXPENSE_ITEM, submitExpenseItem),
        takeLatest(OutstationTypes.FETCH_MY_OUTSTATION_EXPENSES, fetchMyOutstationExpenses),
        takeLatest(OutstationTypes.FETCH_MY_OUTSTATION_ITEM_EXPENSES, fetchMyOutstationItemExpenses),
        takeLatest(OutstationTypes.FETCH_TEAM_OUTSTATION_EXPENSES, fetchTeamOutstationExpenses),
        takeLatest(OutstationTypes.FETCH_TRAVEL_EXPENSES, fetchTravelExpenses),
        takeLatest(OutstationTypes.FETCH_CONVENIENCE_EXPENSES, fetchConvenienceExpenses),
        takeLatest(OutstationTypes.FETCH_HOTEL_EXPENSES, fetchHotelExpenses),
        takeLatest(OutstationTypes.FETCH_FOOD_EXPENSES, fetchFoodExpenses),
        takeLatest(OutstationTypes.FETCH_INCIDENTAL_EXPENSES, fetchIncidentalExpenses),
        takeLatest(OutstationTypes.FETCH_OTHER_EXPENSES, fetchOtherExpenses),
        takeLatest(OutstationTypes.FETCH_LOCAL_EXPENSES, fetchLocalExpensesType),
        takeLatest(OutstationTypes.FETCH_APPROVED_TOUR, fetchApprovedTour),
        takeLatest(OutstationTypes.UPDATE_LOCAL_EXPENSE_STATUS, updateLocalExpenseStatus),
        takeLatest(OutstationTypes.UPDATE_EMAIL_STATUS, updateEmailStatus),
        takeLatest(OutstationTypes.FETCH_EXPENSE_IMAGE, fetchExpenseImage),


        fork(watchCreateTourRequest),
        fork(watchUpdateTourRequest),
        fork(watchApproveRejectTourRequest),
        fork(watchSendForApprovalTourRequest),
        takeLatest(TourTypes.FETCH_CITIES, fetchCities),
        takeLatest(TourTypes.FETCH_MY_TOUR, fetchMyTour),
        takeLatest(TourTypes.FETCH_TEAM_TOUR, fetchTeamTour),


        fork(watchPlaceOrder),
        fork(watchAddVisitInfo),
        fork(watchCompetitorForm),
        fork(watchStockForm),
        fork(watchUpdateStockForm),
        fork(watchUpdateCompetitorForm),
        takeLatest(VisitsTypes.FETCH_VISITS_STORAGE_LIST, fetchVisitsStorageList),
        takeLatest(VisitsTypes.FETCH_VISITS_DISPLAY_LIST, fetchVisitsDisplayList),
        takeLatest(VisitsTypes.GET_VISITS_DISPLAY_LIST, getVisitsDisplayList),
        takeLatest(VisitsTypes.SUBMIT_SELECTED_PLANNED_VISITS, submitSelectedPlannedVisits),
        takeLatest(VisitsTypes.SUBMIT_SELECTED_UNPLANNED_VISIT, submitSelectedUnplannedVisit),
        takeLatest(VisitsTypes.CANCEL_VISIT, cancelVisit),
        takeLatest(VisitsTypes.EDIT_VISIT, editVisit),
        takeLatest(VisitsTypes.ADD_ITEM_TO_CART, addItemToCart),
        takeLatest(VisitsTypes.REMOVE_ITEM_FROM_CART, removeItemFromCart),
        takeLatest(VisitsTypes.EDIT_CART_ORDER, editCartOrder),
        takeLatest(VisitsTypes.START_VISIT, startVisit),
        takeLatest(VisitsTypes.END_VISIT, endVisit),
        takeLatest(VisitsTypes.PRESS_START_VISIT, pressStartVisit),
        takeLatest(VisitsTypes.PRESS_END_VISIT, pressEndVisit),
        takeLatest(VisitsTypes.PRESS_EDIT_VISIT, pressEditVisit),
        takeLatest(VisitsTypes.PRESS_CANCEL_VISIT, pressCancelVisit),
        takeLatest(VisitsTypes.FETCH_VISIT_INFO, fetchVisitInfo),
        takeLatest(VisitsTypes.FETCH_VISIT_IMAGE, fetchVisitImage),
        takeLatest(VisitsTypes.GET_COMPETITOR, getCompetitor),
        takeLatest(VisitsTypes.GET_STOCK,  getStock),
        takeLatest(VisitsTypes.GET_PARENT_AREAS,   getParentAreas),
        takeLatest(VisitsTypes.ADD_BULK_VISITS_TO_PLAN ,addBulkVisitsToPlan),
        takeLatest(VisitsTypes.REMOVE_BULK_VISITS_TO_PLAN ,removeBulkVisitsToPlan),
        takeLatest(VisitsTypes.FETCH_HISTORY, fetchHistory),





        takeLatest(ProductTypes.FETCH_PRODUCTS_BRAND, fetchProductBrand),
        takeLatest(ProductTypes.FETCH_SCHEMES, fetchSchemes),
        takeLatest(ProductTypes.FETCH_PRODUCT_CATEGORIES, fetchProductCategories),
        //takeLatest(ProductTypes.FETCH_PRODUCT_CATEGORIES, fetchProductCategories),
        takeLatest(ProductTypes.FETCH_PRODUCT_GSM, fetchProductGsm),
        takeLatest(ProductTypes.FETCH_PRODUCT_SUB_SUB_CATEGORIES, fetchProductSubSubCategories),
        takeLatest(ProductTypes.MAKE_CATEGORY_DISPLAY_LIST, makeCategoryDisplayList),
        takeLatest(ProductTypes.MAKE_SUB_CATEGORY_DISPLAY_LIST, makeSubCategoryDisplayList),
        takeLatest(ProductTypes.MAKE_SUB_SUB_CATEGORY_DISPLAY_LIST, makeSubSubCategoryDisplayList),
        takeLatest(ProductTypes.FETCH_PRODUCT_ITEM,fetchProductItem),
        takeLatest(ProductTypes.FETCH_PRODUCT_ITEM_PRICE,fetchProductItemPrice),
        takeLatest(ProductTypes.CHANGE_DEALER_DISCOUNT, changeDealerDiscount),
        takeLatest(ProductTypes.CHANGE_REMARK, changeRemark),


        takeLatest(OrdersTypes.FETCH_ALL_ORDERS, fetchAllOrders),
        takeLatest(OrdersTypes.FETCH_ORDER_DETAILS, fetchOrderDetails),
        takeLatest(OrdersTypes.FETCH_DEALER_ORDER_DETAILS, fetchDealerOrderDetails),
        takeLatest(OrdersTypes.REPEAT_ORDER, repeatOrder),

        takeLatest(CommonTypes.FETCH_ALL_AREA_PJP, fetchAgentAreaPjp),
        takeLatest(CommonTypes.FETCH_OBJECTIVE, fetchObjective),
        takeLatest(CommonTypes.FETCH_STATE, fetchState),
        takeLatest(CommonTypes.FETCH_CITY, fetchCity),
        takeLatest(CommonTypes.UPLOAD_IMAGE, uploadImage),
        takeLatest(CommonTypes.FETCH_BEAT, fetchBeat),
        takeLatest(CommonTypes.FETCH_DIST_CHANNEL, fetchDistChannel),
        takeLatest(CommonTypes.FETCH_ALL_PLANT, fetchAllPlant),
        takeLatest(CommonTypes.FETCH_ALL_INSURANCE, fetchAllInsurance),
        takeLatest(CommonTypes.FETCH_ALL_ROUTE, fetchAllRoute),
        takeLatest(CommonTypes.FETCH_INCO_TERM, fetchIncoTerm),
        takeLatest(CommonTypes.FETCH_RETAILER_AREA, fetchRetailerArea),
        takeLatest(CommonTypes.FETCH_DEALER_TYPE, fetchDealerType),
        takeLatest(CommonTypes.FETCH_TODAY_AREA_PJP,fetchTodayAreaPjp),
        takeLatest(CommonTypes.GET_BILL_PARTY,getBillParty),
        takeLatest(CommonTypes.FETCH_ALL_CITY, fetchAllCity),
        takeLatest(CommonTypes.FETCH_CURRENT_LOCATION, fetchCurrentLocation), 
        takeLatest(CommonTypes.GET_PAYMENT, getPayment),
        takeLatest(CommonTypes.GET_DIVSION, getDivsion),

        takeLatest(DashboardTypes.GET_ORDER_VALUE, getOrderValue),
        takeLatest(DashboardTypes.GET_VISIT_COUNT, getVisitCount),
        takeLatest(DashboardTypes.GET_SITE_COUNT, getSiteCount),
        takeLatest(DashboardTypes.GET_COUNTERS, getCounters),
        takeLatest(DashboardTypes.GET_EVENT_COUNT, getEventCount),
        takeLatest(DashboardTypes.GET_DASHBOARD_SUMMARY, getDashboardSummary),
        takeLatest(DashboardTypes.GET_TARGET_TEAM, getTargetTeam),
       
        
        takeLatest(SurveysTypes.GET_SURVEYS, getSurveys),
        takeLatest(SurveysTypes.START_SURVEY,startSurvey ),
        takeLatest(SurveysTypes.GOTO_NEXT_QUESTION, gotoNextQuestion),
        takeLatest(SurveysTypes.GOTO_PREVIOUS_QUESTION, gotoPreviousQuestion),
        takeLatest(SurveysTypes.ANSWER_QUESTION, answerQuestion),
        takeLatest(SurveysTypes.SUBMIT_SURVEY, submitSurvey),

        //fork(watchUpdateTravelExpense),
        takeLatest(ExpensesTypes.GET_MY_EXPENSES, getMyExpenses),
        takeLatest(ExpensesTypes.GET_MY_EXPENSE_LINES, getMyExpenseLines),
        takeLatest(ExpensesTypes.UPDATE_TRAVEL_EXPENSE, updateTravelExpense),
    ]);
}
