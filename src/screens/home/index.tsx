import {FloatingAction} from 'react-native-floating-action';
import BaseView from '../../components/base-view';
import ThemedText from '../../components/themed-text';
import {ROUTE_NAME} from '../../constants';
import {HomeParam} from '../../routes/Navigation';

const Home = ({navigation}: HomeParam) => {
  // const sheetRef = useRef<BottomSheetMethods>(null);

  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };
  return (
    <BaseView>
      <ThemedText>Something awesome is comming</ThemedText>
      {/* <Dropdown
        label="label"
        value="value"
        onPress={() => sheetRef.current?.open()}
      /> */}
      <FloatingAction showBackground={false} onPressMain={onPressFab} />
      {/* <BottomSheet ref={sheetRef}>
        <View>
          <Text>
            The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app craves
            🚀
          </Text>
        </View>
      </BottomSheet> */}
    </BaseView>
  );
};
export default Home;
