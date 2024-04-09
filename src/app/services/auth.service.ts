import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { AuthResponse } from '@models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url_api = environment.url_api;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.url_api}/auth/login`, {
      email: email,
      password: password
    }).pipe(
      tap(response => {
        this.tokenService.setToken(response.access_token),
        this.tokenService.setRefreshToken(response.refresh_token)
      })
    )
  }

  refreshToken(refreshToken: string):Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.url_api}/auth/refresh-token`, {refreshToken}).pipe(
      tap(response => {
        this.tokenService.setToken(response.access_token),
        this.tokenService.setRefreshToken(response.refresh_token)
      })
    )
  }

  register(name: string, email: string, password: string){
    return this.http.post(`${this.url_api}/auth/register`, {
      name: name,
      email: email,
      password: password
    })
  }
  registerAndLogin(name: string, email: string, password: string){
    return this.http.post(`${this.url_api}/auth/register`, {
      name: name,
      email: email,
      password: password
    }).pipe(
      switchMap( () =>
        this.login(email, password)
      )
    )
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.url_api}/auth/is-available`, {
      email: email,
    })
  }

  recovery(email: string){
    return this.http.post<{ link: string, recoveryToken: string }>(`${this.url_api}/auth/recovery`, {
      email: email,
    })
  }
  changePassword(token: string, newPassword: string,){
    return this.http.post<{ link: string, recoveryToken: string }>(`${this.url_api}/auth/change-password`, {
      token: token,
      newPassword: newPassword
    })
  }

  logOut(){
    this.tokenService.removeToken();
  }
}
