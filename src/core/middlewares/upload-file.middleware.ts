import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleWare = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleWare(req, res, next);
  }
}
