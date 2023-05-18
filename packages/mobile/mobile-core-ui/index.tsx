import { Text } from "react-native";

import { useFontContext } from "./contexts/";

export * from "./contexts/";

export function MyFirstMobileComponent() {
  const { fontFamily } = useFontContext();

  return <Text style={{ fontFamily }}>My first mobile component</Text>;
}
