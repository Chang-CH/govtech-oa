import { TableEntry } from '../types';

/* API routes */
export const API_V1_TRAFFIC_IMAGES = 'https://api.data.gov.sg/v1/transport/traffic-images';
export const API_V1_WEATHER = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

/* Misc constants */
// table configuration, specifies columns and schema
export const getTrafficTableColumns = (locations: Array<{ text: string; value: string }>) => [
  {
    title: 'Camera',
    dataIndex: 'cid',
    key: 'cid',
    sorter: (a: TableEntry, b: TableEntry) => {
      return parseInt(a.cid) - parseInt(b.cid);
    },
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    filters: locations,
    filterSearch: true,
    onFilter: (value: string, record: TableEntry) => record.location.startsWith(value),
  },
  { title: 'Weather', dataIndex: 'weather', key: 'weather' },
];

// Array<{
//   title: string;
//   dataIndex: string;
//   key: string;
//   sorter?: (a: TableEntry, b: TableEntry) => number;
//   filters?: Array<{ text: string; value: string }>;
//   filterSearch?: boolean;
//   onFilter?: (value: string, record: TableEntry) => boolean;
// }>;
