import { Injectable } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs';
import { tap, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Toast } from './toastr.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  toasts$ = new BehaviorSubject<Toast[]>([]);

  constructor() {}

  private createToast(type: Toast['type'], toast: Omit<Toast, 'id' | 'type'>) {
    if (!toast) return;

    const toastItem: Required<Toast> = {
      id: `toast-${Date.now()}`,
      type,
      duration: 5000, // default duration in milliseconds
      autoDismiss: true, // default auto-dismiss behavior
      ...toast,
    };

    // emit the toast and handle auto-dismiss and removal
    of(toastItem)
      .pipe(
        tap((toast) => this.toasts$.next([...this.toasts$.value, toast])),
        filter((toast) => toast.autoDismiss), // only proceed if autoDismiss is true
        switchMap(() =>
          timer(toastItem.duration).pipe(
            takeUntil(
              this.toasts$.pipe(filter((toasts) => !toasts.includes(toastItem))) // complete if the toast is removed manually
            )
          )
        ),
        tap(() => this.remove(toastItem))
      )
      .subscribe();
  }

  info(toast: Omit<Toast, 'id' | 'type'>): void {
    this.createToast('info', toast);
  }

  success(toast: Omit<Toast, 'id' | 'type'>): void {
    this.createToast('success', toast);
  }

  warning(toast: Omit<Toast, 'id' | 'type'>): void {
    this.createToast('warning', toast);
  }

  danger(toast: Omit<Toast, 'id' | 'type'>): void {
    this.createToast('danger', toast);
  }

  remove(toast: Toast) {
    if (!toast) return;

    this.toasts$.next(
      this.toasts$.value.filter((item) => item.id !== toast.id)
    );
  }
}
