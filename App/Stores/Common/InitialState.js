export const INITIAL_STATE = {
	isNetworkBannerVisible: false,
	currentScreen: 'SplashScreen',
	absentReasons: ['Planned', 'Ad-hoc'],
	categoryRatingMapping: {
		'A': 5,
		'B': 4,
		'C': 3
	},
	recurringMapping: [
		{ id: 'Monday', name: 'Every Monday' },
		{ id: 'Tuesday', name: 'Every Tuesday' },
		{ id: 'Wednesday', name: 'Every Wednesday' },
		{ id: 'Thursday', name: 'Every Thursday' },
		{ id: 'Friday', name: 'Every Friday' },
		{ id: 'Saturday', name: 'Every Saturday' }
	],


	outerDaimeter: [
		{ id: '140', name: '140' },
		{ id: '45', name: '45' },
		{ id: '80', name: '80' },
		{ id: '90', name: '90' },
		{ id: '95', name: '95' },
		{ id: '100', name: '100'},
		{ id: '110', name: '110'},
		{ id: '115', name: '115'},
		{ id: '120', name: '120'},
		{ id: '150', name: '150'},
		{ id: '84', name: '84'},
		{ id: '85', name: '85'},
		{ id: '105', name: '105'},
		{ id: '999', name: '999'},
		{ id: '125', name: '125'},
		{ id: '102', name: '102'},
		{ id: '40', name: '40'},
		{ id: '160', name: '160'},
	],


	innerDaimeter: [
		{ id: '7.60', name: '7.60'},
		{ id: '15.20', name: '15.20'},
		{ id: '30.50', name: '30.50'},
		{ id: '30.40', name: '30.40'},
		
	],
	genericActionModal: {
		visible: false,
		content: [],
		heading: '',
		bodyFlexHeight: '',
		disable: false
	},


	agentAreaPjp: [],
	agentPjp: [],
	agentBeatPjp:[],
	fetchAllAreaPjpLoading: false,
	
	objectiveList: [],
	fetchObjectiveLoading: false,

	stateList: [],
	fetchStateLoading: false,

	cityList: [],
	fetchCityLoading: false,

	cityAllList: [],
	fetchAllCityLoading: false,

	uploadImageLoader: false,

	uploadImageField: '',

	currentLocation: {
        latitude:'',
        longitude: ''
	},
	fetchCurrentLocationLoader: false,
	
	agentBeat: [],
	dealerType:[],
	retailerArea:[],
    fetchBeatLoading: false,
	fetchBeatFailure: false,
	
	fetchRetailerAreaLoading: false,
	fetchDealerTypeLoading: false,

	agentDistChannel:[],
	searchDistChannel:[],
	agentAllPlant:[],
	searchAllPlant:[],
	agentIncoTerm:[],
	agentAllRoute:[],
	agentAllInsurance:[],
	getBillPartyList: [],
  

	fetchDistChannelLoading: false,
	fetchAllPlantLoading: false,
	fetchIncoTermLoading: false,
	fetchAllRouteLoading: false,
	fetchAllInsuranceLoading: false,
	getBillPartyLoading: false,

	plantdata:[],

	getPaymentList: [],
  getPaymentLoading: false,

  getDivsionList: [],
  getDivsionLoading: false
}
