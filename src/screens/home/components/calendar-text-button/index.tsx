import {
    Pressable
} from 'react-native';
import { Text } from 'react-native-paper';

interface ICalendarTextButtonProps {
  label: string;
  onPress: () => void;
}

const CalendarTextButton = ({label, onPress}: ICalendarTextButtonProps) => {
  return (
    <Pressable onPress={onPress} android_ripple={null}>
      <Text variant="bodyLarge">{label}</Text>
    </Pressable>
  );
  //   return Platform.OS === 'ios' ? (
  //     <Button
  //       icon="calendar"
  //       mode="text"
  //       onPress={onPress}
  //       compact
  //       rippleColor="transparent"
  //       style={styles.button}
  //       elevation={0}>
  //       <Text variant="bodyLarge">{label}</Text>
  //     </Button>
  //   ) : (
  //     <TouchableWithoutFeedback onPress={onPress}>
  //       <View>
  //         <MaterialCommunityIcons name="calendar" size={20} color="red" />
  //         <Text variant="bodyLarge">{label}</Text>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   );
};
export default CalendarTextButton;
