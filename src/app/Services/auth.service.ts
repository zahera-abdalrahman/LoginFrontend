import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken() {
    return localStorage.getItem('SecurityKey');
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('SecurityKey');
    localStorage.removeItem('SocialMediaUser');
  }

  getRole() {
    const token = this.getToken();
    if (!token) {
      return '';
    }

    let payload = token.split('.')[1];
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');

    const data = JSON.parse(atob(payload));

    return data['role'];
  }
}
