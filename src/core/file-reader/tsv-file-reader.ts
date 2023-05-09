import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { UserType } from '../../types/user-type.enum.js';
import { Housing } from '../../types/housing.enum.js';
import { Service } from '../../types/service.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
          title,
          description,
          postDate: new Date(postDate),
          city,
          previewImage,
          images: images.split(';').map((image) => image),
          isPremium: isPremium === 'Premium',
          rating: Number(rating),
          housingType:
            Housing[
              housingType as 'Apartment' | 'Hotel' | 'House' | 'Room'
            ],
          rooms: Number.parseInt(rooms, 10),
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
          user: {
            firstName,
            lastName,
            email,
            avatar,
            type: UserType[userType as 'Pro' | 'Default'],
          },
          commentsCount: Number(commentsCount),
          coordinates: {
            latitude: Number(coordinates.split(';')[0]),
            longitude: Number(coordinates.split(';')[1]),
          },
        })
      );
  }
}
