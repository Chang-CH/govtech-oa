import { API_V1_TRAFFIC_IMAGES, API_V1_WEATHER } from '../constants';
import { TrafficItem, TrafficResponse, WeatherItem, WeatherResponse } from '../types';

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

export const mapTrafficToTable = (item: TrafficItem, key: number) => {
  return {
    key,
    cid: item.camera_id,
    location: `${item.location?.latitude}, ${item.location?.longitude}`,
    time: item.timestamp,
  };
};
export const getWeather = (
  setStatus: (status: STATUS) => void,
  setResult: (result: Array<WeatherItem>) => void,
  date: string,
  time?: string,
) => {
  setStatus(STATUS.LOADING);
  if (!time) {
    return fetch(`${API_V1_WEATHER}?date=${date}`)
      .then((response: any) => response.json())
      .then((result: WeatherResponse) => {
        setStatus(STATUS.SUCCESS);
        setResult(result?.items?.[0]?.forecasts ?? []);
      })
      .catch((err) => setStatus(STATUS.FAILURE));
  }

  return fetch(`${API_V1_WEATHER}?date_time=${date}T${time}`)
    .then((response: any) => response.json())
    .then((result: WeatherResponse) => {
      setStatus(STATUS.SUCCESS);
      setResult(result?.items?.[0]?.forecasts ?? []);
    })
    .catch((err) => setStatus(STATUS.FAILURE));
};

export enum STATUS {
  LOADING,
  SUCCESS,
  FAILURE,
}
