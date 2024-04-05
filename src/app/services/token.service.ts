import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string){
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string | null{
    if(localStorage.getItem('token')){
      return JSON.stringify (localStorage.getItem('token'))
    }
    return null
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
