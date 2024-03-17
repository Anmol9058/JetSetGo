import { createActions } from 'reduxsauce'


const { Types, Creators } = createActions({
  getSurveys: ['payload'],
  getSurveysLoading: null,
  getSurveysSuccess: ['payload'],
  getSurveysFailure: null,
  doNothing: null,

  startSurvey: ['payload'],
  startSurveySuccess: ['payload'],
  setSurveyForm: ['payload'],
  clearSurveyForm: null,
  gotoNextQuestion: ['payload'],
  gotoNextQuestionSuccess: ['payload'],
  gotoPreviousQuestion:['payload'],
  gotoPreviousQuestionSuccess:['payload'],
  submitSurvey: ['payload'],
  submitSurveySuccess: ['payload'],
  submitSurveyFailure: ['payload'],
  submitSurveyLoading: null,
  submitSurveyLoadingStop: null,
  answerQuestion: ['payload'],
  changeSurveyForm: ['payload'],
  changeSurveyFormSuccess: ['payload']
});

export const SurveysTypes = Types
export default Creators