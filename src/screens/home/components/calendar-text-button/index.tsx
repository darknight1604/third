import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';

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
};
export default CalendarTextButton;
