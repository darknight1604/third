import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput, useTheme} from 'react-native-paper';
import {formatDate, parse} from '../../utils/dateTimeUtil';
import WrapperInput from '@components/wrapper-input';
import {useField} from 'formik';

interface ICustomDatePickerProps {
  isRequired?: boolean;
  onConfirm?: (selected: Date) => void;
  errorMsg?: string;
  label: string;
  name: string;
  error?: boolean;
}

const CustomDatePicker = ({
  onConfirm,
  isRequired,
  errorMsg,
  label,
  error,
  name,
}: ICustomDatePickerProps) => {
  const [field, meta, helpers] = useField(name);

  const {value} = meta;
  const {setValue} = helpers;

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const onPressTextField = () => {
    setOpen(true);
  };

  const handleOnConfirm = useCallback(
    (selectedDate: Date) => {
      setOpen(false);
      onConfirm?.(selectedDate);

      setValue(formatDate(selectedDate));
    },
    [setValue, onConfirm],
  );

  const initialDate = useMemo(() => {
    return parse(value);
  }, [value]);

  return (
    <WrapperInput
      label={label}
      isRequired={isRequired}
      error={error}
      errorMsg={errorMsg}>
      <TouchableWithoutFeedback onPress={onPressTextField}>
        <View pointerEvents="box-only">
          <TextInput
            {...field}
            value={value}
            editable={false}
            mode="outlined"
            outlineStyle={{borderRadius: theme.roundness}}
            right={<TextInput.Icon icon="calendar" />}
          />
        </View>
      </TouchableWithoutFeedback>
      <DatePicker
        modal
        open={open}
        date={initialDate}
        onConfirm={handleOnConfirm}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </WrapperInput>
  );
};

export default CustomDatePicker;
