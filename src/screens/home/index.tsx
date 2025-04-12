import BottomSheet, {BottomSheetMethods} from '@devvie/bottom-sheet';
import {useRef} from 'react';
import {Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {CameraPicker, ThemedTextInput} from '../../components';
import BaseView from '../../components/base-view';
import Dropdown from '../../components/dropdown';
import ThemedText from '../../components/themed-text';
import {ROUTE_NAME} from '../../constants';
import {HomeParam} from '../../routes/Navigation';

const Home = ({navigation}: HomeParam) => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };
  return (
    <BaseView>
      <ThemedText>Home Screen 1</ThemedText>
      <Dropdown
        label="label"
        value="value"
        onPress={() => sheetRef.current?.open()}
      />
      <ThemedTextInput label="hello" inputMode="numeric" />
      <CameraPicker />
      <FloatingAction showBackground={false} onPressMain={onPressFab} />
      <BottomSheet ref={sheetRef}>
        <View>
          <Text>
            The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app craves
            🚀
          </Text>
        </View>
      </BottomSheet>
    </BaseView>
  );
};
export default Home;
