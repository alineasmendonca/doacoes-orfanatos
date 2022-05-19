import { Usuario } from './../user/usuario';
import { UtilsService } from '../../../utils/utils-service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = environment.baseUrl;
  public headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  findById(id: number): Observable<Usuario>{
    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.get<Usuario>(url);
  }

  findAll(): Observable<Usuario[]>{
    const url = `${this.baseUrl}/usuarios/todas`;
    return this.http.get<Usuario[]>(url);
  }

  public findByFilters(filtrosUsuario: Usuario): Observable<Usuario[]> {
    const url = `${this.baseUrl}/usuarios`;
    const queryParams: HttpParams = UtilsService.buildQueryParams(filtrosUsuario);
    
    return this.http
      .get<Usuario[]>(url,
        {
          headers: this.headers,
          params: queryParams
        });
  }

  create(usuario: Usuario): Observable<Usuario>{
    const url = `${this.baseUrl}/usuarios`;
    return this.http.post<Usuario>(url, usuario);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.delete<void>(url);
  }

  update(usuario: Usuario): Observable<Usuario>{
    const url = `${this.baseUrl}/usuarios/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
