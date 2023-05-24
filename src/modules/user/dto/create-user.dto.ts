import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public avatar!: string;
  public password!: string;
  public type!: UserType;
}
