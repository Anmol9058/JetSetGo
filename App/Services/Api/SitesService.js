import axios from 'axios';
import _ from 'lodash';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';
import { HelperService } from '../../Services/Utils/HelperService';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const siteApiClient = axios.create({
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});


function createSite(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'local_id');
	return siteApiClient.post(Config.SITES_SERVICE.CREATE, formData, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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

function updateSite(params) {
	let url = Config.SITES_SERVICE.UPDATE;
	url += `?id=${params.id}`;
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'local_id');
	return siteApiClient.post(url, formData, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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

function createSiteProduct(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'local_id');
	formData = HelperService.removeField(formData, 'sfid__c');
	formData = HelperService.removeField(formData, 'sites__c');


	return siteApiClient.post(Config.SITES_SERVICE.CREATE_SITE_PRODUCT, formData, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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

function updateSiteProduct(params) {
	let url = Config.SITES_SERVICE.UPDATE_SITE_PRODUCT;
	url += `?id=${params.id}`;
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'createddate');
	formData = HelperService.removeField(formData, 'pg_id__c');
	formData = HelperService.removeField(formData, 'site_pg_id__c');
	formData = HelperService.removeField(formData, 'sites__c');

	return siteApiClient.post(url, formData, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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


function fetchSites(params) {
	let url = Config.SITES_SERVICE.FETCH_SITES;
	url += `?offset=${params.offset}&limit=${params.limit}`;
	return siteApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['sites']
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchSiteProducts(params) {
	let url = Config.SITES_SERVICE.FETCH_SITE_PRODUCTS;
	url += `?offset=${params.offset}&limit=${params.limit}`;
	url += `?id=${params.id}`;

	return siteApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['sites']
		}
		return null
	}).catch(error => {
		return null
	});
}

export const siteService = {
	createSite,
	updateSite,
	fetchSites,
	fetchSiteProducts,
	createSiteProduct,
	updateSiteProduct
}
