import {useMemo} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {styles} from './styles';
interface ITextInputLabelProps {
  label: string;
  isRequired?: boolean;
}
const TextInputLabel = ({label, isRequired = false}: ITextInputLabelProps) => {
  const theme = useTheme();
  const errorStyle: StyleProp<TextStyle> = useMemo(() => {
    return {...styles.error, color: theme.colors.error};
  }, [theme.colors.error]);

  return (
    <Text variant="labelMedium">
      {label}
      {isRequired && <Text style={errorStyle}>*</Text>}
    </Text>
  );
};

export default TextInputLabel;
