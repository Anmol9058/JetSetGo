import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SurveysTypes } from './Actions'
import _ from 'lodash';



export const getSurveysLoading = (state) => ({
    ...state,
    getSurveysLoader: true
});

export const getSurveysSuccess = (state, { payload }) => ({
    ...state,
    surveyList:payload,
    getSurveysLoader: false
});

export const getSurveysFailure = (state, { payload }) => ({
    ...state,
    surveyList: [],
    getSurveysLoader: false,
});


export const doNothing = (state) => ({
    ...state
});

export const startSurveySuccess = (state, { payload }) => ({
    ...state,
    surveyForm: payload
});
export const gotoNextQuestionSuccess = (state, { payload }) => ({
    ...state,
    question: payload
});
export const gotoPreviousQuestionSuccess = (state, { payload }) => ({
    ...state,
    surveyForm: payload
});

export const changeSurveyForm = (state, { payload }) => {
    let updated_form = _.cloneDeep(state.surveyForm);
    updated_form[payload.edited_field] = payload.edited_value;

    return {
        ...state,
        surveyForm: {
            ...state.surveyForm,
            ...updated_form
        }
    }
};


export const clearSurveyForm = (state, { payload }) => {
    return {
        ...state,
        surveyForm: INITIAL_STATE.surveyForm
    }
};


export const submitSurveyLoading = (state) => ({
    ...state,
    submitSurveyLoader: true
});


export const submitSurveyLoadingStop = (state) => ({
    ...state,
    submitSurveyLoader: false
});


export const submitSurveySuccess = (state, { payload }) => {
    return {
        ...state,
        surveyForm:{},
        submitSurveyLoader: false
    }
};


export const submitSurveyFailure = (state, { payload }) => {
    return {
        ...state,
        submitSurveyLoader: false
    }
};

    // [SurveysTypes.SUBMIT_SURVEY_SUCCESS]      : submitSurveySuccess,
    // [SurveysTypes.SUBMIT_SURVEY_FAILURE]      : submitSurveyFailure,
    // [SurveysTypes.SUBMIT_SURVEY_LOADING]      : submitSurveyLoading,
    // [SurveysTypes.SUBMIT_SURVEY_LOADING_STOP] : submitSurveyLoadingStop,










export const reducer = createReducer(INITIAL_STATE, {
    [SurveysTypes.GET_SURVEYS_LOADING]    : getSurveysLoading,
    [SurveysTypes.GET_SURVEYS_SUCCESS]    : getSurveysSuccess,
    [SurveysTypes.GET_SURVEYS_FAILURE]    : getSurveysFailure,
    [SurveysTypes.DO_NOTHING]             : doNothing,
    [SurveysTypes.START_SURVEY_SUCCESS]   : startSurveySuccess,
    [SurveysTypes.GOTO_NEXT_QUESTION_SUCCESS]   : gotoNextQuestionSuccess,
    [SurveysTypes.GOTO_PREVIOUS_QUESTION_SUCCESS]   : gotoPreviousQuestionSuccess,
    [SurveysTypes.CHANGE_SURVEY_FORM]     : changeSurveyForm,
    [SurveysTypes.CLEAR_SURVEY_FORM]      : clearSurveyForm,

    [SurveysTypes.SUBMIT_SURVEY_SUCCESS]      : submitSurveySuccess,
    [SurveysTypes.SUBMIT_SURVEY_FAILURE]      : submitSurveyFailure,
    [SurveysTypes.SUBMIT_SURVEY_LOADING]      : submitSurveyLoading,
    [SurveysTypes.SUBMIT_SURVEY_LOADING_STOP] : submitSurveyLoadingStop,

});
