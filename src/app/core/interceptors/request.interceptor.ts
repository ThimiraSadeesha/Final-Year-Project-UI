import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http'
import {Observable} from 'rxjs'
import {AuthService} from '../services'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,) { }

  getAccessToken(): string {
    return this.authService.getAuthToken()
  }
accessToken(){
return this.authService.getAccessToken()
}
  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const token = this.getAccessToken()

  //   if (token) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     console.log("Bearer token added by interceptor: ", token)
  //   }

  //   return next.handle(request)
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.accessToken()
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
