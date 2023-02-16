/** Constants */
import { API_V1_TRAFFIC_IMAGES, API_V1_WEATHER } from '../constants';

/** Types */
import { TableEntry, TrafficItem, TrafficResponse, WeatherItem, WeatherMetaData, WeatherResponse } from '../types';

/**
 * API fetch method for traffic cameras
 *
 * @param setResult callback function to receive formatted results
 * @param date YYYY-MM-DD date to query for data
 * @param time HH:mm:ss time to query for data
 * @param onSuccess callback function to trigger on success
 * @param onFailure callback function to trigger on failure
 * @returns Promise for the API fetch
 */
export const getTraffic = (
  setResult: (result: Array<TrafficItem>) => void,
  date: string,
  time: string,
  onSuccess?: () => void,
  onFailure?: () => void,
) => {
  return fetch(`${API_V1_TRAFFIC_IMAGES}?date_time=${date}T${time}`)
    .then((response: any) => response.json())
    .then((result: TrafficResponse) => {
      setResult(result?.items?.[0]?.cameras ?? []);
      onSuccess && onSuccess();
    })
    .catch((err) => onFailure && onFailure());
};

/**
 * Higher order function to produce a mapper function converting traffic and weather data into antd table entries
 * @param metaArray metadata array to be used for geolocating cameras
 * @param weatherArray weather array to be joined with camera data
 * @returns mapper function to map traffic data to antd table data
 */
export const mapDataToTable =
  (metaArray: Array<WeatherMetaData>, weatherArray: Array<WeatherItem>) => (item: TrafficItem, key: number) => {
    let area = 'unknown';
    let weather = 'unknown';
    let distance = Infinity;

    // if item has location data, try to reverse latlong by euclidean distance
    if (item?.location) {
      for (const metaData of metaArray) {
        const tempDistance =
          Math.abs(item?.location?.latitude - metaData.label_location.latitude) +
          Math.abs(item?.location?.longitude - metaData.label_location.longitude);

        if (tempDistance < distance) {
          distance = tempDistance;
          area = metaData.name;
        }
      }
    }

    // If valid location is found, find corresponding weather
    if (area != 'unknown') {
      for (const weatherInfo of weatherArray) {
        if (weatherInfo?.area === area) {
          weather = weatherInfo?.forecast ?? 'unknown';
        }
      }
    }

    return {
      key,
      cid: item.camera_id,
      location: area,
      weather: weather,
    };
  };

/**
 * API fetch method for weather data
 *
 * @param setResult callback function to receive formatted results
 * @param date YYYY-MM-DD date to query for data
 * @param time HH:mm:ss time to query for data
 * @param onSuccess callback function to trigger on success
 * @param onFailure callback function to trigger on failure
 * @returns Promise for the API fetch
 */
export const getWeather = (
  setResult: (weather: Array<WeatherItem>, meta: Array<WeatherMetaData>) => void,
  date: string,
  time?: string,
  onSuccess?: () => void,
  onFailure?: () => void,
) => {
  if (!time) {
    return fetch(`${API_V1_WEATHER}?date=${date}`)
      .then((response: any) => response.json())
      .then((result: WeatherResponse) => {
        setResult(result?.items?.[0]?.forecasts ?? [], result?.area_metadata ?? []);
        onSuccess && onSuccess();
      })
      .catch((err) => onFailure && onFailure());
  }

  return fetch(`${API_V1_WEATHER}?date_time=${date}T${time}`)
    .then((response: any) => response.json())
    .then((result: WeatherResponse) => {
      setResult(result?.items?.[0]?.forecasts ?? [], result?.area_metadata ?? []);
      onSuccess && onSuccess();
    })
    .catch((err) => onFailure && onFailure());
};

/**
 * Gets the table schema given a location array
 * @param locations array of location sot populate the filter UI
 * @returns antd table config
 */
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
    onFilter: (value: string | number | boolean, record: TableEntry) => {
      if (typeof value !== 'string') {
        return false;
      }
      return record.location.startsWith(value);
    },
  },
  { title: 'Weather', dataIndex: 'weather', key: 'weather' },
];
