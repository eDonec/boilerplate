import ApiSDK from 'server-sdk';
import AuthSDK from 'auth-sdk';
import HealthSDK from 'health-sdk';
import { Platform } from 'react-native';
import { ANDROID_API_URL, IOS_API_URL } from '@env';

const mainApi = new ApiSDK(
  Platform.select({ ios: IOS_API_URL, android: ANDROID_API_URL }),
);
const authSDK = new AuthSDK(mainApi);
const healthSDK = new HealthSDK(mainApi);

const Api = { mainApi, authSDK, healthSDK };

export default Api;
