import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ActionQueuesTypes } from './Actions'
import _ from 'lodash';

export const addCallToQueue = (state, { payload }) => {
	let newQueue = state.queue;
	const actionCopy = { ...payload };
	if (actionCopy.params.id) {
		newQueue = {
			...state.queue,
			[actionCopy.params.local_id]: actionCopy,
		};
	}else {
		switch (actionCopy.callName) {
			case 'create':{
				newQueue = {
					...state.queue,
					[actionCopy.params.local_id]: actionCopy,
				};
				break;
			}
			case 'update': {
				const oldRequest = state.queue[actionCopy.params.local_id];
				const newRequest = { ...oldRequest, params: actionCopy.params };
				newQueue = {
					...state.queue,
					[actionCopy.params.local_id]: newRequest,
				};
				break;
			}
			case 'archive': {
				newQueue = _.omit(state.queue, actionCopy.params.local_id);
				break;
			}
			default: {
				newQueue = {
				  	...state.queue,
				  	[actionCopy.params.local_id]: actionCopy,
				};
				break;
			}
		}
	}
	return {
		...state,
		queue: newQueue
	};
}


export const removeFromQueue = (state, { payload }) => {
	let newQueue = state.queue;
	const {local_id} = payload;
	newQueue = _.omit(state.queue, local_id);
	return {
		...state,
		queue: newQueue
	};
}


export const reducer = createReducer(INITIAL_STATE, {
  [ActionQueuesTypes.ADD_CALL_TO_QUEUE]: addCallToQueue,
  [ActionQueuesTypes.REMOVE_FROM_QUEUE]: removeFromQueue
})
