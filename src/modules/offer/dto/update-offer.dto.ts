import { Coordinates } from '../../../types/coordinates.type';
import { Housing } from '../../../types/housing.enum';
import { Service } from '../../../types/service.enum';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: string;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public housingType?: Housing;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public services?: Service[];
  public coordinates?: Coordinates;
}
