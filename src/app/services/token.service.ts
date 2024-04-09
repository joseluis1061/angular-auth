import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  setToken(token: string){
    // localStorage.setItem('token', JSON.stringify(token));
    setCookie('token-trello', token, {expires: 365, path:'/'})
  }

  getToken(): string | undefined{
    return getCookie('token-trello');
  }

  removeToken(){
    removeCookie('token-trello');
  }

  isValidToken(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    const decoded = jwtDecode<JwtPayload>(token);
    if(decoded && decoded?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decoded.exp);
      const toDay = new Date();
      return tokenDate.getTime() > toDay.getTime();
    }
    return false;
  }

  setRefreshToken(token: string){
    // localStorage.setItem('token-refresh', JSON.stringify(token));
    setCookie('token-refresh-trello', token, {expires: 365, path:'/'})
  }

  getRefreshToken(): string | undefined{
    return getCookie('token-refresh-trello');
  }

  removeRefreshToken(){
    removeCookie('token-refresh-trello');
  }

  isValidRefreshToken(){
    const token = this.getRefreshToken();
    if(!token){
      return false;
    }
    const decoded = jwtDecode<JwtPayload>(token);
    if(decoded && decoded?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decoded.exp);
      const toDay = new Date();
      return tokenDate.getTime() > toDay.getTime();
    }
    return false;
  }

}
