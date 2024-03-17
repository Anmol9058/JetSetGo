import axios from 'axios';
import { curryN, gte, is } from 'ramda';
import { Config } from '../../Config';

const isWithin = curryN(3, (min, max, value) => {
	const isNumber = is(Number)
	return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
});
const in200s = isWithin(200, 299)

const SurveyApiClient = axios.create({
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});





function getSurveys(params) {
	
	let url = Config.SURVEY_SERVICE.GET_SURVEYS;
	
	 url += `?area__c=${params.area__c}`;
	 
	return SurveyApiClient.get(url, {
		headers: {
			token:params.token,
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

function submitSurvey(params) {

	let url = Config.SURVEY_SERVICE.SUBMIT_SURVEY;
	
	return SurveyApiClient.post(url,{result:params.records}, {
		headers: {
		token:params.token,
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




export const surveyService = {
	getSurveys,
	submitSurvey
}