import { UtilsEnum } from './../../../../utils/utils-enum';
import { Perfil } from './../../../../enums/perfil';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../../user/usuario';
import { Router } from '@angular/router';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.scss']
})
export class UsuarioReadComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nome', 'email', 'telefoneCelular', 'telefoneFixo', 'endereco', 'perfil'];
  id_cat: number = 0;
  filtroUsuario: Usuario = new Usuario();
  categorias: Categoria[] = new Array();

  todosPerfis = Perfil;
  valoresPerfis = Object.values(this.todosPerfis).filter(Number);

  constructor(private service: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  ajustaListaDeUsuarios(): void {
    this.usuarios.forEach((usuario) => {
      if (usuario.perfil) {
        usuario.perfilRotulo = this.rotuloPerfil(usuario.perfil)
      }
    }
    );
    this.usuarios = _.orderBy(
      this.usuarios,
      [(i) => i.nome?.toLocaleLowerCase()],
      ['asc']
    );
  }
  findAll(): void {
    let filtroTodos: Usuario = new Usuario();
    this.service.findByFilters(filtroTodos).subscribe((resposta: Usuario[]) => {
      this.usuarios = resposta;
      this.ajustaListaDeUsuarios();
      console.log(JSON.stringify(this.usuarios));
    })
  }

  incluirUsuario(): void {
    this.router.navigate(['usuarios/create']);
  }

  pesquisar(): void {
    this.service.findByFilters(this.filtroUsuario).subscribe((resposta: Usuario[]) => {
      this.usuarios = resposta;
      this.ajustaListaDeUsuarios();
    })
  }

  voltar(): void {
    this.router.navigate(['home']);
  }

  limpar(form: NgForm): void {
    form.reset();
    this.filtroUsuario = new Usuario();
    this.findAll();
  }

  rotuloPerfil(perfil: number | string | Perfil): string {
    return UtilsEnum.retornaRotuloPerfil(perfil);
  }

}
