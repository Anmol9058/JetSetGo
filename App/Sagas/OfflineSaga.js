import _ from 'lodash';
import { call, put, select } from 'redux-saga/effects';
import ActionQueuesActions from '../Stores/ActionQueues/Actions';
import CommonActions from '../Stores/Common/Actions';
import { getConnectionStatus } from '../Stores/Common/Selectors';


export function* runQueue(action) {
  try {
    const storedQueue = yield select(state => state.actionQueues.queue);
    yield put(CommonActions.connectionChanged(action.payload));
    if (action.payload && !_.isEmpty(storedQueue)) {
      for (let request in storedQueue) {
        yield call(runSingleRequest, storedQueue[request]);
      }
    }
  } catch (error) {
    console.log('Error Occured in runQueue: ', error);
  }
}

export function* runSingleRequest(request) {
  try {
    const copiedParams = { ...request.params };
    const data = yield call(request.action, copiedParams);
    if (data) {
      yield put(request.successCallback(request.replaceServerParams ? data : copiedParams));
    } else {
      yield put(request.failureCallback());
    }
    yield put(ActionQueuesActions.removeFromQueue({ local_id: request.params.local_id }));
  } catch (error) {
    console.log('Error Occured in runSingleRequest: ', error);
  }
}


export const offlineApiCall = function* ({ apiCall, resource, callName, params, timestamp, successCallback, failureCallback, replaceServerParams }) {
  const isOnline = yield select(getConnectionStatus);
  if (isOnline) return yield call(apiCall, params);
  yield put(ActionQueuesActions.addCallToQueue({
    resource,//string: for which purpose this call is being made, eg: startDay, endday, markAbsent
    action: apiCall,//function: actual api function to call
    callName,//string: type of action which is being done
    params, //object: params passed to api 
    timestamp,//integer: time at which api was made
    successCallback,//callback function: function to call when api is successful
    failureCallback, //callback function: function to call when api failed
    replaceServerParams //boolean: indicate whether to send server response in successcallback
  }));

  return params;
};