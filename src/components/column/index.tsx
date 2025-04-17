import {FlexAlignType, View, ViewProps} from 'react-native';
import {styles} from './styles';

interface IColumnProps extends ViewProps {
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
}: IColumnProps) => {
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
