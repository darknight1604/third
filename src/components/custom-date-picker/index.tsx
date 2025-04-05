import * as React from 'react';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {TextInput, useTheme} from 'react-native-paper';
import {formatDate} from '../../utils/dateTimeUtil';
import {TouchableWithoutFeedback, View} from 'react-native';

interface ICustomDatePickerProps {
  onConfirm?: (selected: Date) => void;
}

const CustomDatePicker = ({onConfirm}: ICustomDatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const onPressTextField = () => {
    setOpen(true);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onPressTextField}>
        <View pointerEvents="box-only">
          <TextInput
            label="Date"
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
    </>
  );
};

export default CustomDatePicker;
