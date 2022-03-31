import { NgForm } from '@angular/forms';
import { AuthService } from './../../../../auth.service';
import { Categoria } from './categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.scss']
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];
  filtroCategoria: Categoria = new Categoria();

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

}
