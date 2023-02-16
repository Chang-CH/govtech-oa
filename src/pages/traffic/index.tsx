/** React hooks */
import { useEffect, useState } from 'react';

/** Components */
import dayjs from 'dayjs';
import PageLayout from '_components/PageLayout';

/** Types */
import { TrafficItem } from './types';

/** Util functions */
import { getTraffic, getTrafficTableColumns, getWeather, mapDataToTable } from './utils';
import { FALLBACK_IMAGE, MOBILE_WIDTH } from '_constants/general';
import { DatePicker, Image, Space, Table, TimePicker, message } from 'antd';

/** Traffic page main component */
function App() {
  /* States */
  // check Mobile
  const [width, setWidth] = useState<number>(window.innerWidth);
  // API load state. We use a number so if multiple api calls are made load state does not change to success on first API return
  const [waiting, setWaiting] = useState(0);
  // UI data
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [traffic, setTraffic] = useState<Array<TrafficItem>>([]);
  const [weather, setWeather] = useState<{ [key: string]: { forecast: string; latitude: number; longitude: number } }>(
    {},
  );
  // Result visualisation states
  const [image, setImage] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /** Antd notification */
  const [messageApi, contextHolder] = message.useMessage();

  /** Helper functions */
  const onSuccess = () => {
    // All APIs returned
    if (waiting <= 1) {
      messageApi.open({
        key: 'status',
        type: 'success',
        content: 'data updated!',
        duration: 2,
      });
    }
    // prevent underflow when API error reset waiting to 0
    setWaiting((count) => (count > 0 ? count - 1 : 0));
  };

  const onFailure = () => {
    // All APIs returned
    if (waiting <= 1) {
      messageApi.open({
        key: 'status',
        type: 'error',
        content: 'data updated!',
        duration: 2,
      });
    }
    // No need to wait, already failed
    setWaiting(0);
  };

  const queryTraffic = (dateString: string, timeString: string, onSuccess?: () => void, onFailure?: () => void) => {
    // Although we can query weather with only date, there is no traffic data to join with anyways
    if (!dateString || !timeString) {
      return;
    }
    messageApi.open({
      key: 'status',
      type: 'loading',
      content: 'fetching data...',
    });

    // Reset table selection, if not row key will still be selected
    setSelectedRowKeys([]);
    setImage('');

    // We trigger 2 APIs, so increment waiting by 2.
    setWaiting((count) => count + 2);
    getWeather(setWeather, dateString, timeString, onSuccess, onFailure);
    getTraffic(setTraffic, dateString, timeString, onSuccess, onFailure);
  };

  // Mobile detection utils. we use window width instead of userAgent since userAgent is not always supported by browsers.
  const onResize = () => setWidth(window.innerWidth);

  // Add window size listeners, and populate initial data.
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
            allowClear={false}
          />
          <TimePicker
            onChange={(_date, timeString) => {
              setTime(timeString);
              queryTraffic(date, timeString, onSuccess, onFailure);
            }}
            defaultValue={dayjs()}
            allowClear={false}
          />
        </Space>
        <Table
          dataSource={traffic.map(mapDataToTable(weather))}
          columns={
            width <= MOBILE_WIDTH ? getTrafficTableColumns(weather).slice(1, 3) : getTrafficTableColumns(weather)
          }
          rowSelection={{
            type: 'radio',
            selectedRowKeys,
            onSelect: (record) => {
              setImage(traffic?.[record.key]?.image);
              setSelectedRowKeys([record.key]);
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
            <Image src={image} alt="Camera image" fallback={FALLBACK_IMAGE} />
          ) : (
            <p>Select a date and time, then select a camera to view image.</p>
          )}
        </div>
      </PageLayout>
    </>
  );
}

export default App;
