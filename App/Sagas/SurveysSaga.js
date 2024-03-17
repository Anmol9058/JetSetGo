import { call, put, select, take } from 'redux-saga/effects'
import { surveyService } from '../Services/Api/SurveysService'
import NavigationService from '../Services/NavigationService'
import { HelperService } from '../Services/Utils/HelperService'
import { getConnectionStatus } from '../Stores/Common/Selectors'
import SurveyActions, { SurveysTypes } from '../Stores/Surveys/Actions'

import _ from 'lodash'

//createRetailer, validation required, offline support
//updateRetailer, validation required, offline support
//fetchRetailers
//fetchDealers
//updateRetailerLocation
//fetchRetailerOrders
//fetchDealerOrders
//fetchDealerInvoice 
//fetchDealerOutstanding



export function* getSurveys({ payload }) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(SurveyActions.doNothing());
		return;
	}
	yield put(SurveyActions.getSurveysLoading());
	try {
		  
		
		let successData = yield call(surveyService.getSurveys, payload);
		
		if (successData) {

			yield put(SurveyActions.getSurveysSuccess(successData));

		} else {
			console.log('Error', error)
			yield put(SurveyActions.getSurveysFailure());
			
		}
	} catch (error) {
		console.log('Error', error)
		yield put(SurveyActions.getSurveysFailure());
	}
}

export function* startSurvey({ payload }) {
	let form = {
		Id: payload[0].sfid,
		Name: payload[0].name,
		Region__c: null,
		survey_definition:payload[0].survey_definition_sfid,
		questions: payload,
		total_questions: payload.length,
		current_question: 1
	};
	// let executeVisitData = yield select(state => state.visits.executeVisitData);
	
	yield put(SurveyActions.startSurveySuccess(form));
	NavigationService.navigate('SurveyFormScreen')}
	// else{
	// 	HelperService.showToast({ message: 'Please Start Dealer Visit to proceed.', duration: 2000, buttonText: 'Okay' });	
	// }


export function* gotoNextQuestion({ payload }) {
	let survey = yield select(state => state.survey.surveyForm);
	let current_question = survey.current_question + 1;
	let is_answered = !!survey.questions[survey.current_question - 1]['answer'];
		
	if (!is_answered) {
		HelperService.showToast({ message: 'Please answer this question to proceed.', duration: 2000, buttonText: 'Okay' });
		return
	}
	yield put(SurveyActions.gotoNextQuestionSuccess(current_question));
	yield put(SurveyActions.changeSurveyForm({edited_field: 'current_question', edited_value: current_question}));
}


export function* gotoPreviousQuestion({ payload }) {
	let survey = yield select(state => state.survey.surveyForm);
	let current_question = survey.current_question - 1;
	yield put(SurveyActions.changeSurveyForm({edited_field: 'current_question', edited_value: current_question}));
}

export function* answerQuestion({payload}) {
	let survey = yield select(state => state.survey.surveyForm);
	let updated_questions  = _.cloneDeep(survey.questions);

	updated_questions.map((obj)=> {
		if (obj.sfid == payload.id) {
			obj.answer = payload.answer;
		}
	});

	yield put(SurveyActions.changeSurveyForm({edited_field: 'questions', edited_value: updated_questions}));

}


export function* submitSurvey(payload) {
	const isOnline = yield select(getConnectionStatus);// checks whether net is connected or not.
	if (!isOnline) {
		yield put(SurveyActions.doNothing());
		return;
	}
	yield put(SurveyActions.submitSurveyLoading());
	try {
		let formData = createSurveySubmitData(payload);
		
		let successData = yield call(surveyService.submitSurvey, formData,payload.token);
		// console.log(successData);
		if (successData) {
			yield put(SurveyActions.submitSurveySuccess(successData));
			HelperService.showToast({ message: 'Survey Submitted Successfully!', duration: 2000, buttonText: 'Okay' });
			NavigationService.navigate('SurveyListScreen');
		} else {
			
			yield put(SurveyActions.submitSurveyFailure());
		}
	} catch (error) {
		console.log('Error', error);
		yield put(SurveyActions.submitSurveyFailure());
	}
}



export function* watchSubmitSurvey() {
	while (true) {
		const { payload } = yield take(SurveysTypes.SUBMIT_SURVEY)
		try {
			const validationFailed = false//yield call(ValidationService.validateSubmitSurvey, payload);
			if (validationFailed) {
				HelperService.showToast({ message: validationFailed.error_message, duration: 2000, buttonText: 'Okay' });
				continue;
			}
		} catch (err) {
			console.log(err)
		}
		yield call(submitSurvey, payload)
	}
}


function createSurveySubmitData(payload) {
	// console.log(payload.payload);
	let questions = _.cloneDeep(payload.payload.surveyForm.questions);

	

	// "attributes" : {"type" : "Survey_Answer__c", "referenceId" : "ref1"},
 //    "Survey_Question__c" : "a0i0p0000003eXFAAY",{Survey Line ID}
 //    "Answer__c" : "Builder"
 	let form = [];
 	let index = 1;
 	questions.map((obj) => {
 		// let answer = obj.answer.split(',');
 		if (obj.answer) {
 			
 				form.push({
					survey_definition__c:payload.payload.surveyForm.survey_definition,
					answer__c:obj.answer,
					survey_questions__c:obj.sfid,
					user__c:payload.payload.surveyForm.user__c,
					visit__c:'',
					channel_partner__c:''
			
	 			})
			}
				 
 	})


 	return ({
		 token:payload.payload.token,
 		records: form
 	})

}





