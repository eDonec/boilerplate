import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import IonicIcon from "react-native-vector-icons/Ionicons";

import { AppText, useThemedStyleSheet } from "mobile-core-ui";

function DemoScreen() {
  const width = useSharedValue(50);
  const height = useDerivedValue(() => 1e3 / width.value);
  const borderRadius = useDerivedValue(() =>
    interpolate(width.value, [50, 100], [0, 50])
  );

  useEffect(() => {
    width.value = withRepeat(
      withSpring(100, {
        restSpeedThreshold: 0.99,
        restDisplacementThreshold: 0.99,
      }),
      -1,
      true
    );
  }, [width]);

  const styles = useThemedStyleSheet(() => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      backgroundColor: "red",
      marginVertical: 16,
      alignItems: "center",
      justifyContent: "center",
      width,
      height,
      borderRadius,
    },
    text: {
      fontWeight: "bold",
    },
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppText style={styles.text}>Hello, World!</AppText>
      <Animated.View style={styles.box} />
      <IonicIcon name="ios-home" size={20} color="red" />
    </GestureHandlerRootView>
  );
}

export default DemoScreen;
