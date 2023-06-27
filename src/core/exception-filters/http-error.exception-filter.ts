import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ExceptionFiltersInterface } from './exception-filters.interface.js';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../helpers/common.js';
import { ServiceError } from '../../types/service-error.enum.js';

@injectable()
export default class HttpErrorExceptionFilter implements ExceptionFiltersInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if(!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ServiceError.CommonError, error.message));
  }
}
