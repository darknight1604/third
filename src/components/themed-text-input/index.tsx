import {TextInput, TextInputProps, useTheme} from 'react-native-paper';

interface IThemedTextInputProps extends TextInputProps {
  label: string;
  value?: string;
}
const ThemedTextInput = ({label, value, ...rest}: IThemedTextInputProps) => {
  const theme = useTheme();

  return (
    <TextInput
      label={label}
      value={value}
      mode="outlined"
      outlineStyle={{borderRadius: theme.roundness}}
      {...rest}
    />
  );
};

export default ThemedTextInput;
