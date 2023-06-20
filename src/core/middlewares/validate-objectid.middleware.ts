import mongoose from 'mongoose';
import { MiddleWareInterface } from '../../types/middleware.interface.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';

const { Types } = mongoose;

export class ValidateObjectIdMiddleWare implements MiddleWareInterface {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectId`,
      'ValidateObjectMiddleware'
    );
  }
}
