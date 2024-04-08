import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { Users } from '@models/users.model';
import { BehaviorSubject, tap } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url_api = environment.url_api;
  private token = this.tokenService.getToken();

  user$ = new BehaviorSubject<Users | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }


  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  getUsers(){
    return this.http.get<Users[]>(`${this.url_api}/users`, {
      context: checkToken()
    });
  }

  getProfile(){
    return this.http.get<Users>(`${this.url_api}/auth/profile`, {
      context: checkToken()
    }).pipe(
      tap((user) => this.user$.next(user))
    );
  }

  getDataUser(){
    return this.user$.getValue();
  }
}
