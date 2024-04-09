import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '@services/token.service';
import { AuthService } from '@services/auth.service';
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TOKEN)){
      const isValidToken =  this.tokenService.isValidToken();
      if(isValidToken){
        return this.addToken(request, next);
      }else{
        return this.updateAccessTokenRefreshToken(request, next);
      }
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const accessToken = this.tokenService.getToken();
    if(accessToken){
      const authRequest = request.clone({
        headers:  request.headers.set('Authorization', `Bearer ${accessToken}`)
      })
      return next.handle(authRequest)
    }
    return next.handle(request)
  }

  private updateAccessTokenRefreshToken(request: HttpRequest<unknown>, next: HttpHandler){
    // Captura el refresh token y su estado de validez
    const refreshToken = this.tokenService.getRefreshToken();
    const isValidRefreshToken = this.tokenService.isValidRefreshToken();
    // Si existe y es valido
    if(refreshToken && isValidRefreshToken){
      // Se logea de nuevo con el refreshToken
      return this.authService.refreshToken(refreshToken)
      .pipe(
        // Después manda la petición de nuevo con la función addToken
        switchMap(()=> this.addToken(request, next))
      );
    }
    // Si no manda la petición tal como esta
    return next.handle(request);
  }
}
