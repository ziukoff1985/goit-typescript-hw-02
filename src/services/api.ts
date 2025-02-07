import axios from 'axios';
import { FetchImagesResponse } from './types';

const BASE_URL = 'https://api.unsplash.com/search/photos';

const API_KEY = 'WEdozSbeL3sXHgKKf2QSFIABrvu5qfELDXJLSJNUh8Q';

// interface URL {
//   small: string;
//   regular: string;
// }

// interface Image {
//   id: string;
//   urls: URL;
//   alt_description?: string;
//   likes: number;
//   description?: string;
// }

// interface FetchImagesResponse {
//   results: Image[];
//   total_pages: number;
// }

export const fetchImages = async (
  query: string,
  page: number,
  perPage = 12
): Promise<FetchImagesResponse> => {
  const response = await axios.get(BASE_URL, {
    params: { query, page, per_page: perPage },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  console.log(response);

  return response.data;
};
