import { Coordinates } from './../../../types/coordinates.type';
import {
  MinLength,
  MaxLength,
  IsDateString,
  IsEnum,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsInt,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Housing } from '../../../types/housing.enum.js';
import { Service } from '../../../types/service.enum.js';
import { City } from '../../../types/city.enum.js';
import { Type } from 'class-transformer';
import CoordinatesDto from './coordinates.dto.js';

export default class CreateOfferDto {
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title!: string;

  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate!: Date;

  @IsEnum(City, { message: 'The city must be included in the list definition' })
  public city!: City;

  @MaxLength(256, { message: 'Too long for field image' })
  public previewImage!: string;

  @IsArray({ message: '' })
  @ArrayMinSize(6, { message: 'The number of images should be 6' })
  @ArrayMaxSize(6, { message: 'The number of images should be 6' })
  @MaxLength(256, { each: true, message: 'Too long for field image' })
  public images!: string[];

  @IsBoolean({ message: 'Field isPremium must be boolean' })
  public isPremium!: boolean;

  @IsEnum(Housing, { message: 'Field housingType must be an array of enum' })
  public housingType!: Housing;

  @IsInt({ message: 'Field rooms must be integer' })
  @Min(1, { message: 'Minimum rooms is 1' })
  @Max(8, { message: 'Maximum rooms is 8' })
  public rooms!: number;

  @IsInt({ message: 'Field guests must be integer' })
  @Min(1, { message: 'Minimum guests is 1' })
  @Max(8, { message: 'Maximum guests is 8' })
  public guests!: number;

  @IsInt({ message: 'Field price must be integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price!: number;

  @IsArray({ message: 'Field services must be array' })
  @IsEnum(Service, {
    each: true,
    message: 'Field services must be an array of enum',
  })
  public services!: Service[];

  @IsMongoId({ message: 'Field userId must be valid an id' })
  public userId!: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates!: Coordinates;
}
