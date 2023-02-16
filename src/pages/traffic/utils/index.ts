import { API_V1_TRAFFIC_IMAGES, API_V1_WEATHER } from '../constants';
import { TrafficItem, TrafficResponse, WeatherItem, WeatherMetaData, WeatherResponse } from '../types';

export const getTraffic = (
  setStatus: (status: STATUS) => void,
  setResult: (result: Array<TrafficItem>) => void,
  date: string,
  time: string,
) => {
  setStatus(STATUS.LOADING);
  return fetch(`${API_V1_TRAFFIC_IMAGES}?date_time=${date}T${time}`)
    .then((response: any) => response.json())
    .then((result: TrafficResponse) => {
      setStatus(STATUS.SUCCESS);
      setResult(result?.items?.[0]?.cameras ?? []);
    })
    .catch((err) => setStatus(STATUS.FAILURE));
};

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

export const getWeather = (
  setStatus: (status: STATUS) => void,
  setResult: (weather: Array<WeatherItem>, meta: Array<WeatherMetaData>) => void,
  date: string,
  time?: string,
) => {
  setStatus(STATUS.LOADING);
  if (!time) {
    return fetch(`${API_V1_WEATHER}?date=${date}`)
      .then((response: any) => response.json())
      .then((result: WeatherResponse) => {
        setStatus(STATUS.SUCCESS);
        setResult(result?.items?.[0]?.forecasts ?? [], result?.area_metadata ?? []);
      })
      .catch((err) => setStatus(STATUS.FAILURE));
  }

  return fetch(`${API_V1_WEATHER}?date_time=${date}T${time}`)
    .then((response: any) => response.json())
    .then((result: WeatherResponse) => {
      setStatus(STATUS.SUCCESS);
      setResult(result?.items?.[0]?.forecasts ?? [], result?.area_metadata ?? []);
    })
    .catch((err) => setStatus(STATUS.FAILURE));
};

export enum STATUS {
  LOADING,
  SUCCESS,
  FAILURE,
}
