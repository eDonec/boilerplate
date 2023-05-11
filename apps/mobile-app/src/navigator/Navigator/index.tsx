import { createStackNavigator } from '@react-navigation/stack';

import { NavigatorParamList } from './types';
import RedScreen from 'screens/RedScreen';

const Stack = createStackNavigator<NavigatorParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RedScreen" component={RedScreen} />
    </Stack.Navigator>
  );
};
