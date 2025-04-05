import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ROUTE_NAME} from '../constants';
import {CreateNoteScreen, Home, UserProfile} from '../screens';

type RootStackParamList = {
  Home: undefined;
  UserProfile: {userId: string};
  CreateNote: undefined;
};
export type HomeParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.HOME
>;
export type CreateNoteParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.CREATE_NOTE
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={ROUTE_NAME.HOME} component={Home} />
      <Stack.Screen name={ROUTE_NAME.USER_PROFILE} component={UserProfile} />
      <Stack.Screen
        name={ROUTE_NAME.CREATE_NOTE}
        component={CreateNoteScreen}
      />
    </Stack.Navigator>
  );
};
export default Navigation;
