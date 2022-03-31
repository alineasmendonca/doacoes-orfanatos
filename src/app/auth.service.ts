import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from './components/views/user/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.baseUrl + "/usuarios"
  tokenURL: string = environment.baseUrl + environment.obterTokenUrl
  clientID: string = environment.clientId
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService
  user: Usuario = new Usuario;
  tokenString : any;
  token : any;
  expired : any;
  username : any;

  constructor(private http: HttpClient) {
    this.getUser();
   }

  obterToken() {
    this.tokenString = localStorage.getItem('access_token')
    if (this.tokenString) {
      this.token = JSON.parse(this.tokenString).access_token
      return this.token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    this.token = this.obterToken();
    if (this.token) {
      this.expired = this.jwtHelper.isTokenExpired(this.token)
      return !this.expired;
    }
    return false;
  }

  isAdmin(): boolean {
      if (this.user.admin) {
        return true;
      } else {
        return false;
      }


  }

  encerrarSessao() {
    localStorage.removeItem('access_token')
    this.tokenString = '';
    this.token = '';
    this.username = '';
    this.expired = true;
    this.user = new Usuario();
  }

  getAuthenticadtedUser() {
    this.token = this.obterToken();
    if (this.token) {
      this.username = this.jwtHelper.decodeToken(this.token).user_name;
      return this.username;
    }
    return null;
  }

  save(user: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, user);
  }

  update(user: Usuario): Observable<any> {
    return this.http.put<any>(this.apiURL, user);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
    const headers = {
      //'clientID:clientSecret'
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers: headers });

  }

  getAllUsers(): Observable<Usuario[]> {
    const url = this.apiURL;
    return this.http.get<any>(url);
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  /*getUserByUsername(): Observable<Usuario> {
    let usernameAppUser = this.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);
    const url = this.apiURL + "/userByUsername?" + httpParams.toString();
    return this.http.get<any>(`${url}`);
  }*/

  getUser(){
    let usernameAppUser = this.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);
    const url = this.apiURL + "/userByUsername?" + httpParams.toString();
    this.http.get<any>(`${url}`).subscribe(response => this.user = response);
  }

  delete(username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${username}`);
  }

}
