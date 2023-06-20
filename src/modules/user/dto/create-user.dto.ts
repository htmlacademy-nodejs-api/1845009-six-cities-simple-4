import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsString({message: 'firstName is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public firstName!: string;

  @IsString({message: 'lastName is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public lastName!: string;

  @IsString({message: 'avatarPath is required'})
  public avatar!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;

  @IsEnum(UserType, {message: 'user type must be "Default" or "Pro"'})
  public type!: UserType;
}
