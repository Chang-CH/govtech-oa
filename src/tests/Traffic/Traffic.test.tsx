import { describe, expect, test } from 'vitest';
import { mapDataToTable } from '_pages/Traffic/utils';
import { render } from '@testing-library/react';
import Traffic from '_pages/Traffic';

describe('Traffic test', () => {
  test('Mapper Utils', () => {
    const mapper = mapDataToTable({
      place1: {
        forecast: 'cloudy',
        latitude: 1.5,
        longitude: 1.2,
      },
    });

    const result = mapper(
      {
        timestamp: '1',
        camera_id: '2',
        image_id: '3',
        image: '4',
        image_metadata: {
          height: 100,
          width: 200,
          md5: '5',
        },
        location: {
          latitude: 1,
          longitude: 2,
        },
      },
      1,
    );

    expect(result.key).toBeDefined();
    expect(result.cid).toBeDefined();
    expect(result.location).toBeDefined();
    expect(result.weather).toBeDefined();
  });
});

describe('App', () => {
  test('renders component', () => {
    render(Traffic);
  });
});
