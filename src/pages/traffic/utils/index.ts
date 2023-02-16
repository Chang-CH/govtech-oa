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

export const mapDataToTable = (weatherArray: Array<WeatherMetaData>) => (item: TrafficItem, key: number) => {
  let area = 'unknown';
  let distance = Infinity;

  if (item?.location) {
    for (const metaData of weatherArray) {
      const tempDistance =
        Math.abs(item?.location?.latitude - metaData.label_location.latitude) +
        Math.abs(item?.location?.longitude - metaData.label_location.longitude);

      if (tempDistance < distance) {
        distance = tempDistance;
        area = metaData.name;
      }
    }
  }

  return {
    key,
    cid: item.camera_id,
    location: area,
    time: item.timestamp,
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
        console.log(result);
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
