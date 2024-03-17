import Loading from 'App/Components/Loading';
import createStore from 'App/Stores';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootScreen from './Containers/Root/RootScreen';



const {store, persistor} = createStore();

export default class App extends Component {
  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <Provider store={store}>
       
          <PersistGate loading={<Loading />} persistor={persistor}>
            <RootScreen />
          </PersistGate>
        
      </Provider>
    );
  }
}




// import createStore from 'App/Stores';
// import React, { Component } from 'react';
// import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// // Files
// // import { persistor, store } from './src/redux/Store';
// // import MainStack from './src/routers/MainStack';
// import RootScreen from './Containers/Root/RootScreen';

// const { store, persistor } = createStore()
// export default class App extends Component {
//       render() {
//         return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
      
//           <StatusBar barStyle="dark-content" />
//           <RootScreen />
        
//       </PersistGate>
//     </Provider>
//   );
// };
// }
