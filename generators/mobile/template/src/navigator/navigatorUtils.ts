/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AppNavigationProp<T extends Record<string, any>> =
  StackNavigationProp<T, keyof T>;
export type AppRouteProp<
  T extends Record<string, any>,
  U extends keyof T,
> = RouteProp<T, U>;
