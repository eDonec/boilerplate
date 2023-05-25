import React from 'react';

import {
  DrawerActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { NavigatorParamList } from 'navigator/Navigator/types';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavigatorParamList>>();

const back = navigationRef.current?.goBack;
const navigate = navigationRef.current?.navigate;

function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export default {
  navigate,
  back,
  toggleDrawer,
  closeDrawer,
  popToTop,
};
