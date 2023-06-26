import { createSHA256 } from '../../core/helpers/common.js';
import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, default: '' })
  public firstName: string;

  @prop({ required: true, default: '' })
  public lastName: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({
    type: () => String,
    enum: UserType,
    required: true,
    default: UserType.Default
  })
  public type: UserType;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
