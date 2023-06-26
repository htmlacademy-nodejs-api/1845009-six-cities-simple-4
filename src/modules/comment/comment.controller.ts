import { inject, injectable } from 'inversify';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import OfferService from '../offer/offer.service.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { Response, Request } from 'express';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import CommentResponse from './rdo/comment-response.js';
import { fillDTO } from '../../core/helpers/common.js';
import { ValidateDtoMiddleWare } from '../../core/middlewares/validate-dto.middleware.js';
import { PrivateRouteMiddleWare } from '../../core/middlewares/private-route.middleware.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface)
      logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferService
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleWare(),
        new ValidateDtoMiddleWare(CreateCommentDto),
      ],
    });
  }

  public async create(
    { body, user }: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({
      ...body,
      userId: user.id,
    });
    await this.offerService.addComment(body.rating, body.offerId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
