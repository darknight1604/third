import {useFocusEffect} from '@react-navigation/native';
import {INote} from '@third/models/note';
import {getListNote} from '@third/services/noteService';
import {useCallback, useState} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import BaseView from '../../components/base-view';
import ThemedText from '../../components/themed-text';
import {ROUTE_NAME} from '../../constants';
import {HomeParam} from '../../routes/Navigation';
import Loading from './loading';

const Home = ({navigation}: HomeParam) => {
  const [loading, setLoading] = useState(true);
  const [listNote, setListNote] = useState<INote[]>([]);

  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const fetchData = async () => {
        const result = await getListNote({
          createdDateFrom: 1743465600000,
          createdDateTo: 1746057599000,
        });
        setListNote(result);
        setLoading(false);
      };
      fetchData();
    }, []),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <BaseView>
      <ThemedText>Something awesome is comming</ThemedText>
      {listNote.map(note => (
        <ThemedText key={note.id}>
          {note.id}-{note.value}-{note.note || 'N/A'}
        </ThemedText>
      ))}
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
