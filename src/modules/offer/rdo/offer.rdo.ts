import { Expose } from 'class-transformer';
import { Housing } from '../../../types/housing.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export default class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public price!: number;

  @Expose()
  public housingType!: Housing;

  @Expose()
  public coordinates!: Coordinates;
}
