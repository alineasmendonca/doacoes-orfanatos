import { AuthService } from './../../login/auth-service.service';
import { NgForm } from '@angular/forms';
import { Categoria } from './categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.scss']
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];
  filtroCategoria: Categoria = new Categoria();
  @ViewChild('tabelaCategorias') tabelaCategorias;

  constructor(private service: CategoriaService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    this.authService.getAuthenticadtedUser();
  }

  findAll(): void {
    let filtroTodos: Categoria = new Categoria();
    this.service.findByFilters(filtroTodos).subscribe(resposta => {
      this.categorias = resposta;
    })
  }

  pesquisar(): void {
    this.service.findByFilters(this.filtroCategoria).subscribe(resposta => {
      this.categorias = resposta;
    })
  }

  voltar(): void {
    this.router.navigate(['home']);
  }

  incluirCategoria(): void {
    this.router.navigate(['categorias/create']);
  }

  limpar(form: NgForm): void {
    form.reset();
    this.filtroCategoria = new Categoria();
    this.findAll();
  }

  exportar() {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.tabelaCategorias.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wscols = [{ wch: 40 }, { wch: 60 }];
    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Categorias');
    XLSX.writeFile(wb, 'Categorias.xlsx');
  }

}
