import {ReactNode} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {useTheme} from 'react-native-paper';

interface IBaseViewProps {
  children: ReactNode;
}

const BaseView = ({children}: IBaseViewProps) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{...styles.container, backgroundColor: theme.colors.background}}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default BaseView;
