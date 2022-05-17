import { UtilsService } from '../../../utils/utils-service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Orfanato } from './orfanato-read/orfanato.model';

@Injectable({
  providedIn: 'root'
})
export class OrfanatoService {

  baseUrl: string = environment.baseUrl;
  public headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  findById(id: number): Observable<Orfanato>{
    const url = `${this.baseUrl}/orfanatos/${id}`;
    return this.http.get<Orfanato>(url);
  }

  findAll(): Observable<Orfanato[]>{
    const url = `${this.baseUrl}/orfanatos/todas`;
    return this.http.get<Orfanato[]>(url);
  }

  public findByFilters(filtrosOrfanato: Orfanato): Observable<Orfanato[]> {
    const url = `${this.baseUrl}/orfanatos`;
    const queryParams: HttpParams = UtilsService.buildQueryParams(filtrosOrfanato);
    
    return this.http
      .get<Orfanato[]>(url,
        {
          headers: this.headers,
          params: queryParams
        });
  }

  create(orfanato: Orfanato): Observable<Orfanato>{
    const url = `${this.baseUrl}/orfanatos`;
    return this.http.post<Orfanato>(url, orfanato);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/orfanatos/${id}`;
    return this.http.delete<void>(url);
  }

  update(orfanato: Orfanato): Observable<Orfanato>{
    const url = `${this.baseUrl}/orfanatos/${orfanato.id}`;
    return this.http.put<Orfanato>(url, orfanato);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
