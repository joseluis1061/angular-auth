import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  setToken(token: string){
    localStorage.setItem('token', JSON.stringify(token));
    setCookie('token-trello', token, {expires: 365, path:'/'})
  }

  getToken(): string | undefined{
    return getCookie('token-trello');
  }

  removeToken(){
    removeCookie('token-trello');
  }
}
