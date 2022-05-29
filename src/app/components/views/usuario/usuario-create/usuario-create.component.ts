/*import { Router } from '@angular/router';
import { OrfanatoService } from '../usuario.service';
import { Orfanato } from '../usuario-read/usuario.model';
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

}*/
