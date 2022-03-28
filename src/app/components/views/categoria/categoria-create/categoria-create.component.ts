import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from './../categoria-read/categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss']
})
export class CategoriaCreateComponent implements OnInit {
  descricao = new FormControl('', [Validators.required, Validators.minLength(5)]);
  nome = new FormControl('', [Validators.required, Validators.minLength(3)]);

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }
  constructor(private service: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.categoria).subscribe((resposta)=>{
      this.router.navigate(['categorias'])
      this.service.mensagem('Categoria incluída com sucesso.');


    }, err => {
      for(let i= 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

  retornaMensagemDeErroDescricao(): string | boolean {
    if(!this.descricao.value){
      return 'O campo Descrição é obrigatório.';
    }
    if(this.descricao.invalid){
      return 'O campo Descrição deve ter pelo menos 5 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroNome(): string | boolean {
    if(!this.nome.value){
      return 'O campo Nome é obrigatório.';
    }
    if(this.nome.invalid){
      return 'O campo Nome deve ter pelo menos 3 caracteres.';
    }
    return false;
  }

}
