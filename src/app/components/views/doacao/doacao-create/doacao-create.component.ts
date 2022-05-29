import { Usuario } from './../../user/usuario';
import { AuthService } from './../../login/auth-service.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Doacao } from './../doacao-read/doacao.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-doacao-create',
  templateUrl: './doacao-create.component.html',
  styleUrls: ['./doacao-create.component.scss']
})
export class DoacaoCreateComponent implements OnInit {
  descricao = new FormControl('', [Validators.required, Validators.minLength(5)]);
  quantidade = new FormControl('', [Validators.required]);
  categoria = new FormControl('', [Validators.required, Validators.min(1)]);
  localRetirada = new FormControl('', [Validators.required, Validators.minLength(5)]);

  doacao: Doacao = new Doacao();
  categorias: Categoria[] = new Array();
  usuarioAutenticado: Usuario = new Usuario();

  constructor(private service: DoacaoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.usuarioAutenticado.subscribe((usuario)=>{
      this.usuarioAutenticado = usuario;
    }, (error)=>{
      console.log(error);
    });

    this.categoriaService.findByFilters(new Categoria()).subscribe((categorias) => {
      this.categorias = categorias;
      this.categorias = _.orderBy(this.categorias, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
    
    });

  }

  cadastrarDoacao(): void {
    this.doacao.descricao = this.descricao.value;
    this.doacao.quantidade = this.quantidade.value;
    this.doacao.localRetirada = this.localRetirada.value;
    this.doacao.idCategoria = this.categoria.value;
    this.doacao.idDoador = this.usuarioAutenticado.id;

    this.service.create(this.doacao).subscribe(()=>{
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação cadastrada com sucesso.');

    }, (error)=>{
      console.error(error);
      this.router.navigate(['doacoes']);
      this.service.mensagem('Erro ao cadastrar doação. Tente novamente mais tarde.');
    })

  }

  cancelar(): void {
    this.router.navigate(['doacoes']);
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
