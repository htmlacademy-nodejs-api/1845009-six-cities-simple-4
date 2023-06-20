import { Expose, Type } from 'class-transformer';
import { Housing } from '../../../types/housing.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { Service } from '../../../types/service.enum.js';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class offerResponseRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public services!: Service[];

  @Expose()
  public housingType!: Housing;

  @Expose()
  public coordinates!: Coordinates;

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;
}
