import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {styles} from './styles';

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@lotties/download.lottie')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Loading;
