import { iCard } from '../components/Card';
interface PostData {
  latitude: number;
  longitude: number;
  offset: number;
}

interface iRestaurants {
  search: {
    business: iCard[];
  };
}

const postData = async (url = '', data: PostData): Promise<iRestaurants> => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

const fetchMyAPI = async (latitude: number, longitude: number, offset: number) => {
  const productionApi = 'https://whattoeat.paska.xyz/api/business/search';
  const devApi = 'http://localhost:3335/api/business/search';
  const api = process.env.NODE_ENV === 'development' ? devApi : productionApi;
  const data = await postData(api, {
    latitude: latitude,
    longitude: longitude,
    offset
  });
  const shuffledRestaurants = [...data.search.business].sort(() => Math.random() - 0.5);
  return shuffledRestaurants;
};

export {
  fetchMyAPI
}
