
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

const RootComponent = () => (
  <GestureHandlerRootView style={{flex:1,backgroundColor:'white'}}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootComponent);