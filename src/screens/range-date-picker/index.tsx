import {BaseView, SubmitButton} from '@third/components';
import {locales} from '@third/localizations/locale';
import {IRangeDate} from '@third/models/common';
import {useState} from 'react';
import {View} from 'react-native';
import CalendarPicker, {
  ChangedDate,
  DateChangedCallback,
} from 'react-native-calendar-picker';
import {useTheme} from 'react-native-paper';
import {styles} from './styles';
import {ROUTE_NAME} from '@third/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@third/routes/Navigation';

export type ScreenParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.RANGE_DATE_PICKER
>;

const RangeDatePickerScreen = ({navigation, route}: ScreenParam) => {
  const {colors} = useTheme();
  const [rangeDate, setRangeDate] = useState<IRangeDate>({});
  const {onConfirm} = route.params;

  const onSelectDate: DateChangedCallback = (
    date: Date | undefined | null,
    type: ChangedDate,
  ) => {
    if (!date) {
      return;
    }

    if (type === 'START_DATE') {
      setRangeDate({...rangeDate, fromDate: date});
      return;
    }
    setRangeDate({...rangeDate, toDate: date});
  };

  const handleOnConfirm = () => {
    onConfirm?.(rangeDate);
    navigation.goBack();
  };

  return (
    <BaseView>
      <View style={styles.expand}>
        <View style={styles.expand}>
          <CalendarPicker
            allowRangeSelection
            startFromMonday
            onDateChange={onSelectDate}
            selectedDayColor={colors.primary}
            selectedDayTextColor={colors.onPrimary}
          />
        </View>
        <View style={styles.submitBtn}>
          <SubmitButton
            onSubmit={handleOnConfirm}
            label={locales.confirmLabel}
          />
        </View>
      </View>
    </BaseView>
  );
};

export default RangeDatePickerScreen;
