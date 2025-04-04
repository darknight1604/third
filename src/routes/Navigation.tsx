import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Home, UserProfile} from '../screens';
import {ROUTE_NAME} from '../constants';

type RootStackParamList = {
  Home: undefined;
  UserProfile: {userId: string};
};
export type HomeParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.HOME
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={ROUTE_NAME.HOME} component={Home} />
      <Stack.Screen name={ROUTE_NAME.USER_PROFILE} component={UserProfile} />
    </Stack.Navigator>
  );
};
export default Navigation;
