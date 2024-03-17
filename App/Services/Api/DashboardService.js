import axios from 'axios';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});

const in200s = isWithin(200, 299)

const dashboardApiClient = axios.create({
	baseURL: Config.API_URL,
	timeout: 30000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});


function getDashboardSummary(params) {
	console.log("service",params);
	let id = params.agentid ? params.agentid : params.psm__c;
	let url = Config.DASHBOARD_SERVICE.DASHBOARD_DETAILS
	url += '?'
	url += `sfid=${id}`
	// url += `sfid=a081y000000eaYnAAI`
	if(params.data=="startday"){
		url += `&from_date=${params.startDate}`
		url += `&to_date=${params.endDate}`
	}else{
	url += `&date=${params.startDate}`
	}
	// url += `&date=${params.endDate}`

	// &from_date=1656613800000&to_date=1659119400000


	console.log('url = ', url);
	return dashboardApiClient
	  .get(url, {
		headers: {
			token:  params.token,
		}
	  })
	  .then((response) => {
		if (in200s(response.status)) {
		  return response['data']['data']
		}
		return null
	  })
	  .catch((error) => {
		return null
	  })
  }
  
function getOrderValue(params) {
	let url = Config.DASHBOARD_SERVICE.ORDER_VALUE;
	url += `?`;
	url += params.startDate ? `startDate=${params.startDate}` : '';
	url += params.endDate ? `&endDate=${params.endDate}` : '';
	url += params.psm__c ? `&psm__c=${params.psm__c}` : '';
	url += `&offset=0`;
	url += `&limit=1000`;

	return dashboardApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['counters'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function getCounters(params) {
	let url = Config.DASHBOARD_SERVICE.COUNTERS;
	url += `?`;
	url += params.startDate ? `startDate=${params.startDate}` : '';
	url += params.endDate ? `&endDate=${params.endDate}` : '';
	url += params.psm__c ? `&psm__c=${params.psm__c}` : '';
	url += `&offset=0`;
	url += `&limit=1000`;

	return dashboardApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['counters'];
		}
		return null
	}).catch(error => {
		console.log('API FAIL = ', error)
		return null
	});
}

function getSiteCount(params) {
	let url = Config.DASHBOARD_SERVICE.SITE_COUNT;
	url += `?`;
	url += params.startDate ? `startDate=${params.startDate}` : '';
	url += params.endDate ? `&endDate=${params.endDate}` : '';
	url += params.psm__c ? `&psm__c=${params.psm__c}` : '';
	url += `&offset=0`;
	url += `&limit=1000`;

	return dashboardApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['counters'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function getVisitCount(params) {
	let url = Config.DASHBOARD_SERVICE.VISIT_COUNT;
	url += `?`;
	url += params.startDate ? `startDate=${params.startDate}` : '';
	url += params.endDate ? `&endDate=${params.endDate}` : '';
	url += params.psm__c ? `&psm__c=${params.psm__c}` : '';
	url += `&offset=0`;
	url += `&limit=1000`;

	return dashboardApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['counters'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function getEventCount(params) {
	let url = Config.DASHBOARD_SERVICE.EVENTS_COUNT;
	url += `?`;
	url += params.startDate ? `startDate=${params.startDate}` : '';
	url += params.endDate ? `&endDate=${params.endDate}` : '';
	url += params.psm__c ? `&psm__c=${params.psm__c}` : '';
	url += `&offset=0`;
	url += `&limit=1000`;

	return dashboardApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['counters'];
		}
		return null
	}).catch(error => {
		return null
	});
}
// DASHBOARD_DETAILS
function getTargetTeam(params) {
	let url = Config.DASHBOARD_SERVICE.DASHBOARD_TARGET;
	url += `?dealer__c=${params.dealer__c}`;
	url += `&month__c=${params.Month__c}`;
	url += `&year__c=${params.Year__c}`;
	return dashboardApiClient
	  .get(url, {
		headers: {
			token:  params.token,
		}
	  })
	  .then((response) => {
		if (in200s(response.status)) {
		  return response['data']['data']
		}
		return null
	  })
	  .catch((error) => {
		return null
	  })
  }
  



export const dashboardService = {
	getOrderValue,
	getCounters,
	getSiteCount,
	getVisitCount,
	getEventCount,
	getDashboardSummary,
	getTargetTeam
}
