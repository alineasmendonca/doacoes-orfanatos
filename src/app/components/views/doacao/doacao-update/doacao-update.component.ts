import { Usuario } from './../../user/usuario';
import { AuthService } from './../../login/auth-service.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Utils } from './../../../../utils/utils';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Doacao } from './../doacao-read/doacao.model';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-doacao-update',
  templateUrl: './doacao-update.component.html',
  styleUrls: ['./doacao-update.component.scss']
})
export class DoacaoUpdateComponent implements OnInit {
  descricao = new FormControl('', [Validators.required, Validators.minLength(5)]);
  quantidade = new FormControl('', [Validators.required, Validators.min(1)]);
  categoria = new FormControl('', [Validators.required]);
  localRetirada = new FormControl('', [Validators.required, Validators.minLength(5)]);

  categorias: Categoria[] = new Array();
  doacao: Doacao = new Doacao();

  usuarioAutenticado: Usuario = new Usuario();
  dataLiberacao: Date = new Date();
  dataFinalDemonstracaoInteresse: Date = new Date();

  constructor(private service: DoacaoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.usuarioAutenticado.subscribe((usuario)=>{
      this.usuarioAutenticado = usuario;
    }, (error)=>{
      console.error(error);
    });



    this.categoriaService.findByFilters(new Categoria()).subscribe((categorias) => {
      this.categorias = categorias;
      this.categorias = _.orderBy(this.categorias, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
    
    });

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

  liberarDoacao(): void {
    this.service.liberar(this.doacao).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação liberada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao liberar doação. Tente novamente mais tarde.');
      for(let i= 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  autorizarDoacao(): void {
    this.service.autorizar(this.doacao).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação autorizada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao autorizar doação. Tente novamente mais tarde.');
      for(let i= 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  demonstrarInteresse(): void {
    this.service.liberar(this.doacao).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação liberada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao liberar doação. Tente novamente mais tarde.');
      for(let i= 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );
  }

  desfazerInteresse(): void {
    this.service.liberar(this.doacao).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação liberada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao liberar doação. Tente novamente mais tarde.');
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
    this.service.findById(this.doacao.id!).subscribe((doacao) => {
      this.doacao = {...doacao};
      if(this.doacao.situacao > 1 || this.usuarioAutenticado.perfil !== 2){
        this.categoria.disable();
        this.descricao.disable();
        this.quantidade.disable();
        this.localRetirada.disable();
      }
      this.doacao.idCategoria = doacao.idCategoria;
      this.dataLiberacao = new Date(this.doacao.dataLiberacao);
      this.dataFinalDemonstracaoInteresse = this.dataLiberacao;
      this.dataFinalDemonstracaoInteresse.setDate(this.dataFinalDemonstracaoInteresse.getDate() + 15);
    })
  }

  dataPermiteAutorizarDoacao(): boolean {
    if(new Date() > this.dataFinalDemonstracaoInteresse){
      return true;
    }
    return false;
  }

  dataPermiteDemonstrarOuDesfazerInteresse(): boolean {
    if(new Date() <= this.dataFinalDemonstracaoInteresse){
      return true;
    }
    return false;
  }

  retornaMensagemDeErroDescricao() {
    if(this.descricao.hasError('required')){
      return 'O campo Descrição é obrigatório.';
    }
    if(this.descricao.invalid){
      return 'O campo Descrição deve ter pelo menos 5 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroQuantidade() {
    if(this.quantidade.hasError('required')){
      return 'O campo Quantidade é obrigatório.';
    }
    if(this.quantidade.hasError('min')){
      return 'O campo Quantidade deve ser maior do que zero.';
    }

    return false;
  }

  retornaMensagemDeErroCategoria() {
    if(this.categoria.hasError('required')){
      return 'O campo Categoria é obrigatório.';
    }
    return false;
  }

  retornaMensagemDeErroLocalRetirada() {
    if(this.localRetirada.hasError('required')){
      return 'O campo Local de Retirada é obrigatório.';
    }
    if(this.localRetirada.invalid){
      return 'O campo Local de Retirada deve ter pelo menos 3 caracteres.';
    }
    return false;
  }
}
