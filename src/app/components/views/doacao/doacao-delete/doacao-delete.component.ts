import { CategoriaService } from './../../categoria/categoria.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Utils } from './../../../../utils/utils';
import { take } from 'rxjs/operators';
import { Doacao } from './../doacao-read/doacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-doacao-delete',
  templateUrl: './doacao-delete.component.html',
  styleUrls: ['./doacao-delete.component.scss']
})
export class DoacaoDeleteComponent implements OnInit {
  doacao: Doacao = new Doacao();
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
    
    this.route
      .params
      .pipe(take(1))
      .subscribe(params => {
        this.doacao.id = Utils.readRouteParam(params, 'id');
        this.findById();
      });
  }


  excluirDoacao(): void {
    this.service.delete(this.doacao.id!).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação excluída com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao excluir doação. Tente novamente mais tarde.');
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  cancelar(): void {
    this.router.navigate(['doacoes']);
  }

  findById(): void {
    this.service.findById(this.doacao.id!).subscribe((resposta) => {
      this.doacao.descricao = resposta.descricao;
      // this.doacao.categoria = resposta.categoria;
      this.doacao.idCategoria = resposta.idCategoria;
      this.doacao.quantidade = resposta.quantidade;
    })
  }
}
