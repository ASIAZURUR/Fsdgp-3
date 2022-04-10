import { Injectable, ErrorHandler } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthStorageService } from '../services/auth.storage.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { finalize, catchError, switchMap, filter, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private requestCount: number = 0;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private storageService: AuthStorageService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private errorHandler: ErrorHandler
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ++this.requestCount;
    this.apiService.isLoading.next(true);
    if (req.url.includes(environment.baseUrl)) {
      let token = this.storageService.getToken();
      if (req.url.includes('refresh-token')) {
        token = this.storageService.getRefreshToken();
      }
      const clone = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      req = clone;
    }
    return next.handle(req).pipe(
      finalize(() => {
        --this.requestCount;
        this.requestCount > 0
          ? this.apiService.isLoading.next(true)
          : this.apiService.isLoading.next(false);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          if (errorResponse.url.includes('refresh-token')) {
            this.isRefreshing = false;
            this._flashMessagesService.show(
              'Session Has Expired. Please login again',
              {
                cssClass: 'alert-danger',
                timeout: 1000,
              }
            );
            this.storageService.removeToken();
            this.router.navigate(['login']);
            return throwError(errorResponse);
          }
          return this.handle401Error(req, next);
        } else if (errorResponse.status === 500) {
          this._flashMessagesService.show('Something went wrong', {
            cssClass: 'alert-danger',
            timeout: 1000,
          });
        } else {
          this.errorHandler.handleError(errorResponse);
        }
        return throwError(errorResponse);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.storageService.setToken(response.token, response.refresh_token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(this.addToken(request, response.token));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
