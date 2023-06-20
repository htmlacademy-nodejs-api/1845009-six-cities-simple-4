import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Coordinates } from '../../../types/coordinates.type.js';
import { Housing } from '../../../types/housing.enum.js';
import { Service } from '../../../types/service.enum.js';
import { City } from '../../../types/city.enum.js';
import { Type } from 'class-transformer';
import CoordinatesDto from './coordinates.dto.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: 'The city must be included in the list definition' })
  public city?: string;

  @IsOptional()
  @MaxLength(256, { message: 'Too long for field image' })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: '' })
  @ArrayMinSize(6, { message: 'The number of images should be 6' })
  @ArrayMaxSize(6, { message: 'The number of images should be 6' })
  @MaxLength(256, { each: true, message: 'Too long for field image' })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Field isPremium must be boolean' })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(Housing, { message: 'Field housingType must be an array of enum' })
  public housingType?: Housing;

  @IsOptional()
  @IsInt({ message: 'Field rooms must be integer' })
  @Min(1, { message: 'Minimum rooms is 1' })
  @Max(8, { message: 'Maximum rooms is 8' })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: 'Field guests must be integer' })
  @Min(1, { message: 'Minimum guests is 1' })
  @Max(8, { message: 'Maximum guests is 8' })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: 'Field price must be integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Field services must be array' })
  @IsEnum(Service, {
    each: true,
    message: 'Field services must be an array of enum',
  })
  public services?: Service[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  public coordinates?: Coordinates;
}
