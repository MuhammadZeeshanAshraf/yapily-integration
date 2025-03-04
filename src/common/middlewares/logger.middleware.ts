import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.info('Request...');
    console.info('URL: ', req.url);
    console.info('BaseURL: ', req.baseUrl);
    console.info('OriginalURL: ', req.originalUrl);
    next();
  }
}
