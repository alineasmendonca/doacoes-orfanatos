import { Orfanato } from './../orfanato-read/orfanato.model';
import { OrfanatoService } from './../orfanato.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Utils } from '../../../../utils/utils';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-orfanato-delete',
  templateUrl: './orfanato-delete.component.html',
  styleUrls: ['./orfanato-delete.component.scss']
})
export class OrfanatoDeleteComponent implements OnInit {
  orfanato: Orfanato = new Orfanato();
  categorias: Categoria[] = new Array();
    

  constructor(private service: OrfanatoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route
      .params
      .pipe(take(1))
      .subscribe(params => {
        this.orfanato.id = Utils.readRouteParam(params, 'id');
        this.findById();
      });
  }


  excluirOrfanato(): void {
    this.service.delete(this.orfanato.id!).subscribe((resposta) => {
      this.router.navigate(['orfanatos']);
      this.service.mensagem('Orfanato excluído com sucesso.');
    }, err => {
      this.router.navigate(['orfanatos']);
      this.service.mensagem('Falha ao excluir orfanato. Tente novamente mais tarde.');
      for (let i = 0; i < err?.error?.errors?.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  cancelar(): void {
    this.router.navigate(['orfanatos']);
  }

  findById(): void {
    this.service.findById(this.orfanato.id!).subscribe((resposta) => {
      this.orfanato.nome = resposta.nome;
      this.orfanato.endereco = resposta.endereco;
      this.orfanato.dataFundacao = resposta.dataFundacao;
      this.orfanato.quantidadeCriancas = resposta.quantidadeCriancas;
      this.orfanato.historia = resposta.historia;
      this.orfanato.telefone = resposta.telefone;
    })
  }
}
