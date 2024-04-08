import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '@environments/environment';
import { Users } from '@models/users.model';
import { BehaviorSubject, tap } from 'rxjs';
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
      headers: this.headers
    });
  }

  getProfile(){
    return this.http.get<Users>(`${this.url_api}/auth/profile`, {
      headers: this.headers
    }).pipe(
      tap((user) => this.user$.next(user))
    );
  }

  // getUser(){
  //   this.user$.
  // }
}
