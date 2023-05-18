import { StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { FontProvider } from 'mobile-core-ui';
import { Navigator } from 'navigator/Navigator';
import { navigationRef } from 'services/navigatorService';

import { AppFonts } from 'helpers/getFontFamily';

function onReady() {
  RNBootSplash.hide();
}

if (__DEV__) {
  onReady();
}

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <FontProvider value={{ fontFamily: AppFonts.Poppins }}>
        <NavigationContainer ref={navigationRef} onReady={onReady}>
          <Navigator />
        </NavigationContainer>
      </FontProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
