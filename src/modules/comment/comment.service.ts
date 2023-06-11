import { DocumentType, types } from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { inject, injectable } from 'inversify';
import { CommentEntity } from './comment.entity';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor (
    @inject(AppComponent.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate(['userId']);
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();
    return result.deletedCount;
  }
}
