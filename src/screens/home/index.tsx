import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {ROUTE_NAME} from '../../constants';
import {HomeParam} from '../../routes/Navigation';

const Home = ({navigation}: HomeParam) => {
  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Home Screen 1</Text>
        <FloatingAction showBackground={false} onPressMain={onPressFab} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Home;
