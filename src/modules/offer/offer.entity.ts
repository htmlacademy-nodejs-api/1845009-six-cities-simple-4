import typegoose, { Ref, defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { Housing } from '../../types/housing.enum.js';
import { Service } from '../../types/service.enum.js';
import { Coordinates } from '../../types/coordinates.type.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public city!: string;

  @prop()
  public previewImage!: string;

  @prop({default: []})
  public images!: string[];

  @prop()
  public isPremium!: boolean;

  @prop({default: 0})
  public rating!: number;

  @prop({
    type: () => String,
    enum: Housing
  })
  public housingType!: Housing;

  @prop()
  public rooms!: number;

  @prop()
  public guests!: number;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
    enum: Service,
    default: []
  })
  public services!: Service[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount!: number;

  @prop()
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
