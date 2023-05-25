import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DemoScreen from "screens/DemoScreen";

import { NavigatorParamList } from "./types";

const Stack = createNativeStackNavigator<NavigatorParamList>();

export function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DemoScreen" component={DemoScreen} />
    </Stack.Navigator>
  );
}
