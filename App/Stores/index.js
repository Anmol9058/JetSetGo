import { reducer as network } from 'react-native-offline';
import { combineReducers } from 'redux';
import rootSaga from '../Sagas';
import { reducer as ActionQueuesReducer } from './ActionQueues/Reducers';
import { reducer as CommonReducer } from './Common/Reducers';
import configureStore from './CreateStore';
import { reducer as DashboardReducer } from './Dashboard/Reducers';
import { reducer as EventsReducer } from './Events/Reducers';
import { reducer as InfluencerReducer } from './Influencers/Reducers';
import { reducer as LocalReducer } from './LocalExpense/Reducers';
import { reducer as OrdersReducer } from './Orders/Reducers';
import { reducer as OutstationReducer } from './OutstationExpense/Reducers';
import { reducer as ProductsReducer } from './Products/Reducers';
import { reducer as RetailersReducer } from './Retailers/Reducers';
import { reducer as SiteReducer } from './Sites/Reducers';
import { reducer as TourReducer } from './Tour/Reducers';
import { reducer as UserReducer } from './User/Reducers';
import { reducer as VisitsReducer } from './Visits/Reducers';
//import { reducer as ExpenseReducer } from './ExpenseItem/Reducers'
import { reducer as ExpensesReducer } from './Expenses/Reducers';
import { reducer as SurveyReducer } from './Surveys/Reducers';

export default () => {
  const rootReducer = combineReducers({
    network: network,
    common: CommonReducer,
    user: UserReducer,
    retailers: RetailersReducer,
    visits: VisitsReducer,
    products: ProductsReducer,
    orders: OrdersReducer,
    events: EventsReducer,
    dashboard: DashboardReducer,
    actionQueues: ActionQueuesReducer,
    influencers: InfluencerReducer,
    sites: SiteReducer,
    local: LocalReducer,
    tours: TourReducer,
    outstations: OutstationReducer,
    //expenses: ExpenseReducer,
    survey:SurveyReducer,
    expenses: ExpensesReducer,
  });

  return configureStore(rootReducer, rootSaga)
}
