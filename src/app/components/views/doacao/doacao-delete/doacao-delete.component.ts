import { Utils } from './../../../../utils/utils';
import { take } from 'rxjs/operators';
import { Doacao } from './../doacao-read/doacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doacao-delete',
  templateUrl: './doacao-delete.component.html',
  styleUrls: ['./doacao-delete.component.scss']
})
export class DoacaoDeleteComponent implements OnInit {
  doacao: Doacao = new Doacao();

  constructor(private service: DoacaoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
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
      this.doacao.categoria = resposta.categoria;
      this.doacao.quantidade = resposta.quantidade;
    })
  }
}
