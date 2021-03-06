import { UsuarioService } from './../usuario/usuario.service';
import { Orfanato } from './../orfanato/orfanato-read/orfanato.model';
import { UtilsService } from 'src/app/utils/utils-service';
import { Usuario } from './../user/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.baseUrl + "/usuarios"
  tokenURL: string = environment.baseUrl + environment.obterTokenUrl
  clientID: string = environment.clientId
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService
  user: User = new User;
  tokenString : any;
  token : any;
  expired : any;
  username : any;
  public headers = { 'Content-Type': 'application/json' };
  baseUrl: string = environment.baseUrl;

  private perfilUsuarioCorrenteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public perfilUsuarioCorrente: Observable<number> = new Observable<1>();

  private usuarioAutenticadoSubject: BehaviorSubject<Usuario>;
  public usuarioAutenticado: Observable<Usuario>;

  constructor(private http: HttpClient,
    private snack: MatSnackBar,
    private usuarioService: UsuarioService) {
    this.getUser();
    this.perfilUsuarioCorrenteSubject = new BehaviorSubject<number>(1);
    this.perfilUsuarioCorrente = this.perfilUsuarioCorrenteSubject.asObservable();

    this.usuarioAutenticadoSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.usuarioAutenticado = this.usuarioAutenticadoSubject.asObservable();
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
    this.user = new User();
  }

  getAuthenticadtedUser() {
    this.token = this.obterToken();
    if (this.token) {
      this.username = this.jwtHelper.decodeToken(this.token).user_name
      return this.username;
    }
    return null;
  }

  save(user: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL, user);
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(this.apiURL, user);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password')
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Buscar dados do usu??rio logado
    const filtroUsuarioAutenticado: Usuario = new Usuario();
    let perfilUsuarioAutenticado: number;
    let usuarioAutenticado: Usuario = new Usuario();
    filtroUsuarioAutenticado.username = username;
    this.usuarioService.findByFilters(filtroUsuarioAutenticado).subscribe((resposta: Usuario[]) => {
      usuarioAutenticado = resposta[0];
      this.usuarioAutenticadoSubject.next(usuarioAutenticado);
      if (usuarioAutenticado.perfil != null) {
        perfilUsuarioAutenticado = usuarioAutenticado.perfil;
        this.perfilUsuarioCorrenteSubject.next(perfilUsuarioAutenticado);
      }

      sessionStorage.setItem('usuarioAutenticado', JSON.stringify(filtroUsuarioAutenticado));
      if (usuarioAutenticado.perfil) {
        sessionStorage.setItem('perfilUsuarioAutenticado', usuarioAutenticado.perfil?.toString());
      }
    });

    return this.http.post(this.tokenURL, params.toString(), { headers: headers });

  }

  getAllUsers(): Observable<User[]> {
    const url = this.apiURL;
    return this.http.get<any>(url);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  /*getUserByUsername(): Observable<User> {
    let usernameAppUser = this.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);
    const url = this.apiURL + "/userByUsername/?" + httpParams.toString();
    return this.http.get<any>(`${url}`);
  }*/

  getUser(){
    let usernameAppUser = this.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);
    const url = this.apiURL + "/userByUsername/?" + httpParams.toString();
    this.http.get<any>(`${url}`).subscribe(response => this.user = response);
  }

  delete(username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${username}`);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  public findOrfanatosByFilters(filtrosOrfanato: Orfanato): Observable<Orfanato[]> {
    const url = `${this.apiURL}/orfanatos`;
    const queryParams: HttpParams = UtilsService.buildQueryParams(filtrosOrfanato);

    return this.http
      .get<Orfanato[]>(url,
        {
          headers: this.headers,
          params: queryParams
        });
  }

}