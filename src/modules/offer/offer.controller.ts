import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface';
import { fillDTO } from '../../core/helpers/common.js';
import OfferRdo from './rdo/offer.rdo.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import offerResponseRdo from './rdo/offer-response.rdo.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/rdo/comment-response.js';
import { ValidateObjectIdMiddleWare } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleWare } from '../../core/middlewares/validate-dto.middleware.js';

type ParamsOfferDetails =
  | {
      offerId: string;
    }
  | ParamsDictionary;

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface)
    protected readonly logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface)
    private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.CommentServiceInterface)
    private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleWare(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleWare('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleWare('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleWare('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersToResponse = fillDTO(OfferRdo, offers);
    this.ok(res, offersToResponse);
  }

  public async show(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId}`,
        'OfferController'
      );
    }
    this.ok(res, fillDTO(offerResponseRdo, offer));
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, result);
  }

  public async update(
    {
      body,
      params,
    }: Request<ParamsOfferDetails, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body
    );

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(offerResponseRdo, updatedOffer));
  }

  public async delete(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    console.log(params.offerId);
    const deletedOffer = await this.offerService.deleteById(params.offerId);

    if (!deletedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
    await this.commentService.deleteByOfferId(deletedOffer.id);

    this.noContent(res, deletedOffer);
  }

  public async getComments(
    { params }: Request<ParamsOfferDetails, object, object>,
    res: Response
  ): Promise<void> {
    if (! await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
