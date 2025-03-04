import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error(exception);
    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      message: exception.message,
      result: exception,
    });
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let result = res;

    if (
      (result == null || typeof result !== 'object') &&
      typeof result !== 'string'
    ) {
      result = {};
    }

    if (
      Object.prototype.hasOwnProperty.call(result, 'error') &&
      result.status === false
    ) {
      return {
        status: false,
        path: request.url,
        statusCode: result?.code,
        data: result?.data,
        message: result.message,
        error: result,
      };
    }

    const message =
      result?.message || (typeof result === 'string' ? result : null);
    if (result && typeof result === 'object') {
      delete result.message;
    }

    const serializedResult = JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );

    return {
      status: true,
      path: request.url,
      statusCode: response.statusCode,
      data:
        Object.keys(serializedResult).length === 0 ? null : serializedResult,
      message,
    };
  }
}
