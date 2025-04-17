import {useFocusEffect} from '@react-navigation/native';
import {Column, Row} from '@third/components';
import {IRangeDate} from '@third/models/common';
import {IChartDataByMonth} from '@third/models/note';
import {getChartData} from '@third/services/noteService';
import {formatDate, getStartAndEndOfMonth} from '@third/utils/dateTimeUtil';
import {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {Text} from 'react-native-paper';
import BaseView from '../../components/base-view';
import {DATE_TIME_FORMAT, ROUTE_NAME} from '../../constants';
import {HomeParam} from '../../routes/Navigation';
import CalendarTextButton from './components/calendar-text-button';
import Loading from './components/loading';
import {styles} from './styles';

const Home = ({navigation}: HomeParam) => {
  const {startDate, endDate} = getStartAndEndOfMonth();
  const [loading, setLoading] = useState(true);
  const [rangeDate, setRangeDate] = useState<IRangeDate>({
    fromDate: new Date(startDate),
    toDate: new Date(endDate),
  });
  const [chartData, setChartData] = useState<IChartDataByMonth | undefined>();

  const onPressFab = () => {
    navigation.navigate(ROUTE_NAME.CREATE_NOTE);
  };

  const openRangeDatePickerScreen = () => {
    navigation.navigate(ROUTE_NAME.RANGE_DATE_PICKER, {
      onConfirm: onConfirmRangeDate,
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

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const fetchData = async () => {
        const result = await getChartData({
          fromDate: startDate,
          toDate: endDate,
        });
        if (!result) {
          return;
        }
        setLoading(false);
        setChartData(result);
      };
      fetchData();
    }, [endDate, startDate]),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <BaseView style={styles.container}>
      <Row mainAxisAlignment="flex-end">
        <CalendarTextButton
          label={filterRangeDateLabel}
          onPress={openRangeDatePickerScreen}
        />
      </Row>
      <View>
        {chartData?.datas?.map(data => (
          <Column>
            <Text>{data.date}</Text>
            <Text>{data.notes.map(note => note.value)}</Text>
          </Column>
        ))}
      </View>
      <FloatingAction showBackground={false} onPressMain={onPressFab} />
    </BaseView>
  );
};
export default Home;
