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

const retailerApiClient = axios.create({
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});


function createRetailer(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'local_id');
	formData = HelperService.removeField(formData, 'team__c');
	//formData = HelperService.removeField(formData, 'postal_code');
	let url = Config.RETAILER_SERVICE.CREATE
	url += `?team__c=${params.team__c}`
	//url += params.type ? `&type=${params.type}` : '';
	
	return retailerApiClient.post(url, formData, {
		headers: {
			token: 'Bearer ' + params.token,
		
		}
	}).then((response) => {
		

		if (in200s(response.status)) {
			console.log('dvsjkdvb',response)
			return response['data']['data'][0]

		}
		return null
	}).catch(error => {
		console.log(error.response)
if(error.response){
	if(error.response.data&&error.response.data.message&&error.response.data.message=='Retailer Phone Number Does not Exist'){
		HelperService.showToast({message:'Retailer Phone Number Exist',duration: 1000, buttonText: ''})
}
else{
	HelperService.showToast({message:'Not Submitted',duration: 1000, buttonText: ''})
}
return null
}
// console.log('ahefbwhf',error.response)
return null
	});
}

function updateRetailer(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'agentid');
	formData = HelperService.removeField(formData, 'token');
	const url = Config.RETAILER_SERVICE.UPDATE;
	url += `?team__c=${params.team__c}`

	return retailerApiClient.post(url, formData, {
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


function EditRetailer(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'token');
	let url = Config.RETAILER_SERVICE.EDIT_RETAILER;
	return retailerApiClient.post(url, formData, {
		headers: {
			token: 'Bearer ' + params.token,
		
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

function fetchRetailers(params) {
	let url = Config.RETAILER_SERVICE.FETCH_RETAILERS;
	url += `?team__c=${params.team__c}`
	url += params.search ? `&search=${params.search}` : '';

console.log("001C6000009wW====", url);

	return retailerApiClient.get(url, {
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

function fetchCreditLimit(params) {
	let url = Config.RETAILER_SERVICE.FETCH_CREDIT_LIMIT;
	url += `?account_id=${params.account_id}`

	return retailerApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']['divisions']
		}
		return null
	}).catch(error => {
		return null
	});
}





function fetchDealers(params) {
	let url = Config.RETAILER_SERVICE.FETCH_DEALERS;
	url += `?offset=${params.offset}&limit=${params.limit}&type=Dealer`;
	url += params.area ? `&area_id=${params.area}` : '';
	url += params.search ? `&search=${params.search}` : '';
	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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

function fetchRetailerDealerByLocation(params) {
	let url = Config.RETAILER_SERVICE.SEARCH_BY_LOCATION;
	url += `?offset=${params.offset}&limit=${params.limit}`;
	url += params.latitude ? `&lat=${params.latitude}` : '';
	url += params.longitude ? `&long=${params.longitude}` : '';
	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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

function fetchRetailerOrders(params) {
	console.log(params,"params")
	let url = Config.RETAILER_SERVICE.FETCH_ORDERS;
	url += `?offset=${params.offset}&limit=${params.limit}&sellerid=${params.seller_id}&type=${params.type}`;
	return retailerApiClient.get(url, {
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
		return null
	});
}

function fetchDealerOrders(params) {
	let url = Config.RETAILER_SERVICE.FETCH_ORDERS;
	url += `?sfid=${params.sfid}&order_date=${params.date}`;
	return retailerApiClient.get(url, {
		headers: {
			token: 'Bearer ' + params.token,
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

function deleteOrderLine(params) {
	
	let url = Config.RETAILER_SERVICE.DELETE_ORDER_LINE;
	url += `?id=${params.id}&total_tax=${params.total_tax}&igst_amount=${params.igst_amount}&sgst_amount=${params.sgst_amount}&cgst_amount=${params.cgst_amount}&total_exmill=${params.total_exmill}`;
	return retailerApiClient.get(url, {
		headers: {
			token: 'Bearer ' + params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function editOrderQuantity(params) {
	let url = Config.RETAILER_SERVICE.EDIT_ORDER_LINE;
	//url += `?id=${params.id}`;
	let formData = _.cloneDeep(params);
	
	formData = HelperService.removeField(formData, 'token');
	//console.log(formData)
	return retailerApiClient.post(url, formData, {
		headers: {
			token: 'Bearer ' + params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			//console.log(response)
			return response['data'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function addOrderLine(params) {
	let url = Config.RETAILER_SERVICE.ADD_ORDER_LINE;
	//url += `?id=${params.id}`;
	let formData = _.cloneDeep(params);
	
	formData = HelperService.removeField(formData, 'token');
	
	return retailerApiClient.post(url, formData, {
		headers: {
			token: 'Bearer ' + params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			//console.log(response)
			return response['data']['order_line'];
		}
		return null
	}).catch(error => {
		//console.log(error.response)
		return null
	});
}

function fetchDealerInvoice(params) {
	let url = Config.RETAILER_SERVICE.FETCH_DEALER_INVOICE;
	url += `?offset=${params.offset}&limit=${params.limit}&sellerid=${params.seller_id}`;
	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['dealer-invoices'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchDealerOutstanding(params) {

	let url = Config.RETAILER_SERVICE.FETCH_DEALER_OUTSTANDING;
	url += `?offset=${params.offset}&limit=${params.limit}&sellerid=${params.seller_id}`;
	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['outstandings'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchDealerPayments(params) {
	let url = Config.RETAILER_SERVICE.FETCH_DEALER_PAYMENTS;
	url += `?sellerid=${params.seller_id}`;
	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['payments'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function updateRetailerLocation(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'local_id');
	formData = HelperService.removeField(formData, 'token');
	formData = HelperService.removeField(formData, 'seller_id');
	formData = HelperService.removeField(formData, 'agentid');
	

	let url = Config.RETAILER_SERVICE.UPDATE_LOCATION;
	url += `?party__c=${params.seller_id}`

	return retailerApiClient.post(url,formData, {
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

function fetchRetailerCompetitors(params) {

	let url = Config.RETAILER_SERVICE.FETCH_COMPETITORS;
	url += `?team__c=${params.team__c}`
	return retailerApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['competitor'];
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchInvoiceDetail(params) {
	let url = Config.RETAILER_SERVICE.INVOICE_DETAIL;
	url += `&invoiceid=${params.invoice_id}`;

	if (!params.invoice_id) {
		return null
	}
	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['invoice-line-items']
		}
		return null
	}).catch(error => {
		return null
	});
}


function fetchDealerOrderDetail(params) {
	let url = Config.RETAILER_SERVICE.DEALER_ORDER_DETAILS;
	url += `&orderid=${params.order_id}`;

	if (!params.invoice_id) {
		return null
	}

	return retailerApiClient.get(url, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['dealer-orederLineItems']
		}
		return null
	}).catch(error => {
		return null
	});
}


function submitPaymentsForm(params) {
	let url = Config.RETAILER_SERVICE.SUBMIT_PAYMENT;
	return retailerApiClient.post(url, { payment: params }, {
		headers: {
			Authorization: 'Bearer ' + params.token,
			agentid: params.agentid,
			'Content-Type': 'application/json'
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


function getComplaintType(params) {
	let url = Config.RETAILER_SERVICE.FETCH_COMPLAINT_TYPE;
	   url += `?complaint_type=${params.name}`
	
	return retailerApiClient.get(url, {
	  headers: {
		token: 'Bearer ' + params.token,


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


function getSubComplaintType(params) {
	let url = Config.RETAILER_SERVICE.FETCH_SUB_COMPLAINT_TYPE;
	   url += `?sfid=${params.id}`
	
	return retailerApiClient.get(url, {
	  headers: {
		token: 'Bearer ' + params.token,

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

  function getComplaints(params) {
	let url = Config.RETAILER_SERVICE.FETCH_COMPLAINTS;
	   url += `?customer_name__c=${params.Customer_name__c}`
	
	return retailerApiClient.get(url, {
	  headers: {
		token:  params.token,

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

  function getorderComplaint(params) {
	let url = Config.RETAILER_SERVICE.FETCH_ORDER_COMPLAINT;
	   url += `?sfid=${params.sfid}`
	
	return retailerApiClient.get(url, {
	  headers: {
		token:  params.token,

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
  function getInvoiceComplaint(params) {
	let url = Config.RETAILER_SERVICE.FETCH_INVOICE_COMPLAINT;
	   url += `?id=${params.id}`
	
	return retailerApiClient.get(url, {
	  headers: {
		token:  params.token,

	  }
	}).then((response) => {
	  if (in200s(response.status)) {
		
		return response['data']['data']['invoice'];
	
	  }
	  return null
	}).catch(error => {
		
	  return null
	});
  }

  function createComplaint(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'local_id');
	formData = HelperService.removeField(formData, 'token');
	if(formData.form.complaint_url__c)
	{
		formData.form.complaint_url__c= formData.form.complaint_url__c.join()
	}
	//formData = HelperService.removeField(formData, 'seller_id');
	//formData = HelperService.removeField(formData, 'agentid');

	let url = Config.RETAILER_SERVICE.CREATE_COMPLAINT	

	return retailerApiClient.post(url, formData.form, {
		headers: {
			token: 'Bearer ' + params.token
		
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

function createCompetitor(params) {
	let url = Config.RETAILER_SERVICE.CREATE_COMPETITOR	
	return retailerApiClient.post(url, {name: params.Name}, {
		headers: {
			token: 'Bearer ' + params.token
		
		}
	}).then((response) => {
		if (in200s(response.status)) {
			
			return response['data']['data'][0]
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchDsr(params) {
	let url = Config.RETAILER_SERVICE.GET_DSR;
	url += `?sfid=${params.sfid}`
	return retailerApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['DSR']
		}
		return null
	}).catch(error => {
		return null
	});
}

function fetchDsrArea(params) {
	let url = Config.RETAILER_SERVICE.GET_DSR_AREA;
	url += `?sfid=${params.sfid}`

	return retailerApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['areas']
		}
		return null
	}).catch(error => {
		return null
	});
}
function fetchDsrAreaList(params) {
	let url = Config.RETAILER_SERVICE.GET_DSR_AREA_L4;
	url += `?team__c=${params.sfid}`

	return retailerApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data']['areas']
		}
		return null
	}).catch(error => {
		return null
	});
}

function createDsr(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'local_id');
	formData = HelperService.removeField(formData, 'token');
	let url = Config.RETAILER_SERVICE.CREATE_DSR
	return retailerApiClient.post(url, formData, {
		headers: {
			token: 'Bearer ' + params.token
		
		}
	}).then((response) => {
		if (in200s(response.status)) {
			return response['data']['data'][0]
		}
		return null
	}).catch(error => {
		return null
	});
}

function createDsrArea(params) {
	let formData = _.cloneDeep(params);
	formData = HelperService.removeField(formData, 'id');
	formData = HelperService.removeField(formData, 'token');
	
	let url = Config.RETAILER_SERVICE.ADD_DSR_AREA
	url += `?id=${params.id}`		
	
	return retailerApiClient.post(url,{area:[formData.area__c]}, {
		headers: {
			token: 'Bearer ' + params.token
		
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


function RetailerTarget(params) {
	let url = Config.RETAILER_SERVICE.GET_RETAILER_TARGET;
	url += `?dealer__c=${params.dealer__c}`;
	url+=`&team_id__c=${params.team_id__c}`;
	url+=`&year__c=${params.year__c}`;
	
	return retailerApiClient.get(url, {
	  headers: {
		token:  params.token,

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


export const retailerService = {
	createRetailer,
	updateRetailer,
	fetchRetailers,
	fetchDealers,
	fetchRetailerCompetitors,
	fetchRetailerOrders,
	updateRetailerLocation,
	fetchRetailerDealerByLocation,
	fetchDealerOrders,
	fetchDealerInvoice,
	fetchDealerOutstanding,
	fetchDealerPayments,
	fetchInvoiceDetail,
	submitPaymentsForm,

	EditRetailer,

	createComplaint,
	getComplaintType,
	getSubComplaintType,
	getComplaints,
	getorderComplaint,
	getInvoiceComplaint,
	createCompetitor,
	fetchDsr,
	fetchDsrArea,
	createDsr,
	createDsrArea,
	fetchDsrAreaList,
	fetchCreditLimit,
	deleteOrderLine,
	editOrderQuantity,
	addOrderLine,
	RetailerTarget,

}