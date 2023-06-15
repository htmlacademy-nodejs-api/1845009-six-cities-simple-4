import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user-type.enum.js';

export default class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public firstName!: string;

  @Expose()
  public lastName!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public type!: UserType;
}
