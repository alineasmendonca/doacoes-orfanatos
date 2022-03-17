import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Doacao } from './../doacao-read/doacao.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-doacao-create',
  templateUrl: './doacao-create.component.html',
  styleUrls: ['./doacao-create.component.scss']
})
export class DoacaoCreateComponent implements OnInit {
  descricao = new FormControl('', [Validators.required, Validators.minLength(3)]);
  quantidade = new FormControl('', [Validators.required, Validators.min(1)]);
  doacao: Doacao = new Doacao();

  constructor(private service: DoacaoService,
    private router: Router) { }

  ngOnInit(): void {

  }

  cadastrarDoacao(): void {
    this.doacao.descricao = this.descricao.value;
    this.doacao.quantidade = this.quantidade.value;
    this.doacao.categoria = {id: 4, nome:'', descricao:''};

    this.service.create(this.doacao).subscribe(()=>{
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação cadastrada com sucesso.');

    }, (err)=>{
      this.router.navigate(['doacoes']);
      this.service.mensagem('Erro ao cadastrar doação. Tente novamente mais tarde.');
    })

  }

  cancelar(): void {
    this.router.navigate(['doacoes']);
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
