import {TouchableWithoutFeedback, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import {styles} from './styles';

interface IDropdownProps {
  label: string;
  value?: string;
  onPress?: () => void;
}

const Dropdown = ({label, value, onPress}: IDropdownProps) => {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View pointerEvents="box-only">
        <TextInput
          label={label}
          value={value}
          editable={false}
          mode="outlined"
          outlineStyle={{...styles.outlineStyle, borderRadius: theme.roundness}}
          right={<TextInput.Icon icon="chevron-down" />}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Dropdown;
