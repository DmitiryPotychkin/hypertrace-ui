import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { EMPTY, Observable, Subject } from 'rxjs';
import { NotificationComponent, NotificationMode } from './notification.component';
import { NotificationModule } from './notification.module';

@Injectable({ providedIn: NotificationModule })
export class NotificationService {
  private readonly snackBarDefaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
    duration: 5000 // Auto dismiss duration. 5 seconds in ms
  };

  private snackbarRef?: MatSnackBarRef<unknown>;
  private readonly closedObserver$: Subject<void> = new Subject();

  public constructor(public readonly snackbar: MatSnackBar) {
    this.closedObserver$.subscribe(() => {
      this.snackbarRef?.dismiss();
    });
  }

  public createSuccessToast(message: string): void {
    this.snackbarRef = this.snackbar.openFromComponent(NotificationComponent, {
      ...this.snackBarDefaultConfig,
      data: {
        message: message,
        mode: NotificationMode.Success,
        closedObserver: this.closedObserver$
      }
    });
  }

  public createFailureToast(message: string): Observable<never> {
    this.snackbarRef = this.snackbar.openFromComponent(NotificationComponent, {
      ...this.snackBarDefaultConfig,
      duration: 0, // Keep the notification open indefinitely in case of error
      data: { message: message, mode: NotificationMode.Failure, closedObserver: this.closedObserver$ }
    });

    return EMPTY;
  }

  public createInfoToast(message: string): void {
    this.snackbarRef = this.snackbar.openFromComponent(NotificationComponent, {
      ...this.snackBarDefaultConfig,
      data: { message: message, mode: NotificationMode.Info, closedObserver: this.closedObserver$ }
    });
  }
}
