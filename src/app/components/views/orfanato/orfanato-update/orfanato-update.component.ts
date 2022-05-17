import { OrfanatoService } from './../orfanato.service';
import { Orfanato } from './../orfanato-read/orfanato.model';
import { CategoriaService } from '../../categoria/categoria.service';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Utils } from '../../../../utils/utils';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-orfanato-update',
  templateUrl: './orfanato-update.component.html',
  styleUrls: ['./orfanato-update.component.scss']
})
export class OrfanatoUpdateComponent implements OnInit {
  nome = new FormControl('', [Validators.required, Validators.minLength(3)]);
  endereco = new FormControl('', [Validators.required, Validators.minLength(3)]);
  quantidadeCriancas = new FormControl('', [Validators.required]);
  historia = new FormControl('', [Validators.required, Validators.minLength(10)]);
  dataFundacao = new FormControl('', [Validators.required, Validators.minLength(8)]);
  telefone = new FormControl('', [Validators.required, Validators.minLength(10)]);

  orfanato: Orfanato = new Orfanato();

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

  atualizarOrfanato(): void {
    this.service.update(this.orfanato).subscribe((resposta) => {
      this.router.navigate(['orfanatos']);
      this.service.mensagem('Orfanato alterado com sucesso.');
    }, err => {
      this.router.navigate(['orfanatos']);
      this.service.mensagem('Falha ao alterar orfanato. Tente novamente mais tarde.');
      for(let i= 0; i < err.error.errors.length; i++){
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

  retornaMensagemDeErroNome() {
    if(this.nome.hasError('required')){
      return 'O campo Nome é obrigatório.';
    }
    if(this.nome.hasError('minlength')){
      return 'O campo Nome deve ter pelo menos 3 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroEndereco() {
    if(this.endereco.hasError('required')){
      return 'O campo Endereço é obrigatório.';
    }
    if(this.endereco.hasError('minlength')){
      return 'O campo Endereço deve ter pelo menos 3 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroQuantidadeCriancas() {
    if(this.quantidadeCriancas.hasError('required')){
      return 'O campo Quantidade de Crianças é obrigatório.';
    }
    if(this.quantidadeCriancas.hasError('min')){
      return 'O campo Quantidade de Crianças deve ser maior do que zero.';
    }
    return false;
  }

  retornaMensagemDeErroHistoria() {
    if(this.historia.hasError('required')){
      return 'O campo História da Fundação é obrigatório.';
    }
    if(this.historia.invalid){
      return 'O campo História da Fundação deve ter pelo menos 10 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroDataFundacao() {
    if(this.dataFundacao.hasError('required')){
      return 'O campo Data da Fundação é obrigatório.';
    }
    if(this.dataFundacao.hasError('minlength')){
      return 'Data da Fundação inválida.';
    }
    return false;
  }
  
  retornaMensagemDeErroTelefone() {
    if(this.telefone.hasError('required')){
      return 'O campo Telefone é obrigatório.';
    }
    if(this.telefone.hasError('minlength')){
      return 'O campo Telefone deve ter 10 dígitos.';
    }
    return false;
  }

  limparDataDeFundacao($event: any): void {
    $event.stopPropagation();
    this.dataFundacao.setValue(null);
  }
}
