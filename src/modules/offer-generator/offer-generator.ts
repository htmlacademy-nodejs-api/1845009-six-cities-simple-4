import dayjs from 'dayjs';
import { getRandomItem, getRandomValue, getRandomItems } from '../../core/helpers/index.js';
import { MockData } from '../../types/mock-data.type.js';
import { IOfferGenerator } from './offer-generator.interface.js';
import { City } from '../../types/city.enum.js';
import { Housing } from '../../types/housing.enum.js';
import { UserType } from '../../types/user-type.enum.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_PRICE = 800;
const MAX_PRICE = 5000;

export default class OfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(getRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem([
      City.Amsterdam,
      City.Brussels,
      City.Cologne,
      City.Dusseldorf,
      City.Hamburg,
      City.Paris,
    ]);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.imagesSet).join(';');
    const isPremium = getRandomItem<string>(['Premium', 'Default']);
    const rating = getRandomValue(MIN_RATING, MAX_RATING).toString().toString();
    const housingType = getRandomItem<string>([
      Housing.Apartment,
      Housing.Hotel,
      Housing.House,
      Housing.Room,
    ]);
    const rooms = getRandomValue(1, 4).toString();
    const guests = getRandomValue(1, 5).toString();
    const services = getRandomItems<string>([
      'Breakfast',
      'AirConditioning',
      'LaptopFriendly',
      'Workspace',
      'BabySeat',
      'Washer',
      'Towels',
      'Fridge',
    ]).join(';');
    const price = getRandomValue(MIN_PRICE, MAX_PRICE);
    const [firstName, lastName] = getRandomItem<string>(this.mockData.users).split(' ');
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem<string>([UserType.Pro, UserType.Default]);
    const commentCount = getRandomValue(0, 20);
    const coordinates = `${getRandomValue(48.85341, 53.55073, 5)};${getRandomValue(4.895168, 9.99302, 5)}`;

    return [
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
      commentCount,
      coordinates
    ].join('\t');
  }
}
