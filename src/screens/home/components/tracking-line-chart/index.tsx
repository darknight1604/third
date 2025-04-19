import {DATE_TIME_FORMAT} from '@third/constants';
import {locales} from '@third/localizations/locale';
import {IRangeDate} from '@third/models/common';
import {IChartDataByMonth} from '@third/models/note';
import {getChartData} from '@third/services/noteService';
import {addOpacityToHex} from '@third/utils/colorUtil';
import {formatDate, parse} from '@third/utils/dateTimeUtil';
import dayjs from 'dayjs';
import {useEffect, useMemo, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {useTheme} from 'react-native-paper';
import Loading from '../loading';
import {styles} from './styles';

const screenWidth = Dimensions.get('window').width;
const chartHeight = 250;

interface ITrackingLineChartProps {
  rangeDate: IRangeDate;
}

const TrackingLineChart = ({rangeDate}: ITrackingLineChartProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<IChartDataByMonth | undefined>();

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => addOpacityToHex(theme.colors.onBackground, opacity),
  };

  const lineChartData: LineChartData | undefined = useMemo(() => {
    if (!chartData || !chartData.datas) {
      return undefined;
    }

    const labels: string[] =
      chartData.datas.map(data =>
        formatDate(
          parse(data.date, DATE_TIME_FORMAT.DATE),
          DATE_TIME_FORMAT.DATE3,
        ),
      ) || [];

    const datas = chartData.datas?.map(data => {
      return data.notes.reduce(
        (sum, item) => sum + parseInt(item.value || '0', 10),
        0,
      );
    });

    return {
      labels: labels,
      datasets: [
        {
          data: datas,
          color: (opacity = 0.5) =>
            addOpacityToHex(theme.colors.primary, opacity),
          strokeWidth: 0.5,
        },
      ],
      legend: [locales.noteValueTrackingChart],
    };
  }, [chartData, theme.colors.primary]);

  useEffect(() => {
    if (!rangeDate.fromDate || !rangeDate.toDate) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      const result = await getChartData({
        fromDate: dayjs(rangeDate.fromDate).valueOf(),
        toDate: dayjs(rangeDate.toDate).valueOf(),
      });
      if (!result) {
        return;
      }
      setChartData(result);
      setLoading(false);
    };
    fetchData();
  }, [rangeDate.fromDate, rangeDate.toDate]);

  if (!lineChartData) {
    return (
      <View style={styles.container}>
        <View
          style={{
            ...styles,
            width: screenWidth - 32,
            height: chartHeight,
            backgroundColor: theme.colors.backdrop,
          }}>
          <Loading />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LineChart
        bezier
        verticalLabelRotation={30}
        data={lineChartData}
        width={screenWidth - 48}
        height={chartHeight}
        chartConfig={chartConfig}
        withInnerLines={false}
        style={{
          ...styles.chart,
          borderRadius: theme.roundness,
          borderColor: theme.colors.outline,
        }}
      />
      {loading && (
        <View
          style={{
            ...styles.overlay,
            width: screenWidth - 32,
            height: chartHeight,
            backgroundColor: theme.colors.backdrop,
          }}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default TrackingLineChart;
