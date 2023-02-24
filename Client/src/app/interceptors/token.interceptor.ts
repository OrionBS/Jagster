import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GoogleService} from "../services/google.service";
import {GoogleToken} from "../models/GoogleToken";
import {google} from "../constants/google";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  googleService: GoogleService = inject(GoogleService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url === google.token_request) {
      return next.handle(request);
    }

    const googleToken: GoogleToken = this.googleService.getGoogleTokenFromStorage()

    request = request.clone({
      setHeaders: {
        Authorization: googleToken.token_type + ' ' + googleToken.id_token
      }
    });

    return next.handle(request);
  }
}
