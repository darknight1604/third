import {Row} from '@third/components';
import {IRangeDate} from '@third/models/common';
import {formatDate, getCurrentWeekRange} from '@third/utils/dateTimeUtil';
import {useMemo, useState} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import BaseView from '../../components/base-view';
import {
  DATE_TIME_FORMAT,
  RANGE_DURATION_DATE_PICKER,
  ROUTE_NAME,
} from '../../constants';
import {HomeParam} from '../../routes/Navigation';
import CalendarTextButton from './components/calendar-text-button';
import TrackingLineChart from './components/tracking-line-chart';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';

const Home = ({navigation}: HomeParam) => {
  const {colors} = useTheme();
  const {startDate, endDate} = getCurrentWeekRange();
  const [rangeDate, setRangeDate] = useState<IRangeDate>({
    fromDate: startDate.toDate(),
    toDate: endDate.toDate(),
  });

  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };

  const openRangeDatePickerScreen = () => {
    navigation.navigate(ROUTE_NAME.RANGE_DATE_PICKER, {
      onConfirm: onConfirmRangeDate,
      maxRangeDuration: RANGE_DURATION_DATE_PICKER.max,
      minRangeDuration: RANGE_DURATION_DATE_PICKER.min,
    });
  };

  const onConfirmRangeDate = (rangeDateSelected: IRangeDate | undefined) => {
    if (!rangeDateSelected) {
      return;
    }
    setRangeDate(rangeDateSelected);
  };

  const filterRangeDateLabel = useMemo(() => {
    if (!rangeDate.fromDate || !rangeDate.toDate) {
      return [DATE_TIME_FORMAT.EMPTY_DATE, DATE_TIME_FORMAT.EMPTY_DATE].join(
        ' - ',
      );
    }
    return [
      formatDate(rangeDate.fromDate, DATE_TIME_FORMAT.DATE2),
      formatDate(rangeDate.toDate, DATE_TIME_FORMAT.DATE2),
    ].join(' - ');
  }, [rangeDate.fromDate, rangeDate.toDate]);

  return (
    <BaseView style={styles.container}>
      <Row mainAxisAlignment="flex-end" style={styles.calendarRow}>
        <Icon
          name="calendar"
          size={22}
          color={colors.primary}
          style={styles.iconCalendar}
        />

        <CalendarTextButton
          label={filterRangeDateLabel}
          onPress={openRangeDatePickerScreen}
        />
      </Row>
      <TrackingLineChart rangeDate={rangeDate} />
      <FloatingAction
        showBackground={false}
        onPressMain={onPressFab}
        color={colors.primary}
      />
    </BaseView>
  );
};
export default Home;
