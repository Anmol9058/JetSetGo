import { createActions } from 'reduxsauce'

/**
 * We use reduxsauce's `createActions()` helper to easily create redux actions.
 *
 * Keys are action names and values are the list of parameters for the given action.
 *
 * Action names are turned to SNAKE_CASE into the `Types` variable. This can be used
 * to listen to actions:
 *
 * - to trigger reducers to update the state, for example in App/Stores/Example/Reducers.js
 * - to trigger sagas, for example in App/Sagas/index.js
 *
 * Actions can be dispatched:
 *
 * - in React components using `dispatch(...)`, for example in App/App.js
 * - in sagas using `yield put(...)`, for example in App/Sagas/ExampleSaga.js
 *
 * @see https://github.com/infinitered/reduxsauce#createactions
 */
const { Types, Creators } = createActions({
  screenChanged: ['screen'],
  connectionChanged: ['payload'],
  openModal: ['payload'],
  closeModal: null,
  disableModal: null,
  enableModal: null,

  doNothing: null,

  fetchAllAreaPjp: ['payload'],
  fetchAllAreaPjpLoading: [null],
  fetchAllPjpSuccess: ['areas'],
  fetchAllAreaPjpSuccess: ['areas'],
  fetchAllBeatPjpSuccess: ['areas'],
  fetchAllAreaPjpFailure: [null],
  fetchTodayAreaPjp:['payload'],
  

  fetchObjective:['payload'],
	fetchObjectiveLoading: [null],
	fetchObjectiveSuccess: ['areas'],
  fetchObjectiveFailure: [null],


  fetchState:['payload'],
	fetchStateLoading: [null],
	fetchStateSuccess: ['areas'],
  fetchStateFailure: [null],

  fetchCity:['payload'],
	fetchCityLoading: [null],
	fetchCitySuccess: ['areas'],
  fetchCityFailure: [null],

  fetchAllCity:['payload'],
	fetchAllCityLoading: [null],
	fetchAllCitySuccess: ['areas'],
  fetchAllCityFailure: [null],
  

  uploadImage: ['payload'],
  uploadImageLoading: null,
  uploadImageLoadingStop: null,
  uploadImageSuccess: ['payload'],
  uploadImageFailure: null,
  setUploadImageField: ['payload'],

  fetchBeat: ['payload'],
	fetchBeatLoading: [null],
	fetchBeatSuccess: ['payload'],
  fetchBeatFailure: [null],
  
  fetchRetailerArea: ['payload'],
	fetchRetailerAreaLoading: [null],
	fetchRetailerAreaSuccess: ['payload'],
  fetchRetailerAreaFailure: [null],

  fetchDealerType: ['payload'],
	fetchDealerTypeLoading: [null],
	fetchDealerTypeSuccess: ['payload'],
  fetchDealerTypeFailure: [null],

  fetchDistChannel: ['payload'],
	fetchDistChannelLoading: [null],
	fetchDistChannelSuccess: ['payload'],
  fetchDistChannelFailure: [null],

  fetchAllPlant: ['payload'],
	fetchAllPlantLoading: [null],
	fetchAllPlantSuccess: ['payload'],
  fetchAllPlantFailure: [null],
  fetchAllplantdata:['payload'],
  fetchIncoTerm:['payload'],
	fetchIncoTermLoading: [null],
	fetchIncoTermSuccess: ['payload'],
  fetchIncoTermFailure: [null],

  fetchAllRoute: ['payload'],
	fetchAllRouteLoading: [null],
	fetchAllRouteSuccess: ['payload'],
  fetchAllRouteFailure: [null],
  
  fetchAllInsurance: ['payload'],
	fetchAllInsuranceLoading: [null],
	fetchAllInsuranceSuccess: ['payload'],
  fetchAllInsuranceFailure: [null],

  getBillParty: ['payload'],
	getBillPartyLoading: [null],
	getBillPartySuccess: ['payload'],
  getBillPartyFailure: [null],

  fetchCurrentLocation: ['payload'],
  fetchCurrentLocationSuccess: ['payload'],
  fetchCurrentLocationFailure: ['payload'],
  fetchCurrentLocationLoading: null,
  fetchCurrentLocationLoadingStop: null,
  updateCurrentLocation: ['payload'],
  
  getPayment: ['payload'],
	getPaymentLoading: [null],
	getPaymentSuccess: ['payload'],
  getPaymentFailure: [null],

  getDivsion: ['payload'],
	getDivsionLoading: [null],
	getDivsionSuccess: ['payload'],
  getDivsionFailure: [null],

})

export const CommonTypes = Types
export default Creators
