import { Container } from 'inversify';
import { CommentServiceInterface } from './comment-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import CommentService from './comment.service.js';
import { CommentEntity, CommentsModel } from './comment.entity.js';
import { types } from '@typegoose/typegoose';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentServiceInterface>(AppComponent.CommentServiceInterface)
    .to(CommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(AppComponent.CommentModel)
    .toConstantValue(CommentsModel);

  return commentContainer;
}
