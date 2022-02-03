export interface IMageUrl {
  full: string;
  small: string;
  thumb: string;
}

export interface IImageUser {
  first_name: string;
  last_name: string;
  profile_image: {
    small: string;
  };
}

export interface IImage {
  id: string;
  urls: IMageUrl;
  likes: number;
  created_at: string;
  user: IImageUser;
}

export interface IPaginatedGallery {
  total: number;
  total_pages: number;
  result: IImage[];
}

export interface galleryData {
  gallery: IImage[];
  loading: boolean;
  error?: string[];
}
