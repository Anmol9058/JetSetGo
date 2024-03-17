import React, { useMemo } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Home = () => {
  const theme = useSelector((state) => state.colors.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <StatusBar backgroundColor={theme.light} />
      <View style={styles.screen}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.white,
    },
  });

export default Home;
// import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';
// import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// // Files
// import { persistor, store } from './src/redux/Store';
// import MainStack from './src/routers/MainStack';
// import { NavigationRef } from './src/routers/RouterServices';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <NavigationContainer ref={NavigationRef}>
//           <StatusBar barStyle="dark-content" />
//           <MainStack />
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;