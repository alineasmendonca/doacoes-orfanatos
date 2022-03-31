import { CategoriaService } from './../../categoria/categoria.service';
import { Utils } from './../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Component, OnInit } from '@angular/core';
import { Doacao } from './doacao.model';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-doacao-read',
  templateUrl: './doacao-read.component.html',
  styleUrls: ['./doacao-read.component.scss']
})
export class DoacaoReadComponent implements OnInit {
  doacoes: Doacao[] = [];
  displayedColumns: string[] = ['descricao', 'quantidade', 'acoes'];
  id_cat: number = 0;
  filtroDoacao: Doacao = new Doacao();
  categorias: Categoria[] = new Array();

  constructor(private service: DoacaoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.findByFilters(new Categoria()).subscribe((categorias) => {
      this.categorias = categorias;
      this.categorias = _.orderBy(this.categorias, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
    
    });
    this.findAll();

  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.doacoes = resposta;
    })
  }

  findAll(): void {
    let filtroTodos: Doacao = new Doacao();
    this.service.findByFilters(filtroTodos).subscribe(resposta => {
      this.doacoes = resposta;
    })
  }

  incluirDoacao(): void {
    this.router.navigate(['doacoes/create']);
  }

  pesquisar(): void {
    this.service.findByFilters(this.filtroDoacao).subscribe(resposta => {
      this.doacoes = resposta;
    })
  }

  voltar(): void {
    this.router.navigate(['home']);
  }

  limpar(form: NgForm): void {
    form.reset();
    this.filtroDoacao = new Doacao();
    this.findAll();
  }

}
