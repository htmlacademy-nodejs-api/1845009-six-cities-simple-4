import { Housing } from '../../types/housing.enum.js';
import { Offer } from '../../types/offer.type.js';
import { Service } from '../../types/service.enum.js';
import { UserType } from '../../types/user-type.enum.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    rating,
    housingType,
    rooms,
    guests,
    price,
    services,
    firstName,
    lastName,
    email,
    avatar,
    userType,
    commentsCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    firstName,
    lastName,
    email,
    avatar,
    type: UserType[userType as 'Pro' | 'Default'],
  };


  return {
    title,
    description,
    postDate: new Date(postDate),
    city,
    previewImage,
    images: images.split(';').map((image) => image),
    isPremium: isPremium === 'Premium',
    rating: Number(rating),
    housingType: Housing[
      housingType as 'Apartment' | 'Hotel' | 'House' | 'Room'
    ],
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    services: services
      .split(';')
      .map(
        (service) =>
          Service[
          service as
            | 'Breakfast'
            | 'AirConditioning'
            | 'LaptopFriendly'
            | 'Workspace'
            | 'BabySeat'
            | 'Washer'
            | 'Towels'
            | 'Fridge'
          ]
      ),
    user,
    commentsCount: Number(commentsCount),
    coordinates: {
      latitude: Number(coordinates.split(';')[0]),
      longitude: Number(coordinates.split(';')[1]),
    },
  };
}
