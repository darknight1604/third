import * as React from 'react';
import {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput, useTheme} from 'react-native-paper';
import {formatDate} from '../../utils/dateTimeUtil';
import WrapperInput from '@components/wrapper-input';

interface ICustomDatePickerProps {
  isRequired?: boolean;
  onConfirm?: (selected: Date) => void;
  errorMsg?: string;
  label: string;
  error?: boolean;
}

const CustomDatePicker = ({
  onConfirm,
  isRequired,
  errorMsg,
  label,
  error,
}: ICustomDatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const onPressTextField = () => {
    setOpen(true);
  };

  return (
    <WrapperInput
      label={label}
      isRequired={isRequired}
      error={error}
      errorMsg={errorMsg}>
      <TouchableWithoutFeedback onPress={onPressTextField}>
        <View pointerEvents="box-only">
          <TextInput
            value={formatDate(date)}
            editable={false}
            mode="outlined"
            outlineStyle={{borderRadius: theme.roundness}}
          />
        </View>
      </TouchableWithoutFeedback>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
          onConfirm?.(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </WrapperInput>
  );
};

export default CustomDatePicker;
