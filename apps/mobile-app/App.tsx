import { StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from 'navigator/Navigator';
//bonsoir

function onReady() {
  RNBootSplash.hide();
}

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer onReady={onReady}>
        <Navigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
