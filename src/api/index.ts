import { Coffee, Image } from '../types';

export const getCoffee = async (): Promise<Coffee> =>
  await fetch('https://random-data-api.com/api/coffee/random_coffee').then(
    (response) => response.json()
  );

export const getImage = async (): Promise<Image> => {
  const [data] = await fetch('https://api.thecatapi.com/v1/images/search').then(
    (res) => res.json()
  );

  return data;
};
