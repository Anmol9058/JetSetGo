import { createNetworkMiddleware } from 'react-native-offline';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import createSensitiveStorage from "redux-persist-sensitive-storage";
import createSagaMiddleware from 'redux-saga';
import { INITIAL_STATE as DASHBOARD_INITIAL_STATE } from './Dashboard/InitialState';
import { INITIAL_STATE as PRODUCTS_INITIAL_STATE } from './Products/InitialState';
import { INITIAL_STATE as RETAILER_INITIAL_STATE } from './Retailers/InitialState';
import { INITIAL_STATE as USER_INITIAL_STATE } from './User/InitialState';
import { INITIAL_STATE as VISITS_INITIAL_STATE } from './Visits/InitialState';

const sensitiveStorage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs"
});

//example when you change reducer in live app
// const migrations = {  
//     0: (state) => {    
//         return {      
//           ...state,      
//             user: {        
//               ...state.user,        
//                validation : {
//                 invalid_number: false,
//                 invalid_password: false,
//                 error_message:'' 
//               }
//             }    
//         }  
//     }
// }

const blacklistPaths = ['network', 'common', 'products', 'orders', 'survey',  'dashboard'];
let blacklistTransform = createTransform(
  (inboundState, key) => {
    if (key === 'retailers') {
      return {
        ...inboundState,
        retailerSearchFilters: RETAILER_INITIAL_STATE.retailerSearchFilters,
        selectedRetailer: RETAILER_INITIAL_STATE.selectedRetailer,
        selectedDealer: RETAILER_INITIAL_STATE.selectedDealer,
        createRetailerLoader: RETAILER_INITIAL_STATE.createRetailerLoader,
        updateRetailerLoader: RETAILER_INITIAL_STATE. updateRetailerLoader,
        updateRetailerLocationLoader: RETAILER_INITIAL_STATE. updateRetailerLocationLoader,
        editOrderQuantityLoader: RETAILER_INITIAL_STATE.editOrderQuantityLoader,
        addOrderLineLoader: RETAILER_INITIAL_STATE.addOrderLineLoader,
        fetchRetailersLoader: RETAILER_INITIAL_STATE.fetchRetailersLoader,
      
      };
    } else if (key === 'visits') {
      return {
        ...inboundState,
       
        searchFilters: VISITS_INITIAL_STATE.searchFilters,
        visitsAction: VISITS_INITIAL_STATE.visitsAction,
        editVisit: VISITS_INITIAL_STATE.editVisit,
        placeOrderLoader : VISITS_INITIAL_STATE.placeOrderLoader,
        CompetitorSubmitLoader: VISITS_INITIAL_STATE.CompetitorSubmitLoader,
        StockSubmitLoader: VISITS_INITIAL_STATE.StockSubmitLoader,
        addVisitInfoLoader: VISITS_INITIAL_STATE.addVisitInfoLoader,
        startVisitLoader: VISITS_INITIAL_STATE.startVisitLoader,
        endVisitLoader: VISITS_INITIAL_STATE.endVisitLoader,
        UpdateStockSubmitLoader: VISITS_INITIAL_STATE.UpdateStockSubmitLoader,
        UpdateCompetitorSubmitLoader : VISITS_INITIAL_STATE. UpdateCompetitorSubmitLoader,
        
      };
    } else if (key === 'dashboard') {
      return {
        ...inboundState,
        searchFilters: DASHBOARD_INITIAL_STATE.searchFilters
      };
    } else if (key === 'user') {
      return {
        ...inboundState,
        userLoginIsLoading: USER_INITIAL_STATE.userLoginIsLoading,
        userLogoutIsLoading: USER_INITIAL_STATE.userLogoutIsLoading,
        userStartDayLoading: USER_INITIAL_STATE.userStartDayLoading,
        

      };
    } else if (key === 'products') {
      return {
        ...inboundState,
        searchFilters: PRODUCTS_INITIAL_STATE.searchFilters,
        fetchProductsLoader: PRODUCTS_INITIAL_STATE.fetchProductsLoader,
        fetchCategoryLoader: PRODUCTS_INITIAL_STATE.fetchCategoryLoader,
        fetchGsmLoader: PRODUCTS_INITIAL_STATE.fetchGsmLoader,
        fetchProductsBrandLoader: PRODUCTS_INITIAL_STATE.fetchProductsBrandLoader,
        fetchItemLoader : PRODUCTS_INITIAL_STATE.fetchItemLoader,
        fetchItemPriceLoader: PRODUCTS_INITIAL_STATE.fetchItemPriceLoader,
        productItemPriceList: PRODUCTS_INITIAL_STATE.productItemPriceList,
        productItemList: PRODUCTS_INITIAL_STATE.productItemList,
        BrandList: PRODUCTS_INITIAL_STATE.BrandList,
        productGsmList: PRODUCTS_INITIAL_STATE.productGsmList,
        sizeList: PRODUCTS_INITIAL_STATE.sizeList,
        productCategoryList: PRODUCTS_INITIAL_STATE.productCategoryList,
        sizeSearchFilters: PRODUCTS_INITIAL_STATE.sizeSearchFilters,
        productSizeForm: PRODUCTS_INITIAL_STATE.productSizeForm,
        productCategoryDisplayList: PRODUCTS_INITIAL_STATE.productCategoryDisplayList,
        

      };
    }else {
      return inboundState;
    }
  }
)



const persistConfig = {
  key: 'root',
  version: 0,
  storage: sensitiveStorage,
  debug: true,
  //migrate: createMigrate(migrations, { debug: true }),

  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: blacklistPaths,
  transforms: [blacklistTransform]
}


export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200,
  });

  middleware.push(networkMiddleware);
  middleware.push(sagaMiddleware);

  enhancers.push(applyMiddleware(...middleware, createLogger()))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
