import {SafeAreaView, Text, View} from 'react-native';
import {locales} from '../../localizations/locale';

const CreateNoteScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>{locales.createNote}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateNoteScreen;
