import {useAppState} from '@react-native-community/hooks';
import {useIsFocused} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {ROUTE_NAME} from '../../../constants';
import {RootStackParamList} from '../../../routes/Navigation';
import {styles} from './styles';

type CameraViewParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.CAMERA_VIEW
>;

const CameraView = ({navigation, route}: CameraViewParam) => {
  const params = route.params || {};
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = useMemo(
    () => isFocused && appState === 'active',
    [isFocused, appState],
  );
  const takePicture = async () => {
    const photo = await cameraRef.current?.takePhoto();
    params.onPost(photo);
    navigation.goBack();
  };

  useEffect(() => {
    if (hasPermission) {
      return;
    }
    const requestAndHandlePermission = async () => {
      const granted = await requestPermission();
      !granted && navigation.goBack();
    };

    requestAndHandlePermission();
  }, [hasPermission, navigation, requestPermission]);

  if (!device) {
    return (
      <View style={styles.noDevices}>
        <ProgressBar indeterminate color="#6200ee" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        photo={true}
        device={device}
        isActive={isActive}
        ref={cameraRef}
      />
      <View style={styles.takePicBtn}>
        <MaterialCommunityIcons
          name="target"
          size={52}
          onPress={takePicture}
          color="white"
        />
      </View>
    </View>
  );
};

export default CameraView;
