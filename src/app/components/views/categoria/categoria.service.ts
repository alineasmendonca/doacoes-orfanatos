import { Categoria } from './categoria-read/categoria.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/utils/utils-service';
import { AuthService } from '../login/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl: string = environment.baseUrl;
  public filtro: Categoria;
  public headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient,
    private snack: MatSnackBar,
    private authService: AuthService) { 
      this.filtro = new Categoria();
    }

  findById(id: number): Observable<Categoria>{
    const usernameAppUser = this.authService.getAuthenticadtedUser();
    const httpParams = new HttpParams()
      .set("username", usernameAppUser);

    const url = `${this.baseUrl}/categorias/${id}`;
    return this.http.get<Categoria>(url);
  }

  public findByFilters(filtrosCategoria: Categoria): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categorias`;
    const queryParams: HttpParams = UtilsService.buildQueryParams(filtrosCategoria);

    return this.http
      .get<Categoria[]>(url,
        {
          headers: this.headers,
          params: queryParams
        });
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
