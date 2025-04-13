import {useEffect, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {ROUTE_NAME} from '../../constants';
import {deleteFile} from '../../utils/fileSystemUtil';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';
import {navigate} from '@third/routes/Navigation';

interface ICameraPickerProps {
  onTakePicture?: (photo: PhotoFile | undefined) => void;
  value?: string;
}

const CameraPicker = ({onTakePicture, value}: ICameraPickerProps) => {
  const {colors} = useTheme();
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [path, setPath] = useState<string | undefined>(value);

  const openCameraView = async () => {
    navigate(ROUTE_NAME.CAMERA_VIEW, {onPost: onPost});
  };

  const onPost = (photoFileValue: PhotoFile | undefined) => {
    setPath(photoFileValue?.path);
    onTakePicture?.(photoFileValue);
  };

  const onDeletePhotoFile = () => {
    deleteFile(path);
    setPath(undefined);
  };

  useEffect(() => {
    if (hasPermission) {
      return;
    }
    requestPermission();
  }, [hasPermission, requestPermission]);

  if (path) {
    return (
      <View style={[styles.thumbnail, {borderColor: colors.outline}]}>
        <Image source={{uri: 'file://' + path}} style={styles.photoFile} />
        <View style={styles.deletePhoto}>
          <MaterialCommunityIcons
            name="window-close"
            size={20}
            onPress={onDeletePhotoFile}
            color="white"
          />
        </View>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={openCameraView}>
      <View style={[styles.container, {borderColor: colors.outline}]}>
        <MaterialCommunityIcons
          name={device ? 'camera' : 'camera-off'}
          size={32}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CameraPicker;
