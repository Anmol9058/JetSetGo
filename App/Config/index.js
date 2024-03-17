export const Config = {


	API_URL: 'https://jkpaper-uat.herokuapp.com/',
	// API_URL: 'https://jkpaper-sandbox.herokuapp.com/',
	// API_URL: 'https://jkpaper-production.herokuapp.com/',


	USER_SERVICE: {
		FETCH_AREAS_URL: 'area/getAll',
		START_DAY_URL: 'attendence/startDay',
		END_DAY_URL: 'attendence/endDay',
		LOGIN_URL: 'login/login',
		LOG_OUT :'login/logout',
		MARK_ABSENT_URL: 'agents/markAbsent',
		FETCH_AGENT_DETAILS: 'agents/detail',
		CHECK_ATTENDANCE: 'attendence/getAttendence',
		FETCH_ALL_PSM: 'party/getSubOrdinate',
		GET_APP_VERSION: 'version/getVersion',
		GET_TAX_DETAILS: 'product/getTaxDetails',
	},

	RETAILER_SERVICE:{
		CREATE: 'party/addRetailer',
		UPDATE: 'sellers/update',
		EDIT_RETAILER:'party/editRetailer',
		FETCH_RETAILERS: 'party/getParties',
		FETCH_DEALERS: 'sellers/getAll',
		SUBMIT_PAYMENT: 'payments/makePayment',
		FETCH_ORDERS: 'order/partyOrder',
		DELETE_ORDER_LINE:'order/deleteOrderLine',
		EDIT_ORDER_LINE:'order/editOrderLine',
		ADD_ORDER_LINE:'order/addOrderLine',
		UPDATE_LOCATION: 'party/updateLocationParty',
		FETCH_COMPETITORS: 'competitor/getCompetitor',
		SEARCH_BY_LOCATION: 'sellers/searchByLocation',
		
		FETCH_DEALER_ORDERS: 'order/partyOrder',
		
		FETCH_DEALER_INVOICE: 'invoices/getAll',
		FETCH_DEALER_OUTSTANDING: 'outstandings/getAll',
		FETCH_DEALER_PAYMENTS: 'payments/getAll',
		INVOICE_DETAIL: 'invoice-line-items/getAll?offset=0&limit=1000',
		DEALER_ORDER_DETAILS: 'dealer-order-line-items/getAll',

		FETCH_COMPLAINT_TYPE:'complaints/getAllComplaintType',
		FETCH_SUB_COMPLAINT_TYPE:'complaints/getComplaintSubType',
		FETCH_ORDER_COMPLAINT:'order/partyOrder',
		FETCH_INVOICE_COMPLAINT:'invoice/orderInvoice',
		FETCH_COMPLAINTS:'complaints/getComplaint',
		
		CREATE_COMPLAINT: 'complaints/createComplaint',
		
		FETCH_CREDIT_LIMIT:'division/getCreditLimit',
		
		
		CREATE_COMPETITOR: 'competitor/createCompetitor',
		GET_DSR:'dsr/getDSR',
		GET_DSR_AREA_L4:'dsr/getLevel4Area',
		CREATE_DSR:'dsr/createtDSR',
		ADD_DSR_AREA:'dsr/addAreaDSR',
		GET_DSR_AREA: 'dsr/getDSRArea',

		GET_RETAILER_TARGET:'dashboard/targetMonthWise',

	},


	ORDERS_SERVICE: {
		DETAIL: 'order/detail',
		FETCH_ORDERS: 'orders/getAll',
		DEALER_ORDER_DETAIL: 'order/detail',
		REPEAT_ORDER: '/orders/repeatOrder'
	},


	VISITS_SERVICE: {
		GET_VISITS: 'visit/getAllVisit',
		PLAN_VISIT: 'visit/createVisit',
		CANCEL_VISIT: 'visit/cancelVisit',
		EDIT_VISIT: 'visit/updateVisit',
		PLACE_ORDER: 'order/placeOrder',
		ADD_VISIT_INFO: 'visitInfo/addRemark',
		START_VISIT: 'visit/startVisit',
		END_VISIT: 'visit/endVisit',
		FETCH_VISIT_INFO: 'visitInfo/getAttachment',
		FETCH_VISIT_IMAGE: '/files/getVisitFiles',
		SUBMIT_COMPETITOR:'visitInfo/addCompetitor',
		SUBMIT_STOCK: 'visitInfo/addStock',
		GET_COMPETITOR:'visitInfo/getCompetitor',
		GET_STOCK:'visitInfo/getStock',
		UPDATE_STOCK: 'visitInfo/editStock',
		UPDATE_COMPETITOR:'visitInfo/editCompetitor',
		GET_PARENT_AREAS:'area/getParentAreas',
		VISIT_HISTORY:'visit/getVisitHistory'
	},


	PRODUCT_SERVICE: {
		GET_PRODUCT_BRAND: 'product/getBrand',
		GET_CATEGORIES: 'product/getProductFamilyAndName',
		GET_PRODUCT_GSM: 'product/getGSM',
		GET_PRODUCT_ITEM: 'product/getItem',
		GET_PRODUCT_ITEM_PRICE: 'product/getPrice',
		GET_SUBSUBCATEGORIES: '/productCategories/getAllSubSubCategory',
		GET_SCHEMES: '/scheme/getSchemeMaster',
	},


	EVENT_SERVICE: {
		CREATE: 'events/add',
		UPDATE: 'events/edit',
		FETCH_EVENTS: 'events/getAll',
		FETCH_PARTICIPANTS: 'eventParticipants/getAll',
		ADD_PARTICIPANTS: 'eventParticipants/add'
	},

	DASHBOARD_SERVICE: {
		ORDER_VALUE: '/dashboard/getOrderValue',
		COUNTERS: '/dashboard/getCounters',
		SITE_COUNT: '/dashboard/getSiteCount',
		VISIT_COUNT: '/dashboard/getVisitCount',
		EVENTS_COUNT: '/dashboard/getEventCount',
		DASHBOARD_DETAILS:'dashboard/getDashboardDetails',
		DASHBOARD_TARGET:'dashboard/targetDealer',
	},


	INFLUENCERS_SERVICE: {
		FETCH_INFLUENCERS: 'influencers/getAll',
		CREATE: 'influencers/add',
		UPDATE: 'influencers/edit',
		FETCH_INFLUENCER_DETAIL: 'influencers/detail',
		FETCH_INFLUENCER_SITES: 'sites/getAll'
	},


	SITES_SERVICE: {
		CREATE: 'sites/add',
		UPDATE: 'sites/edit',
		CREATE_SITE_PRODUCT: 'siteProducts/add',
		UPDATE_SITE_PRODUCT: 'siteProducts/edit',
		FETCH_SITES: 'sites/getAll',
		FETCH_SITE_PRODUCTS: 'siteProducts/getAll'
	},

	EXPENSE_SERVICE: {
		FETCH_LOCAL_ITEM: 'expense-item/getAllLocalExpenseItem',
		FETCH_OUTSTATION_ITEM: 'expense-item/getAllOutstationExpenseItem',
		MOVE_LOCAL_TO_OUTSTATION: 'expense-item/moveToOutstationExpense',
		MOVE_OUTSTATION_TO_LOCAL: 'expense-item/moveToLocalExpense'
	},
	

	LOCAL_EXPENSE_SERVICE: {
		FETCH_EXPENSES: 'expenses/getAll',
		FETCH_EXPENSE_ITEM: 'expense-item/getAll',
		UPDATE_EXPENSES: 'expense-item/updateExpense',
		SEND_APPROVAL: 'expenses/sendingForApproval',
		APPROVE_REJECT_EXPENSE: 'expenses/approveRejectExpence',
		ADD_REMARK: 'expense-item/addRemark',
		FETCH_LOCAL_IMAGE: 'files/getExpenseItemFiles',
		UPLOAD_LOCAL_IMAGE: 'files/addAttachment'
	},

	TOUR_SERVICE: {
		FETCH_CITIES: 'cities/getAll',
		CREATE_TOUR: 'tours/create',
		UPDATE_TOUR: 'tours/updateTour',
		SEND_APPROVAL: 'tours/sendingForApproval',
		FETCH_TOUR: 'tours/getAll',
		APPROVE_REJECT_TOUR: 'tours/approveRejectTour'
	},

	OUTSTATION_EXPENSE_SERVICE: {
		FETCH_EXPENSES: 'expenses/getAll',
		FETCH_EXPENSE_ITEM: 'expense-item/getAll',
		UPDATE_EXPENSES: 'expense-item/addExpenseItem',
		UPDATE_EXPENSE_ITEM: 'expense-item/updateExpenseItem',
		UPDATE_LOCAL_EXPENSE: 'expense-item/updateExpense',
		SEND_APPROVAL: 'expenses/sendingForApproval',
		APPROVE_REJECT_EXPENSE: 'expenses/approveRejectExpence',
		ADD_REMARK: 'expense-item/addRemark',
		APPROVED_TOUR: 'expense-item/expenseItemByTour',
		VISITS_BY_TOUR: 'visits/visitbytours',
		ADD_EXPENSES: 'expenses/add',
		SUBMIT_EXPENSE_ITEM: 'expense-item/addExpenseItemNew',
		UPDATE_EXPENSE_STATUS: 'expense-item/moveToLocalExpense',
		UPDATE_EMAIL_STATUS: 'expenses/updateEmailStatus',
		ADD_EXPENSE_ITEM: 'expense-item/addExpenseItem',
		FETCH_EXPENSE_IMAGE: 'files/getExpenseItemFiles'
	},

	COMMON_SERVICE: {
		AREA_PJP:'area/getAreaPJP',
		GET_OBJECTIVE:'visit/getObjective',
		GET_STATE: 'state/getState',
		GET_CITY: 'city/getCity',
		GET_ALL_CITY: 'city/getAll',
		UPLOAD_IMAGE: 'image/upload',
		GET_BEAT:'beat/getBeat',
		GET_RETAILER_AREA:'area/getAreaRetailer',
		GET_DEALER_TYPE:'party/getDealerType',
		DIST_CHANNEL:'distChannel/getAll',
		GET_ALL_PLANT:'plant/getAll',
		GET_ALL_INCOTERM:'incoterm/getAll',
		GET_ALL_ROUTE:'route/getAll',
		GET_ALL_INSURANCE:'insurancetype/getAll',
		GET_BILL_PARTY:'party/billToParty',
		GET_PAYMENT :'paymentterm/getPaymentTerm',
		GET_DIVISION: 'division/getDivsion',

	},
	SURVEY_SERVICE:{
		GET_SURVEYS:'survey/getSurvey',
		SUBMIT_SURVEY:'survey/submit',



	},
	EXPENSES_SERVICE:{
		GET_MY_EXPENSES:'expense/myExpense',
		GET_MY_EXPENSE_LINES:'expense/getExpensesLines',
		UPDATE_TRAVEL_EXPENSE:'expense/UpdTvlExpenses'
	}
}