import { Router } from '@angular/router';
import { OrfanatoService } from '../orfanato.service';
import { Orfanato } from '../orfanato-read/orfanato.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-orfanato-create',
  templateUrl: './orfanato-create.component.html',
  styleUrls: ['./orfanato-create.component.scss']
})
export class OrfanatoCreateComponent implements OnInit {
  
  nome = new FormControl('', [Validators.required, Validators.minLength(3)]);
  endereco = new FormControl('', [Validators.required, Validators.minLength(3)]);
  quantidadeCriancas = new FormControl('', [Validators.required]);
  historia = new FormControl('', [Validators.required, Validators.minLength(10)]);
  dataFundacao = new FormControl('', [Validators.required, Validators.minLength(8)]);
  telefone = new FormControl('', [Validators.required, Validators.minLength(10)]);
  email = new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]);

  orfanato: Orfanato = new Orfanato();

  constructor(private service: OrfanatoService,
    private router: Router) { }

  ngOnInit(): void {

  }

  cadastrarOrfanato(): void {
    this.orfanato.nome = this.nome.value;
    this.orfanato.quantidadeCriancas = this.quantidadeCriancas.value;
    this.orfanato.endereco = this.endereco.value;
    this.orfanato.dataFundacao = this.dataFundacao.value;
    this.orfanato.historia = this.historia.value;
    this.orfanato.telefone = this.telefone.value;
    this.orfanato.email = this.email.value;

    this.service.create(this.orfanato).subscribe(()=>{
      this.router.navigate(['orfanatos']);
      this.service.mensagem('Orfanato cadastrado com sucesso.');

    }, (err)=>{
      this.router.navigate(['orfanatos']);
      this.service.mensagem('Erro ao cadastrar orfanato. Tente novamente mais tarde.');
    })

  }

  cancelar(): void {
    this.router.navigate(['orfanatos']);
  }

  retornaMensagemDeErroNome() {
    if(this.nome.hasError('required')){
      return 'O campo Nome ?? obrigat??rio.';
    }
    if(this.nome.hasError('minlength')){
      return 'O campo Nome deve ter pelo menos 3 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroEndereco() {
    if(this.endereco.hasError('required')){
      return 'O campo Endere??o ?? obrigat??rio.';
    }
    if(this.endereco.hasError('minlength')){
      return 'O campo Endere??o deve ter pelo menos 3 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroQuantidadeCriancas() {
    if(this.quantidadeCriancas.hasError('required')){
      return 'O campo Quantidade de Crian??as ?? obrigat??rio.';
    }
    if(this.quantidadeCriancas.hasError('min')){
      return 'O campo Quantidade de Crian??as deve ser maior do que zero.';
    }
    return false;
  }

  retornaMensagemDeErroHistoria() {
    if(this.historia.hasError('required')){
      return 'O campo Hist??ria da Funda????o ?? obrigat??rio.';
    }
    if(this.historia.invalid){
      return 'O campo Hist??ria da Funda????o deve ter pelo menos 10 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroDataFundacao() {
    if(this.dataFundacao.hasError('required')){
      return 'O campo Data da Funda????o ?? obrigat??rio.';
    }
    if(this.dataFundacao.hasError('minlength')){
      return 'Data da Funda????o inv??lida.';
    }
    return false;
  }

  retornaMensagemDeErroTelefone() {
    if(this.telefone.hasError('required')){
      return 'O campo Telefone ?? obrigat??rio.';
    }
    if(this.telefone.hasError('minlength')){
      return 'O campo Telefone deve ter 10 d??gitos.';
    }
    return false;
  }

  retornaMensagemErro(formControl: FormControl, nomeCampo: string, tamanhoMinimo: number): string | boolean {
    if (formControl.hasError('required')) {
      return `O campo ${nomeCampo} ?? obrigat??rio`;
    } else {
      if (formControl.hasError('minlength')) {
        return `O campo ${nomeCampo} deve ter pelo menos ${tamanhoMinimo} caracteres`;
      } else {
        if (formControl.hasError('email')) {
          return `O campo ?? ${nomeCampo} inv??lido`;
        }
      }
    }
    return false;
  }

  limparDataDeFundacao($event: any): void {
    $event.stopPropagation();
    this.dataFundacao.setValue(null);
  }

}
