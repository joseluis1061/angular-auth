import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url_api = environment.url_api;
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string){
    return this.http.post(`${this.url_api}/auth/login`, {
      email: email,
      password: password
    })
  }

  register(name: string, email: string, password: string){
    return this.http.post(`${this.url_api}/auth/register`, {
      name: name,
      email: email,
      password: password
    })
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable: boolean}>(`${this.url_api}/auth/is-available`, {
      email: email,
    })
  }
}
