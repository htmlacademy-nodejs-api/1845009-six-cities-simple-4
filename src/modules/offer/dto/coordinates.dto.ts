import { IsLatitude, IsLongitude } from 'class-validator';

export default class CoordinatesDto {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}
