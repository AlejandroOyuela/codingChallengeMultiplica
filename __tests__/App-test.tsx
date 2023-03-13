import React from 'react';
import {render} from '@testing-library/react-native';
import MainScreen from '../src/screens/mainScreen';

test('renders MainScreen', async () => {
  const mockResponse = [
    {
      id: '1',
      createdAt: '2022-03-10T16:17:06.184Z',
      product: 'Product 1',
      points: 100,
      is_redemption: false,
      image: 'https://loremflickr.com/640/480/transport',
    },
    {
      id: '2',
      createdAt: '2022-03-09T16:17:06.184Z',
      product: 'Product 2',
      points: 200,
      is_redemption: true,
      image: 'https://loremflickr.com/640/480/technics',
    },
  ];

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  const {getByText} = render(<MainScreen />);

  expect(getByText('Bienvenido de vuelta!')).toBeDefined();
  expect(getByText('Ruben Rodríguez')).toBeDefined();
  expect(getByText('TUS PUNTOS')).toBeDefined();
  expect(getByText('Diciembre')).toBeDefined();
  expect(getByText('300 pts')).toBeDefined();
  expect(getByText('TUS MOVIMIENTOS')).toBeDefined();
  expect(getByText('Product 1')).toBeDefined();
  expect(getByText('100 pts')).toBeDefined();
  expect(getByText('>')).toBeDefined();

  global.fetch.mockRestore();
});
