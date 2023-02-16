export type TrafficItem = {
  timestamp: string;
  camera_id: number;
  image_id: number;
  image: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
};

export type TrafficResponse = {
  api_info: {
    status: string;
  };
  items: Array<{
    timestamp: string;
    cameras: Array<TrafficItem>;
  }>;
};

export type TrafficError = {
  code: number;
  message: string;
};

export type WeatherItem = {
  area: string;
  forecast: string;
};

export type WeatherMetaData = {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
};

export type WeatherResponse = {
  api_info: {
    status: string;
  };
  area_metadata: Array<WeatherMetaData>;
  items: Array<{
    update_timestamp: string;
    timestamp: string;
    valid_period: {
      start: string;
      end: string;
    };
    forecasts: Array<WeatherItem>;
  }>;
};

export type WeatherError = {
  code: number;
  message: string;
};

export type TableEntry = { key: number; cid: string; location: string; weather: string };
