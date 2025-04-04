import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, UserProfile} from '../screens';
import {ROUTE_NAME} from '../constants';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTE_NAME.home}>
      <Stack.Screen name={ROUTE_NAME.home} component={Home} />
      <Stack.Screen name={ROUTE_NAME.userProfile} component={UserProfile} />
    </Stack.Navigator>
  );
};
export default Navigation;
