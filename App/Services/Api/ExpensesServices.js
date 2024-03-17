import axios from 'axios';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});

const in200s = isWithin(200, 299)

const ExpensesApiClient = axios.create({
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});

function getMyExpenses(params) {
	let url = Config.EXPENSES_SERVICE.GET_MY_EXPENSES;
	 url=url+`?month=${params.month}`;
	return ExpensesApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			
			return response['data']['data']['expenses']
		}
		return null
	}).catch(error => {
		console.log(error.response);
		return null
	});
}
function getTeamExpenses(params) {
	let url = Config.EXPENSES_SERVICE.GET_TEAM_EXPENSES;
	
	 url=url+`?sfid=${params.sfid}`;
	return ExpensesApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
			
			return response['data']['data']['expense lines']
		}
		return null
	}).catch(error => {
		
		return null
	});
}

function updateTravelExpense(params) {

	let url = Config.EXPENSES_SERVICE.UPDATE_TRAVEL_EXPENSE	
	return retailerApiClient.post(url, {
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

function getMyExpenseLines(params) {
	let url = Config.EXPENSES_SERVICE.GET_MY_EXPENSE_LINES;
	url=url+`?sfid=${params.sfid}`+`&date=${params.date}`;											//+`&date=${params.date}`
	console.log(url,"URL GETMYEXPENSELINES");
	return ExpensesApiClient.get(url, {
		headers: {
			token: params.token,
		}
	}).then((response) => {
		if (in200s(response.status)) {
		
			return response['data']['data']['expense lines']
		}
		return null
	}).catch(error => {
		console.log(error.response);
		return null
	});
}


// function updateTravelExpense(params) {
// 	console.log(params,"POST DATA PARAMS");
// 	let formData = _.cloneDeep(params.payload);
// 	formData = HelperService.removeField(formData,'token');
// 	let url = Config.EXPENSES_SERVICE.UPDATE_TRAVEL_EXPENSE;
// 	console.log(formData,"BODY OF UPDATE API");
// 	return ExpensesApiClient.post(url,formData, {
// 		headers: {
// 		token:params.payload.token,
// 		}
// 	}).then((response) => {
// 		if (in200s(response.status)) {
// 			console.log(response,"POST EXPENSE SUCCESS");
// 			return response.data
// 		}
// 		return null
// 	}).catch(error => {
// 		console.log(error,"POST EXPENSE ERROR");
// 		return null
// 	});
// }

export const ExpensesService = {
	getMyExpenses,
	updateTravelExpense,
    getMyExpenseLines

}