import { NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class RequestLogInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Endpoint request log - inbound');
        return next
        .handle()
        .pipe(
            tap(() => {
                console.log(`[Success] Endpoint request log - outbound`);
            })
        );
    }
}
