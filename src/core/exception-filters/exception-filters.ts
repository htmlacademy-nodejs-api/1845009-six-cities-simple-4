import { inject, injectable } from 'inversify';
import { ExceptionFiltersInterface } from './exception-filters.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';
import { createErrorObject } from '../helpers/common.js';

@injectable()
export default class ExceptionFilters implements ExceptionFiltersInterface {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
