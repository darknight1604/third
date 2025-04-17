import {ReactNode} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';

interface IBaseViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BaseView = ({children, style}: IBaseViewProps) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
            style,
          ]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BaseView;
