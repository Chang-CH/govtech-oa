import { DatePicker, Image, message, Space, Table, TimePicker } from 'antd';
import * as dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PageLayout from '_components/PageLayout';
import { trafficTableColumns } from './constants';
import { TrafficItem, WeatherItem, WeatherMetaData } from './types';
import { getTraffic, getWeather, mapDataToTable, STATUS } from './utils';

function App() {
  /* States */
  // check Mobile
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  // API load state
  const [waiting, setWaiting] = useState(0);
  const [traffic, setTraffic] = useState<Array<TrafficItem>>([]);
  const [weather, setWeather] = useState<Array<WeatherItem>>([]);
  const [areaData, setAreaData] = useState<Array<WeatherMetaData>>([]);
  const [image, setImage] = useState<string>('');

  /* Notification */
  const [messageApi, contextHolder] = message.useMessage();

  const onSuccess = () => {
    if (waiting <= 1) {
      messageApi.open({
        key: 'status',
        type: 'success',
        content: 'data updated!',
        duration: 2,
      });
    }
    setWaiting((count) => count - 1);
  };

  const onFailure = () => {
    if (waiting <= 1) {
      messageApi.open({
        key: 'status',
        type: 'error',
        content: 'data updated!',
        duration: 2,
      });
    }
    setWaiting((count) => count - 1);
  };

  const queryTraffic = (dateString: string, timeString: string, onSuccess?: () => void, onFailure?: () => void) => {
    if (dateString && timeString) {
      messageApi.open({
        key: 'status',
        type: 'loading',
        content: 'fetching data...',
      });
      setWaiting((count) => count + 2);
      getWeather(
        (weather: Array<WeatherItem>, data: Array<WeatherMetaData>) => {
          setWeather(weather);
          setAreaData(data);
        },
        dateString,
        timeString,
        onSuccess,
        onFailure,
      );
      getTraffic(setTraffic, dateString, timeString, onSuccess, onFailure);
    }
  };

  const onResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    queryTraffic(dayjs().format('YYYY-MM-DD'), dayjs().format('HH:mm:ss'), onSuccess, onFailure);
    setDate(dayjs().format('YYYY-MM-DD'));
    setTime(dayjs().format('HH:mm:ss'));
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      {contextHolder}
      <PageLayout>
        <h1>Traffic/Weather app</h1>
        <Space style={{ marginBottom: '1ch' }}>
          <p style={{ marginLeft: 'auto' }}>Select a date and time: </p>
          <DatePicker
            onChange={(_date, dateString) => {
              setDate(dateString);
              queryTraffic(dateString, time, onSuccess, onFailure);
            }}
            disabledDate={(current) => {
              return dayjs() < current;
            }}
            defaultValue={dayjs()}
          />
          <TimePicker
            onChange={(_date, timeString) => {
              setTime(timeString);
              queryTraffic(date, timeString, onSuccess, onFailure);
            }}
            defaultValue={dayjs()}
          />
        </Space>
        <Table
          dataSource={traffic.map(mapDataToTable(areaData, weather))}
          columns={width <= 768 ? trafficTableColumns.slice(0, 2) : trafficTableColumns}
          rowSelection={{
            type: 'radio',
            onSelect: (record) => {
              setImage(traffic?.[record.key]?.image);
            },
          }}
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 25, 50],
          }}
          loading={waiting > 0}
          style={{
            minWidth: '100%',
            marginBottom: '1ch',
          }}
        />
        <div>
          {image ? (
            <Image
              src={image}
              alt="Camera image"
              fallback="data:image/png;base64,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"
            />
          ) : (
            <p>Select a date and time, then select a camera to view image.</p>
          )}
        </div>
      </PageLayout>
    </>
  );
}

export default App;
