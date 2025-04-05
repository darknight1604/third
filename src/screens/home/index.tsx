import {FloatingAction} from 'react-native-floating-action';
import BaseView from '../../components/base-view';
import ThemedText from '../../components/themed-text';
import {ROUTE_NAME} from '../../constants';
import {HomeParam} from '../../routes/Navigation';

const Home = ({navigation}: HomeParam) => {
  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };

  return (
    <BaseView>
      <ThemedText>Home Screen 1</ThemedText>
      <FloatingAction showBackground={false} onPressMain={onPressFab} />
    </BaseView>
  );
};
export default Home;
