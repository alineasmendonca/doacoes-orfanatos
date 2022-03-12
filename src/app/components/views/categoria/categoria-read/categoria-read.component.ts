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
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'doacoes', 'acoes'];

  constructor(private service: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.categorias = resposta;
    })
  }

  incluirCategoria(): void {
    this.router.navigate(['categorias/create']);
  }

}
