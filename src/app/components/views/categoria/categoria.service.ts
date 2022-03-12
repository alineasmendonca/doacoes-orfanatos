import { AuthService } from './../../../auth.service';
import { Categoria } from './categoria-read/categoria.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,
    private snack: MatSnackBar,
    private authService: AuthService) { }

  findById(id: number): Observable<Categoria>{
    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.get<Categoria>(url);
  }

  findAll(): Observable<Categoria[]>{
    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = `${this.baseUrl}/categorias`;
    return this.http.get<Categoria[]>(url);
  }


  create(categoria: Categoria): Observable<Categoria>{
    const url = `${this.baseUrl}/categorias`;
    return this.http.post<Categoria>(url, categoria);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.delete<void>(url);
  }

  update(categoria: Categoria): Observable<void>{
    const url = `${this.baseUrl}/categorias/${categoria.id}`;
    return this.http.put<void>(url, categoria);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
