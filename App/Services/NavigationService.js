import { CommonActions } from '@react-navigation/native';
import { createRef } from 'react';

export const navigatorRef = createRef();

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

let navigator;

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName, params) {
  // navigator.dispatch(
  //   NavigationActions.navigate({
  //     routeName,
  //     params,
  //   }),
  // );
  navigatorRef.current.navigate(routeName, params);
}

function goback() {
  // navigator.dispatch(NavigationActions.back());
  navigatorRef.current.goBack();
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName, params) {
  
  // navigator.dispatch(
  //   StackActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [
  //       NavigationActions.navigate({
  //         routeName,
  //         params,
  //       }),
  //     ],
  //   }),
  // );
  // navigatorRef.current.reset({
  //   index: 1,
  //   routes: [{name: routeName, params: params}],
  // });
  navigatorRef.current.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName, params: params}],
    }),
  );
}

function navigateAndReplace(routeName, params) {
  // navigator.dispatch(StackActions.replace({routeName, params}));
  navigatorRef.current.replace(routeName, params);
}

export default {
  goback,
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
  navigateAndReplace,
};
