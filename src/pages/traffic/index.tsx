import { DatePicker, Image, Space, Table, TimePicker } from 'antd';
import { useState } from 'react';
import PageLayout from '_components/PageLayout';
import { trafficTableColumns } from './constants';
import styles from './s.module.scss';
import { TrafficItem, WeatherItem } from './types';
import { getTraffic, getWeather, mapTrafficToTable, STATUS } from './utils';

function App() {
  // TODO: consider useRef
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [status, setStaus] = useState(STATUS.SUCCESS);
  const [traffic, setTraffic] = useState<Array<TrafficItem>>([]);
  const [weather, setWeather] = useState<Array<WeatherItem>>([]);
  const [image, setImage] = useState<string>('');

  const queryTraffic = (dateString: string, timeString: string) => {
    if (dateString) {
      getWeather(setStaus, setWeather, dateString, timeString);
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
          dataSource={traffic.map(mapTrafficToTable)}
          columns={trafficTableColumns}
          rowSelection={{
            type: 'radio',
            onSelect: (record) => {
              setImage(traffic?.[record.key]?.image);
            },
          }}
        />
        <div>{weather?.[0]?.area}</div>
      </Space>
      <Image src={image} />
    </PageLayout>
  );
}

export default App;
