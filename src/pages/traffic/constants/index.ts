import { TableEntry } from '../types';

export const API_V1_TRAFFIC_IMAGES: string = 'https://api.data.gov.sg/v1/transport/traffic-images';
export const API_V1_WEATHER: string = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

export const trafficTableColumns: Array<{
  title: string;
  dataIndex: string;
  key: string;
  [key: string]: any;
}> = [
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
    filters: [
      { text: 'Ang Mo Kio', value: 'Ang Mo Kio' },
      { text: 'Bedok', value: 'Bedok' },
      { text: 'Bishan', value: 'Bishan' },
      { text: 'Boon Lay', value: 'Boon Lay' },
      { text: 'Bukit Batok', value: 'Bukit Batok' },
      { text: 'Bukit Merah', value: 'Bukit Merah' },
      { text: 'Bukit Panjang', value: 'Bukit Panjang' },
      { text: 'Bukit Timah', value: 'Bukit Timah' },
      { text: 'Central Water Catchment', value: 'Central Water Catchment' },
      { text: 'Changi', value: 'Changi' },
      { text: 'Choa Chu Kang', value: 'Choa Chu Kang' },
      { text: 'Clementi', value: 'Clementi' },
      { text: 'City', value: 'City' },
      { text: 'Geylang', value: 'Geylang' },
      { text: 'Hougang', value: 'Hougang' },
      { text: 'Jalan Bahar', value: 'Jalan Bahar' },
      { text: 'Jurong East', value: 'Jurong East' },
      { text: 'Jurong Island', value: 'Jurong Island' },
      { text: 'Jurong West', value: 'Jurong West' },
      { text: 'Kallang', value: 'Kallang' },
      { text: 'Lim Chu Kang', value: 'Lim Chu Kang' },
      { text: 'Mandai', value: 'Mandai' },
      { text: 'Marine Parade', value: 'Marine Parade' },
      { text: 'Novena', value: 'Novena' },
      { text: 'Pasir Ris', value: 'Pasir Ris' },
      { text: 'Paya Lebar', value: 'Paya Lebar' },
      { text: 'Pioneer', value: 'Pioneer' },
      { text: 'Pulau Tekong', value: 'Pulau Tekong' },
      { text: 'Pulau Ubin', value: 'Pulau Ubin' },
      { text: 'Punggol', value: 'Punggol' },
      { text: 'Queenstown', value: 'Queenstown' },
      { text: 'Seletar', value: 'Seletar' },
      { text: 'Sembawang', value: 'Sembawang' },
      { text: 'Sengkang', value: 'Sengkang' },
      { text: 'Sentosa', value: 'Sentosa' },
      { text: 'Serangoon', value: 'Serangoon' },
      { text: 'Southern Islands', value: 'Southern Islands' },
      { text: 'Sungei Kadut', value: 'Sungei Kadut' },
      { text: 'Tampines', value: 'Tampines' },
      { text: 'Tanglin', value: 'Tanglin' },
      { text: 'Tengah', value: 'Tengah' },
      { text: 'Toa Payoh', value: 'Toa Payoh' },
      { text: 'Tuas', value: 'Tuas' },
      { text: 'Western Islands', value: 'Western Islands' },
      { text: 'Western Water Catchment', value: 'Western Water Catchment' },
      { text: 'Woodlands', value: 'Woodlands' },
      { text: 'Yishun', value: 'Yishun' },
    ],
    filterSearch: true,
    onFilter: (value: string, record: TableEntry) => record.location.startsWith(value),
  },
  { title: 'Weather', dataIndex: 'weather', key: 'weather' },
];
