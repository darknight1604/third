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
import dayjs from 'dayjs';

export type ScreenParam = NativeStackScreenProps<
  RootStackParamList,
  typeof ROUTE_NAME.RANGE_DATE_PICKER
>;

const RangeDatePickerScreen = ({navigation, route}: ScreenParam) => {
  const {colors} = useTheme();
  const [rangeDate, setRangeDate] = useState<IRangeDate>({});
  const {onConfirm, maxRangeDuration, minRangeDuration} = route.params;

  const onSelectDate: DateChangedCallback = (
    date: Date | undefined | null,
    type: ChangedDate,
  ) => {
    if (!date) {
      return;
    }

    if (type === 'START_DATE') {
      setRangeDate({
        ...rangeDate,
        fromDate: dayjs(date).startOf('day').toDate(),
      });
      return;
    }
    setRangeDate({...rangeDate, toDate: dayjs(date).endOf('day').toDate()});
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
            maxRangeDuration={maxRangeDuration}
            minRangeDuration={minRangeDuration}
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
