import { Perfil } from './../../../../enums/perfil';
import { AuthService } from './../../login/auth-service.service';
import { Usuario } from './../../user/usuario';
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
  email = new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]);

  orfanato: Orfanato = new Orfanato();
  usuarioAutenticado: Usuario = new Usuario();

  constructor(private service: OrfanatoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.usuarioAutenticado.subscribe((usuario)=>{
      this.usuarioAutenticado = usuario;
    }, (error)=>{
      console.error(error);
    });
    
    this.route
      .params
      .pipe(take(1))
      .subscribe(params => {
        this.orfanato.id = Utils.readRouteParam(params, 'id');
        this.findById();
      });

      if(this.usuarioAutenticado.perfil !== Perfil.ADMINISTRATOR){
        this.nome.disable();
        this.endereco.disable();
        this.quantidadeCriancas.disable();
        this.historia.disable();
        this.dataFundacao.disable();
        this.telefone.disable();
      }

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
      this.orfanato.email = resposta.email;
    })
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
