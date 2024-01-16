import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { ToastrService } from '../toastr/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private toastr: ToastrService, private zone: NgZone) {}

  handleError(error: unknown): void {
    console.error('Caught by Custom Error Handler: ', error);

    // show a global error notification
    if (!(error instanceof HttpErrorResponse)) {
      this.zone.run(() => {
        this.toastr.add({
          type: 'danger',
          message: 'An unexpected error occurred!',
        });
      });
    }
  }
}
