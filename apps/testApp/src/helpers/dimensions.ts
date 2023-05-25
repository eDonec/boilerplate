import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const vmin = Math.min(height, width) / 100;
export const vmax = Math.max(height, width) / 100;
