import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doacao } from './doacao-read/doacao.model';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,
    private snack: MatSnackBar) { }

  findById(id: number): Observable<Doacao>{
    const url = `${this.baseUrl}/doacoes/${id}`;
    return this.http.get<Doacao>(url);
  }

  findAll(): Observable<Doacao[]>{
    const url = `${this.baseUrl}/doacoes/todas`;
    return this.http.get<Doacao[]>(url);
  }

  findAllByCategoria(id_cat:number): Observable<Doacao[]>{
    const url = `${this.baseUrl}/doacoes?categoria=${id_cat}`;
    return this.http.get<Doacao[]>(url);
  }


  create(doacao: Doacao): Observable<Doacao>{
    const url = `${this.baseUrl}/doacoes/incluir`;
    return this.http.post<Doacao>(url, doacao);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/doacoes/${id}`;
    return this.http.delete<void>(url);
  }

  update(doacao: Doacao): Observable<Doacao>{
    const url = `${this.baseUrl}/doacoes/${doacao.id}`;
    return this.http.put<Doacao>(url, doacao);
  }

  mensagem(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
