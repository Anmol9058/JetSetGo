import axios from 'axios';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';
import { HelperService } from '../../Services/Utils/HelperService';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});

const in200s = isWithin(200, 299)

const visitsApiClient = axios.create({
	baseURL: Config.API_URL,
	timeout: 30000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});


function fetchVisits(params) {
	
	let url = Config.VISITS_SERVICE.GET_VISITS;
	url += `?team__c=${params.agentid}`
	// url +=`&date=${params.startDate}`;
	url += `&from_date=${params.startDate}`;
	url += `&to_date=${params.endDate}`;
	//url += `&queryType=${'self'}`;
	
	return visitsApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			// console.log(response)
			let responseData = response['data']['visits'];
			return responseData ;
		}
		return null
	}).catch(error => {
		console.log(error.response)
		return null
	});
}

function planVisit(params) {
		// console.log("planvisit",params);
	params.payload.map((obj)=>
	{
		if(obj.visit_type__c=="Planned")
{
	HelperService.removeField(obj, 'local_id');
	HelperService.removeField(obj, 'name');
}

	}
	)


	let url = Config.VISITS_SERVICE.PLAN_VISIT;

	
	return visitsApiClient.post(url, params.payload, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		
		if (in200s(response.status)) {
			return response['data']
		}
		return null
	}).catch(error => {
	
		return null
	});
}

function cancelVisit(params) {
	let url = Config.VISITS_SERVICE.CANCEL_VISIT;
	url += `?pg_id__c=${params.visit_id}`;
	
	
	return visitsApiClient.post(url, params, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']
		}
		return null
	}).catch(error => {
		
		return null
	});
}


function editVisit(params) {
	let url = Config.VISITS_SERVICE.EDIT_VISIT;
	url += `?pg_id__c=${params.visit_id}`;
	//url += `&team__c=${params.team__c}`;
	url += `&date=${params.visit_date__c}`;
	//let requestParams = _.cloneDeep(params);
//	requestParams.visit_date__c = String(requestParams.visit_date__c)

	return visitsApiClient.post(url, params,{
		headers: {
			//Authorization: 'Bearer'+params.token,
			token: params.token,

			//'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response.data
		}
		return null
	}).catch(error => {
		return null
	});
}

function placeOrder(params) {
	
	let url = Config.VISITS_SERVICE.PLACE_ORDER;
	url += `?from=${'SFA'}`;
	// console.log("ProductCartCard", url);
	// console.log("ProductCartCard", params);
	// console.log("ProductCartCard", params.items);
	return visitsApiClient.post(url, params.payload, {
		headers: {
			token: params.token,
			//agentid: params.agentid,
			//'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']['orderData'][0]
		}
		return null
	}).catch(error => {

		return null
	});
}

function addVisitInfo(params) {
	let url = Config.VISITS_SERVICE.ADD_VISIT_INFO;

// console.log("httpscom", url);
// console.log("httpscom", params);
	
	return visitsApiClient.post(url, params.payload, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']
		}
		return null
	}).catch(error => {
		return null
	});
}


function startVisit(params) {
	// console.log(params,"startvisiiiiiiit");
	let url = Config.VISITS_SERVICE.START_VISIT;
	url += `?`;
	url += params.visit_id ? `pg_id__c=${params.visit_id}` : '';
	url += params.agentid ? `&team__c=${params.agentid }` : '';
	if (!params.visit_id) {
		return null
	}

	return visitsApiClient.post(url, params.payload, {
		headers: {
			
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			console.log(response)
			return response['data']
		}
		return null
	}).catch(error => {
		console.log(error.response)
		HelperService.showToast({
			message:  'Error! '+ error.response.data.message,
			duration: 3000,
			buttonText: 'Okay'
		});
		return null
	});
}


function endVisit(params) {
	let url = Config.VISITS_SERVICE.END_VISIT;
	url += `?`;
	url += params.visit_id ? `pg_id__c=${params.visit_id}` : '';
	url += params.agentid ? `&team__c=${params.agentid }` : '';

	// console.log("END++VISIT", url);
	// console.log("END++VISIT", params);
	// console.log("END++VISIT", params.payload);

	if (!params.visit_id) {
		return null
	}
	return visitsApiClient.post(url, params.payload, {
		headers: {
			
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']
		}
		return null
	}).catch(error => {
		return null
	});
}


function fetchVisitInfo(params) {
	let url = Config.VISITS_SERVICE.FETCH_VISIT_INFO;
	url += `?`;
	url += params.visit_id ? `id=${params.visit_id}` : '';
	
	// console.log("fetchVisitInfo=====", url);

	return visitsApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']['data']
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchVisitImage(params) {
	let url = Config.VISITS_SERVICE.FETCH_VISIT_IMAGE;
	url += `?`;
	url += params.id ? `id=${params.id}` : '';
	if (!params.id) {
		return null
	}

	return visitsApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['files']
		}
		return null
	}).catch(error => {
		return null
	});
}

function submitCompetitorForm(params) {
	let url = Config.VISITS_SERVICE.SUBMIT_COMPETITOR;
	url += `?visit__c=${params.visit__c}`
	return visitsApiClient.post(url,  params.form, {
		headers: {
			
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function submitStockForm(params) {
	let url = Config.VISITS_SERVICE.SUBMIT_STOCK;
	url += `?visit__c=${params.visit__c}`
	return visitsApiClient.post(url,  params.form, {
		headers: {
			
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function submitUpdateStockForm(params) {
	let url = Config.VISITS_SERVICE.UPDATE_STOCK;
	url += `?pg_id__c=${params.id}`
	return visitsApiClient.post(url,  params.form, {
		headers: {
			
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function submitUpdateCompetitorForm(params) {
	let url = Config.VISITS_SERVICE.UPDATE_COMPETITOR;
	url += `?pg_id__c=${params.id}`
	return visitsApiClient.post(url,  params.form, {
		headers: {
			
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function getCompetitor(params) {
	
	let url = Config.VISITS_SERVICE.GET_COMPETITOR;
	url += `?visits__c=${params.visit_id}`
	
	if (!params.visit_id) {
		return null
	}


	return visitsApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			//console.log(response)
			let responseData = response['data']['visit_info_competitors'];
			return responseData ;
		}
		return null
	}).catch(error => {
		//console.log(error.response)
		return null
	});
}

function getStock(params) {
	
	let url = Config.VISITS_SERVICE.GET_STOCK;
	url += `?visits__c=${params.visit_id}`
	
	if (!params.visit_id) {
		return null
	}

	return visitsApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
	
			let responseData = response['data']['visit_info_stock'];
			return responseData ;
		}
		return null
	}).catch(error => {
		return null
	});
}

function getParentAreas(params) {
	
	let url = Config.VISITS_SERVICE.GET_PARENT_AREAS;
	url += `?sfid=${params.sfid}`
	
	if (!params.sfid) {
		return null
	}

	return visitsApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {	
			let responseData = response['data']['parents'];
			return responseData ;
		}
		return null
	}).catch(error => {
		return null
	});
}

function getVisitHistory(params) {
	
	let url = Config.VISITS_SERVICE.VISIT_HISTORY;
     url += `?customer_name__c=${params.customer}`;
	 url += `&flsp__c=${params.flsp__c}`;
	
	return visitsApiClient.get(url, {
		headers: {
			token:params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			// console.log('success data',response['data'])
			return response['data']
		}
		// console.log('Failed')
		return null
	}).catch(error => {

		// console.log(error.response)
	
		return null
	});
}




export const visitsService = {
	fetchVisits,
	planVisit,
	cancelVisit,
	editVisit,
	placeOrder,
	addVisitInfo,
	endVisit,
	startVisit,
	fetchVisitInfo,
	fetchVisitImage,
	submitCompetitorForm,
	submitStockForm,
	getCompetitor,
	getStock,
	submitUpdateStockForm,
	submitUpdateCompetitorForm,
	getParentAreas,
	getVisitHistory,
}
