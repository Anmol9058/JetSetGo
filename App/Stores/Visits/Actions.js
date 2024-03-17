import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({
	fetchVisitsStorageList: ['payload'],
	fetchVisitsStorageListSuccess: ['payload'],
	fetchVisitsStorageListFailure: null,

	fetchVisitImage: ['payload'],
	fetchVisitImageLoading: null,
	fetchVisitImageSuccess: ['payload'],
	fetchVisitImageFailure: null,

	fetchHistory: ['payload'],
  fetchHistoryLoading: null,
  fetchHistorySuccess: ['payload'],
  fetchHistoryFailure: null,
  fetchHistoryLoadingStop:null,

	getVisitsDisplayList: ['payload'],
	fetchVisitsDisplayList: ['payload'],
	fetchVisitsDisplayListSuccess: ['payload'],
	fetchVisitsDisplayListFailure: null,
	fetchVisitsDisplayListLoading: null,
	fetchVisitsDisplayListLoadingStop: null,
	fetchFilteredVisitsDisplayListSuccess: ['payload'],



	changeSearchFilters: ['payload'],
	openVisitsAction: null,
	closeVisitsAction: null,


	doNothing: null,


	changeAddPlannedVisitsSearchFilters: ['payload'],
	changePlannedSelectedDate: ['payload'],
	changePlannedStartDate: ['payload'],
	changePlannedSelectedPSM: ['payload'],
	addVisitToPlan: ['payload'],
	removeVisitFromPlan: ['payload'],
	editSelectedVisits: ['payload'],
	submitSelectedPlannedVisits: ['payload'],
	submitSelectedUnplannedVisit: ['payload'],
	submitSelectedPlannedVisitsSuccess: ['payload'],
	submitSelectedPlannedVisitsFailure: null,
	submitSelectedPlannedVisitsLoading: null,
	submitSelectedPlannedVisitsLoadingStop: null,
	findNearMeLoading: null,
	findNearMeLoadingStop: null,
	setNearLocation: ['payload'],
	changeSearchByAreaFilters: ['payload'],
	addBulkVisitsToPlan: ['payload'],
	addBulkVisitsToPlanSuccess: ['payload'],
	removeBulkVisitsToPlan: ['payload'],
	removeBulkVisitsToPlanSuccess: ['payload'],



	cancelVisit: ['payload'],
	editVisit: ['payload'],
	editVisitSuccess: ['payload'],
	cancelVisitSuccess: ['payload'],
	editVisitFailure: null,
	cancelVisitFailure: null,
	cancelVisitLoading: null,
	editVisitLoading: null,
	cancelVisitLoadingStop: null,
	editVisitLoadingStop: null,
	updateVisitFormChange: ['payload'],
	editVisitValidationFailed: ['payload'],
	executeVisit: ['payload'],
	clearVisitExecution: null,
	clearImageData: null,



	addItemToCart: ['payload'],
	addItemToCartSuccess: ['payload'],
	removeItemFromCart: ['payload'],
	removeItemFromCartSuccess: ['payload'],
	editCartOrder: ['payload'],
	editCartOrderSuccess: ['payload'],
	clearCart: null,
	editCartValidationFailed:['payload'],
	placeOrder: ['payload'],
	placeOrderLoading: null,
	placeOrderLoadingStop: null,
	placeOrderSuccess: ['payload'],
	placeOrderFailure: ['payload'],


	changeVisitInfoForm: ['payload'],
	addVisitInfo: ['payload'],
	addVisitInfoSuccess: ['payload'],
	addVisitInfoFailure: null,
	addVisitInfoLoading: null,
	addVisitInfoLoadingStop: null,
	visitInfoValidationFailed: ['payload'],
	clearAddInfoForm: null,
	setVisitInfoForm: ['payload'],


	startVisit: ['payload'],
	startVisitSuccess: ['payload'],
	startVisitFailure: null,
	startVisitLoading: ['payload'],
	startVisitLoadingStop: null,


	endVisit: ['payload'],
	endVisitSuccess: ['payload'],
	endVisitFailure: null,
	endVisitLoading: ['payload'],
	endVisitLoadingStop: null,


	pressStartVisit: ['payload'],
	pressStartVisitSuccess: ['payload'],

	pressEndVisit: ['payload'],
	pressEndVisitSuccess: ['payload'],

	pressEditVisit: ['payload'],
	pressEditVisitSuccess: ['payload'],

	pressCancelVisit: ['payload'],
	pressCancelVisitSuccess: ['payload'],

	fetchVisitInfoLoading: null,
	fetchVisitInfoSuccess: ['payload'],
	fetchVisitInfoFailure: null,
	fetchVisitInfo: ['payload'],


	addVisitInfoEntity: ['payload'],
	removeVisitInfoEntity: ['payload'],
	editVisitInfoEntity: ['payload'],

	submitCompetitorForm: ['payload'],
    submitCompetitorFormSuccess: ['payload'],
    submitCompetitorFormFailure: null,
    submitCompetitorFormLoading: null,
    submitCompetitorFormLoadingStop: null,
	
	
	addCompetitorForm: ['payload'],
    removeCompetitorForm: ['payload'],
	changeCompetitorForm: ['payload'],
	CompetitorFormValidationFailed: ['payload'],

	submitStockForm: ['payload'],
    submitStockFormSuccess: ['payload'],
    submitStockFormFailure: null,
    submitStockFormLoading: null,
    submitStockFormLoadingStop: null,
	
	
	addStockForm: ['payload'],
    removeStockForm: ['payload'],
	changeStockForm: ['payload'],
	StockFormValidationFailed: ['payload'],

	getCompetitor: ['payload'],
	getCompetitorLoading: null,
	getCompetitorSuccess: ['payload'],
	getCompetitorFailure: null,


	getStock: ['payload'],
	getStockLoading: null,
	getStockSuccess: ['payload'],
	getStockFailure: null,

	changeUpdateStockForm: ['payload'],

	submitUpdateStockForm: ['payload'],
    submitUpdateStockFormSuccess: ['payload'],
    submitUpdateStockFormFailure: null,
    submitUpdateStockFormLoading: ['payload'],
	submitUpdateStockFormLoadingStop: null,
	
	changeUpdateCompetitorForm: ['payload'],

	submitUpdateCompetitorForm: ['payload'],
    submitUpdateCompetitorFormSuccess: ['payload'],
    submitUpdateCompetitorFormFailure: null,
    submitUpdateCompetitorFormLoading: ['payload'],
	submitUpdateCompetitorFormLoadingStop: null,
	

	getParentAreas: ['payload'],
	getParentAreasLoading: null,
	getParentAreasSuccess: ['payload'],
	getParentAreasFailure: null,


	changeOrderHeaderForm: ['payload'],
	orderHeaderFormValidationFailed: ['payload'],
	clearOrderHeaderForm: null,

	setQuantity: ['payload'],

	clearSetQuantity:null,

});

export const VisitsTypes = Types
export default Creators
