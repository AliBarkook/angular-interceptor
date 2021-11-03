import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  delay,
  mergeMap,
  materialize,
  dematerialize,
  catchError,
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TestInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    
    //handle your auth error or rethrow
    if (err.status === 401) {

      alert('شما وارد نشده اید لطفا مجددا وارد شوید')

      return of(err.message); // or EMPTY may be appropriate here
    }
    else if (err.status === 403) {

      alert('شما اجازه دسترسی به این بخش را ندارید')

      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    console.log('the sent request is:', request);
    

    let req = request;
    const token = localStorage.getItem('access_token');
    
    if (token) {
      req = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(req).pipe(catchError((x) => this.handleAuthError(x)));
  }
}