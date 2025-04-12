import {View} from 'react-native';
import {Text, TextInput, TextInputProps, useTheme} from 'react-native-paper';
import {styles} from './styles';
import {useMemo} from 'react';
import {TextStyle} from 'react-native';
import {StyleProp} from 'react-native';

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
  const errorStyle: StyleProp<TextStyle> = useMemo(() => {
    return {...styles.error, color: theme.colors.error};
  }, [theme.colors.error]);

  return (
    <View style={styles.container}>
      <Text>
        {label}
        {isRequired && <Text style={errorStyle}>*</Text>}
      </Text>
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
      {error && errorMsg && <Text style={errorStyle}>{errorMsg}</Text>}
    </View>
  );
};

export default ThemedTextInput;
