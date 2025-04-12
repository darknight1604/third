import WrapperInput from '@components/wrapper-input';
import {TextInput, TextInputProps, useTheme} from 'react-native-paper';
import {styles} from './styles';

interface IThemedTextInputProps extends TextInputProps {
  isRequired?: boolean;
  value?: string;
  errorMsg?: string;
  label: string;
}
const ThemedTextInput = ({
  label,
  value,
  isRequired,
  error,
  errorMsg,
  ...rest
}: IThemedTextInputProps) => {
  const theme = useTheme();

  return (
    <WrapperInput
      label={label}
      isRequired={isRequired}
      error={error}
      errorMsg={errorMsg}>
      <TextInput
        label={undefined}
        value={value}
        mode="outlined"
        outlineColor={error ? theme.colors.error : undefined}
        activeOutlineColor={error ? theme.colors.error : undefined}
        outlineStyle={{
          borderRadius: theme.roundness,
        }}
        {...rest}
      />
    </WrapperInput>
  );
};

const ThemedTextAreaInput = ({...rest}: IThemedTextInputProps) => {
  return <ThemedTextInput {...rest} style={styles.textArea} multiline />;
};

export default {ThemedTextInput, ThemedTextAreaInput};
