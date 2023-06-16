import { NextFunction, Request, Response } from 'express';

export interface ExceptionFiltersInterface {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}
