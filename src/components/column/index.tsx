import {FlexAlignType, View, ViewProps} from 'react-native';
import {styles} from './styles';

interface IRowProps extends ViewProps {
  mainAxisAlignment?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  crossAxisAlignment?: FlexAlignType | undefined;
}

const Column = ({
  children,
  mainAxisAlignment,
  crossAxisAlignment,
  style,
}: IRowProps) => {
  return (
    <View
      style={[
        styles.base,
        {
          alignItems: crossAxisAlignment,
          justifyContent: mainAxisAlignment,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Column;
