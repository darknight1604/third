import {ReactNode} from 'react';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';

interface IBaseViewProps {
  children: ReactNode;
}

const BaseView = ({children}: IBaseViewProps) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
          }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BaseView;
