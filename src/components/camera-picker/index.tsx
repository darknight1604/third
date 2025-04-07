import {useEffect, useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {styles} from './styles';
import {navigate} from '../../routes/Navigation';
import {ROUTE_NAME} from '../../constants';
import {deleteFile} from '../../utils/fileSystemUtil';

const CameraPicker = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [photoFile, setPhotoFile] = useState<PhotoFile | undefined>(undefined);

  const openCameraView = async () => {
    navigate(ROUTE_NAME.CAMERA_VIEW, {onPost: onPost});
  };

  const onPost = (photoFileValue: PhotoFile | undefined) => {
    setPhotoFile(photoFileValue);
  };

  const onDeletePhotoFile = () => {
    deleteFile(photoFile?.path);
    setPhotoFile(undefined);
  };

  useEffect(() => {
    if (hasPermission) {
      return;
    }
    requestPermission();
  }, [hasPermission, requestPermission]);
  if (photoFile) {
    return (
      <View style={styles.thumbnail}>
        <Image
          source={{uri: 'file://' + photoFile.path}}
          style={styles.photoFile}
        />
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
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={device ? 'camera' : 'camera-off'}
          size={32}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CameraPicker;
