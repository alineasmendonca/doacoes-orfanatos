import { Utils } from './../../../../utils/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from './../categoria-read/categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.scss']
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    id: 0,
    nome: '',
    descricao: '',
    quantidade: 0
  }
  constructor(private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route
      .params
      .pipe(take(1))
      .subscribe(params => {
        this.categoria.id = Utils.readRouteParam(params, 'id');
        this.findById();
      });

  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria alterada com sucesso.');


    }, err => {
      for(let i= 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;

    })
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}
