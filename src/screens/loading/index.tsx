import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ROUTE_NAME} from '@third/constants';
import {useDisableBackButton} from '@third/hooks/useDisableBackButton';
import {RootStackParamList} from '@third/routes/Navigation';
import LottieView from 'lottie-react-native';
import {useEffect} from 'react';
import {styles} from './styles';

type LoadingScreenParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.LOADING
>;

const LoadingScreen = ({route}: LoadingScreenParam) => {
  const {onPost} = route.params;

  useDisableBackButton();

  useEffect(() => {
    onPost?.();
  }, [onPost]);

  return (
    <LottieView
      source={require('@lotties/loading-animation.lottie')}
      autoPlay
      loop
      style={styles.container}
    />
  );
};

export default LoadingScreen;
