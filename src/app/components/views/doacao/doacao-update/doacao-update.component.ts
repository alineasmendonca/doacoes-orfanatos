import { Utils } from './../../../../utils/utils';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Doacao } from './../doacao-read/doacao.model';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doacao-update',
  templateUrl: './doacao-update.component.html',
  styleUrls: ['./doacao-update.component.scss']
})
export class DoacaoUpdateComponent implements OnInit {
  descricao = new FormControl('', [Validators.required, Validators.minLength(3)]);
  quantidade = new FormControl('', [Validators.required, Validators.min(1)]);
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

  atualizarDoacao(): void {
    this.service.update(this.doacao).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação alterada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao alterar doação. Tente novamente mais tarde.');
      for(let i= 0; i < err.error.errors.length; i++){
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

  retornaMensagemDeErroDescricao() {
    if(!this.descricao){
      return 'O campo Descrição é obrigatório.';
    }
    if(this.descricao.invalid){
      return 'O campo Descrição deve ter pelo menos 3 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroQuantidade() {
    if(!this.quantidade){
      return 'O campo Quantidade é obrigatório.';
    }
    if(this.quantidade.invalid){
      return 'O campo Quantidade deve ser maior do que zero.';
    }
    return false;
  }


}
