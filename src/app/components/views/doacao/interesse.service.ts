import { Interesse } from './interesse.model';
import { UtilsService } from '../../../utils/utils-service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InteresseService {

  baseUrl: string = environment.baseUrl;
  public headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  findById(id: number): Observable<Interesse>{
    const url = `${this.baseUrl}/interesses/${id}`;
    return this.http.get<Interesse>(url);
  }

  findAll(): Observable<Interesse[]>{
    const url = `${this.baseUrl}/interesses`;
    return this.http.get<Interesse[]>(url);
  }

  public findByFilters(filtrosInteresse: Interesse): Observable<Interesse[]> {
    const url = `${this.baseUrl}/interesses`;
    const queryParams: HttpParams = UtilsService.buildQueryParams(filtrosInteresse);
    
    return this.http
      .get<Interesse[]>(url,
        {
          headers: this.headers,
          params: queryParams
        });
  }

  


  create(interesse: Interesse): Observable<Interesse>{
    const url = `${this.baseUrl}/interesses`;
    return this.http.post<Interesse>(url, interesse);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/interesses/${id}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
