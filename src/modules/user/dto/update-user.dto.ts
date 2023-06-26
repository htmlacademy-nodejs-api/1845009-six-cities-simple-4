import { UserType } from '../../../types/user-type.enum.js';

export default class UpdateUserDto {
  public avatar?: string;
  public firstName?: string;
  public lastName?: string;
  public type?: UserType;
}
