import { Utils } from './../../../../utils/utils';
import { Categoria } from './../categoria-read/categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.scss']
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {
    id: 0,
    nome: '',
    descricao: ''
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

  // ngOnInit(): void {
  //   this.route
  //     .params
  //     .pipe(take(1))
  //     .subscribe(params => {
  //       const id = Utils.readRouteParam(params, 'id');
  //       if (id) {
  //         this.isInclusao = false;
  //         this.load(id);
  //         this.descricaoFormControl.disable();
  //       } else {
  //         this.isInclusao = true;
  //         this.imposto = new Imposto();
  //       }

  //       if (this.data.tipoSubvencao) {
  //         this.imposto.esfera = this.data.tipoSubvencaoImpostoEsfera;
  //       }
  //     });

    // this.categoria.id = this.route.snapshot.paramMap.get('id');
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta)=>{
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;

    })

  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe(
      ()=>{
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria excluída com sucesso.');
      }, err => {
        this.service.mensagem(err.error.error);
      }
    );
  }

}
