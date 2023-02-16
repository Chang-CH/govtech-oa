import { DatePicker, Image, Space, Table, TimePicker } from 'antd';
import { useState } from 'react';
import PageLayout from '_components/PageLayout';
import { trafficTableColumns } from './constants';
import { TrafficItem, WeatherItem, WeatherMetaData } from './types';
import { getTraffic, getWeather, mapDataToTable, STATUS } from './utils';

function App() {
  // TODO: consider useRef
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [status, setStaus] = useState(STATUS.SUCCESS);
  const [traffic, setTraffic] = useState<Array<TrafficItem>>([]);
  const [weather, setWeather] = useState<Array<WeatherItem>>([]);
  const [areaData, setAreaData] = useState<Array<WeatherMetaData>>([]);
  const [image, setImage] = useState<string>('');

  const queryTraffic = (dateString: string, timeString: string) => {
    if (dateString) {
      getWeather(
        setStaus,
        (weather: Array<WeatherItem>, data: Array<WeatherMetaData>) => {
          setWeather(weather);
          setAreaData(data);
        },
        dateString,
        timeString,
      );
      if (timeString) {
        getTraffic(setStaus, setTraffic, dateString, timeString);
      }
    }
  };

  return (
    <PageLayout>
      <Space>
        <DatePicker
          onChange={(_date, dateString) => {
            setDate(dateString);
            queryTraffic(dateString, time);
          }}
        />
        <TimePicker
          onChange={(_date, timeString) => {
            setDate(timeString);
            queryTraffic(date, timeString);
          }}
        />
      </Space>
      <Space>
        <Table
          dataSource={traffic.map(mapDataToTable(areaData, weather))}
          columns={trafficTableColumns}
          rowSelection={{
            type: 'radio',
            onSelect: (record) => {
              setImage(traffic?.[record.key]?.image);
            },
          }}
        />
      </Space>
      <Image src={image} />
    </PageLayout>
  );
}

export default App;
