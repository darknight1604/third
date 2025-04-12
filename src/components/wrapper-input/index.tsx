import {ReactNode, useMemo} from 'react';
import {styles} from './styles';
import {StyleProp, TextStyle, View} from 'react-native';
import TextInputLabel from '@components/text-input-label';
import {Text, useTheme} from 'react-native-paper';

interface IWrapperInputProps {
  children: ReactNode;
  isRequired?: boolean;
  errorMsg?: string;
  label: string;
  error?: boolean;
}

const WrapperInput = ({
  children,
  label,
  isRequired,
  error,
  errorMsg,
}: IWrapperInputProps) => {
  const theme = useTheme();
  const errorStyle: StyleProp<TextStyle> = useMemo(() => {
    return {...styles.error, color: theme.colors.error};
  }, [theme.colors.error]);

  return (
    <View style={styles.container}>
      <TextInputLabel label={label} isRequired={isRequired} />
      {children}
      {error && errorMsg && (
        <Text variant="bodySmall" style={errorStyle}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export default WrapperInput;
