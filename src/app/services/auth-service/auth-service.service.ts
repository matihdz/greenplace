import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  logged = localStorage.getItem('logged')

  constructor(private router: Router, public http: HttpClient) { }

  async logIn(user: string, password: string) {
    console.log('user : ' + user + ' pass : ' + password)
    let token = {logg:true}
    localStorage.setItem('logged', JSON.stringify(token))
    await this.router.navigate([''])
    location.reload();
  }

  async logOut() {
    let removeToken = localStorage.removeItem('logged')
    if (removeToken == null || removeToken == undefined) {
      location.reload();
    }
  }


  get isLoggedIn(): boolean {
    let auth = (this.logged !== undefined || this.logged !== null)? JSON.parse(this.logged) : { logg: false }

    if (auth) {
      if (auth.logg === false) {
        localStorage.removeItem('access_token')
        return false;
      }else return true
    }else return false
    
  }
}
