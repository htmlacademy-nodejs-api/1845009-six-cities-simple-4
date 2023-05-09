import { Coordinates } from './coordinates.type.js';
import { Housing } from './housing.enum.js';
import { Service } from './service.enum.js';
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
  housingType: Housing;
  rooms: number;
  guests: number;
  price: number;
  services: Service[];
  user: User;
  commentsCount: number;
  coordinates: Coordinates;
}
