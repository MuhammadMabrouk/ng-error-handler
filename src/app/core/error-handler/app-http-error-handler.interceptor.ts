import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, timer, throwError, OperatorFunction } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from '../toastr/toastr.service';

function retryWithDelay(count: number): OperatorFunction<any, any> {
  return retry({
    count,
    delay: (error, retryCount) => timer(retryCount * 1000),
  });
}

@Injectable()
export class AppHttpErrorHandler implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWithDelay(3),
      catchError((error: HttpErrorResponse) => {
        console.error('Caught by HTTP interceptor: ', error);

        if (error.status === 400) {
          this.toastr.danger({
            message: 'We encountered an issue. Double-check your input and try again.',
          });
          return throwError(() => error);

        } else if (error.status === 401) {
          // TODO: Redirect to login page
          this.toastr.danger({
            message: 'You need to login to access this feature.',
          });
          return throwError(() => error);

        } else if (error.status === 403) {
          this.toastr.danger({
            message: 'Sorry, you don\'t have permission for this action.',
          });
          return throwError(() => error);

        } else if (error.status === 404) {
          this.toastr.danger({
            message: 'Oops! We couldn\'t find what you\'re looking for.',
          });
          return throwError(() => error);

        } else if (error.status === 500) {
          this.toastr.danger({
            message: 'We\'re sorry, something went wrong on our end. Please try again later.',
          });
          return throwError(() => error);

        } else {
          // handle generic errors
          let message = 'An unexpected error occurred.';
          if (error.error && error.error.message) {
            message += ` (${error.error.message})`;
          }
          this.toastr.danger({ message });
          return throwError(() => error);
        }
      })
    );
  }
}
