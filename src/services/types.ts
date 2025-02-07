export interface URL {
  small: string;
  regular: string;
}

export interface Image {
  id: string;
  urls: URL;
  alt_description?: string;
  likes: number;
  description?: string;
}

export interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}
