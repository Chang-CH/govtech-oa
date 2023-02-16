/**
 *Schema for individual camera data
 */
export type TrafficItem = {
  timestamp: string;
  camera_id: string;
  image_id: string;
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

/**
 * Schema for traffic API success response
 */
export type TrafficResponse = {
  api_info: {
    status: string;
  };
  items: Array<{
    timestamp: string;
    cameras: Array<TrafficItem>;
  }>;
};

/**
 * Schema for traffic API success response
 */
export type TrafficError = {
  code: number;
  message: string;
};

/**
 * Schema for individual weather forecasts
 */
export type WeatherItem = {
  area: string;
  forecast: string;
};

/**
 * Schema for individual location metaData
 */
export type WeatherMetaData = {
  name: string;
  label_location: {
    latitude: number;
    longitude: number;
  };
};

/**
 * Schema for weather API success response
 */
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

/**
 * Schema for weather API failure response
 */
export type WeatherError = {
  code: number;
  message: string;
};

/**
 * Schema for antd table entry
 */
export type TableEntry = { key: number; cid: string; location: string; weather: string };
