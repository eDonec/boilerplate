import { StyleSheet } from "react-native";
import RNBootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { FontProvider } from "mobile-core-ui";
import { Navigator } from "navigator/Navigator";
import { navigationRef } from "services/navigatorService";

import { AppFonts, fonts } from "constants/fonts";

function onReady() {
  RNBootSplash.hide();
}

if (__DEV__) {
  onReady();
}

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer ref={navigationRef} onReady={onReady}>
        <FontProvider appFonts={fonts} defaultFontFamily={AppFonts.Poppins}>
          <Navigator />
        </FontProvider>
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
