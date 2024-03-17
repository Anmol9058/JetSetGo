import axios from 'axios';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const orderApiClient = axios.create({
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});




function fetchOrderDetails(params) {
	
	let url = Config.ORDERS_SERVICE.DETAIL;
	url += `?id=${params.order_id}&from=${'SFA'}`;

	// if (!params.order_id) {
	// 	return null
	// }

	return orderApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']['orderDetail'][0]['orderLine']
		}
		return null
	}).catch(error => {
		
		return null
	});
}

function fetchDealerOrderDetails(params) {
	let url = Config.ORDERS_SERVICE.DEALER_ORDER_DETAIL;
	url += `?id=${params.order_id}&from=${'SFA'}`;


	if (!params.order_id) {
		return null
	}

	return orderApiClient.get(url, {
		headers: {
			token: params.token,
			
			//'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']['orderDetail'][0]['orderLine']
		}
		return null
	}).catch(error => {
		//console.log(error.response)
		return null
	});
}


function fetchAllOrders(params) {
	let url = Config.ORDERS_SERVICE.FETCH_ORDERS;
	url += `?offset=${params.offset}&limit=${params.limit}`;
	url += params.type ? `&type=${params.type}` : '';
	return orderApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['orders'];
		}
		return null
	}).catch(error => {
		//console.log("API FAIL=", error.response.data.message);
		return null
	});
}


function repeatOrder(params) {
	let url = Config.ORDERS_SERVICE.REPEAT_ORDER;
	url += `?order__c=${params.order__c}&order_date__c=${params.order_date__c}`;
	return orderApiClient.post(url, params, {
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


export const ordersService = {
	repeatOrder,
	fetchAllOrders,
	fetchOrderDetails,
	fetchDealerOrderDetails
}
