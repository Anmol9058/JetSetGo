import { createActions } from 'reduxsauce'
const { Types, Creators } = createActions({
  	addCallToQueue: ['payload'],
  	removeFromQueue: ['payload']
});

export const ActionQueuesTypes = Types
export default Creators
