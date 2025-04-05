import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

interface IThemedTextProps extends TextProps {}

const ThemedText = ({children, style = {}}: IThemedTextProps) => {
  const theme = useTheme();
  const myStyle: StyleProp<TextStyle> = [
    style,
    {color: theme.colors.onBackground},
  ];

  return <Text style={myStyle}>{children}</Text>;
};

export default ThemedText;
