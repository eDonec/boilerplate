import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RedScreen from 'screens/RedScreen';

import { NavigatorParamList } from './types';

const Stack = createNativeStackNavigator<NavigatorParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RedScreen" component={RedScreen} />
    </Stack.Navigator>
  );
};
