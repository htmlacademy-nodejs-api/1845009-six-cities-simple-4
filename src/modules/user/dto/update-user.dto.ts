import { UserType } from '../../../types/user-type.enum';

export default class UpdateUserDto {
  public avatar?: string;
  public firstName?: string;
  public lastName?: string;
  public type?: UserType;
}
