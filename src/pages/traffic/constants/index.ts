export const API_V1_TRAFFIC_IMAGES: string = 'https://api.data.gov.sg/v1/transport/traffic-images';
export const API_V1_WEATHER: string = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

export const trafficTableColumns: Array<{
  title: string;
  dataIndex: string;
  key: string;
}> = [
  { title: 'Camera', dataIndex: 'cid', key: 'cid' },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Timestamp', dataIndex: 'time', key: 'time' },
];
