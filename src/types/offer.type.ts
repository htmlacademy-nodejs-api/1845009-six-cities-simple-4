import { Coordinates } from './coordinates.type.js';
import { HousingType } from './housing-type.enum.js';
import { ServiceType } from './service-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guests: number;
  price: number;
  services: ServiceType[];
  user: User;
  commentsCount: number;
  coordinates: Coordinates;
}
