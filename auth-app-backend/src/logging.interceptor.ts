import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { MyLoggerService } from './logger.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: MyLoggerService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const { method, url, headers, query, body } = req;
  
      this.logger.log(`Incoming Request: ${method} ${url}`, {
        headers,
        query,
        body,
      });
  
      const startTime = Date.now();
  
      return next.handle().pipe(
        tap((response) => {
          const duration = Date.now() - startTime;
          const res = context.switchToHttp().getResponse();
          const { statusCode } = res;
  
          this.logger.log(`Completed ${method} ${url} in ${duration}ms`, {
            statusCode,
            response,
            duration,
          });
        }),
      );
    }
  }
  