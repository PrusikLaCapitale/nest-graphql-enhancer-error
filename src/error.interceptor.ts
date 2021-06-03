import { NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class ErrorInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('ErrorInterceptor - inbound');
        return next
        .handle()
        .pipe(
            catchError(err => {
                console.log(`[Error] ErrorInterceptor - outbound`);
                return throwError(new BadGatewayException());
            }),
        );
    }
}
