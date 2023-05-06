import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    const modifiedReq = req.clone({ headers });
    return next.handle(modifiedReq);
  }
}
