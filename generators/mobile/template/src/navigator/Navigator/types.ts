import { AppNavigationProp, AppRouteProp } from "navigator/navigatorUtils";

export type NavigatorParamList = {
  DemoScreen: undefined;
};

export type NavigatorNavigationProp = AppNavigationProp<NavigatorParamList>;
export type NavigatorRouteProp<T extends keyof NavigatorParamList> =
  AppRouteProp<NavigatorParamList, T>;
