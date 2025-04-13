import {useCallback} from 'react';
import CameraPicker from '../camera-picker';
import WrapperInput from '../wrapper-input';
import {useField} from 'formik';
import {PhotoFile} from 'react-native-vision-camera';

interface ITakePictureInputProps {
  isRequired?: boolean;
  errorMsg?: string;
  label: string;
  name: string;
  error?: boolean;
}

const TakePictureInput = ({
  isRequired,
  errorMsg,
  label,
  error,
  name,
}: ITakePictureInputProps) => {
  const [, meta, helpers] = useField(name);
  const {setValue} = helpers;
  const {value} = meta;

  const onTakePicture = useCallback(
    (photo: PhotoFile | undefined) => {
      if (!photo) {
        return;
      }
      setValue(photo.path);
    },
    [setValue],
  );

  return (
    <WrapperInput
      label={label}
      isRequired={isRequired}
      error={error}
      errorMsg={errorMsg}>
      <CameraPicker onTakePicture={onTakePicture} value={value} />
    </WrapperInput>
  );
};

export default TakePictureInput;
