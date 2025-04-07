import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ROUTE_NAME} from '../constants';
import {CreateNoteScreen, Home, UserProfile} from '../screens';
import CameraView from '../components/camera-picker/camera-view';
import {createNavigationContainerRef} from '@react-navigation/native';
import {PhotoFile} from 'react-native-vision-camera';

export type RootStackParamList = {
  Home: undefined;
  UserProfile: {userId: string};
  CreateNote: undefined;
  CameraView: {onPost: (photoFile: PhotoFile | undefined) => void};
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as any)(name, params);
  }
}

export type HomeParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.HOME
>;
export type CreateNoteParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.CREATE_NOTE
>;

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={ROUTE_NAME.HOME} component={Home} />
      <Stack.Screen name={ROUTE_NAME.USER_PROFILE} component={UserProfile} />
      <Stack.Screen
        name={ROUTE_NAME.CREATE_NOTE}
        component={CreateNoteScreen}
      />
      <Stack.Screen name={ROUTE_NAME.CAMERA_VIEW} component={CameraView} />
    </Stack.Navigator>
  );
};
export default Navigation;
