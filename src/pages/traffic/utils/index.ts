/** Constants */
import { API_V1_TRAFFIC_IMAGES, API_V1_WEATHER } from '../constants';

/** Types */
import { TableEntry, TrafficItem, TrafficResponse, WeatherResponse } from '../types';

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
    .catch((_err) => onFailure && onFailure());
};

/**
 * Higher order function to produce a mapper function converting traffic and weather data into antd table entries
 * @param metaArray metadata array to be used for geolocating cameras
 * @param weatherArray weather array to be joined with camera data
 * @returns mapper function to map traffic data to antd table data
 */
export const mapDataToTable =
  (weatherData: { [key: string]: { forecast: string; latitude: number; longitude: number } }) =>
  (item: TrafficItem, key: number) => {
    let area = 'unknown';
    let weather = 'unknown';
    let distance = Infinity;

    // if item has location data, try to reverse latlong by euclidean distance
    if (item?.location) {
      for (const [name, data] of Object.entries(weatherData)) {
        const tempDistance =
          Math.abs(item?.location?.latitude - data.latitude) + Math.abs(item?.location?.longitude - data.longitude);
        if (tempDistance < distance) {
          distance = tempDistance;
          area = name;
          weather = data.forecast;
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

const processWeather = (
  result: WeatherResponse,
): { [key: string]: { forecast: string; latitude: number; longitude: number } } => {
  const res: { [key: string]: { forecast: string; latitude: number; longitude: number } } = {};

  // create hashmap of data from weather
  result?.items?.[0]?.forecasts?.forEach((item) => {
    if (item.area in res) {
      res[item.area].forecast = item.forecast;
      return;
    }
    res[item.area] = { forecast: item.forecast, latitude: 0, longitude: 0 };
  });

  // create hashmap of data from metadata
  result?.area_metadata?.forEach((item) => {
    if (item.name in res) {
      res[item.name].latitude = item?.label_location?.latitude;
      res[item.name].longitude = item?.label_location?.longitude;
      return;
    }
    res[item.name] = {
      forecast: 'unknown',
      latitude: item?.label_location?.latitude,
      longitude: item?.label_location?.longitude,
    };
  });

  return res;
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
  setResult: (weather: { [key: string]: { forecast: string; latitude: number; longitude: number } }) => void,
  date: string,
  time?: string,
  onSuccess?: () => void,
  onFailure?: () => void,
) => {
  if (!time) {
    return fetch(`${API_V1_WEATHER}?date=${date}`)
      .then((response: any) => response.json())
      .then((result: WeatherResponse) => {
        setResult(processWeather(result));
        onSuccess && onSuccess();
      })
      .catch((_err) => onFailure && onFailure());
  }

  return fetch(`${API_V1_WEATHER}?date_time=${date}T${time}`)
    .then((response: any) => response.json())
    .then((result: WeatherResponse) => {
      setResult(processWeather(result));
      onSuccess && onSuccess();
    })
    .catch((_err) => onFailure && onFailure());
};

/**
 * Gets the table schema given a location array
 * @param locations array of location sot populate the filter UI
 * @returns antd table config
 */
export const getTrafficTableColumns = (weather: {
  [key: string]: { forecast: string; latitude: number; longitude: number };
}) => [
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
    filters: Object.keys(weather).map((key: string) => ({ text: key, value: key })),
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
