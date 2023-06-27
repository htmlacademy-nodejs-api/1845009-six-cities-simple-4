import { Expose } from 'class-transformer';

export default class LoggedUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public firstName!: string;

  @Expose()
  public lastName!: string;
}
