import { UtilsEnum } from './../../../../utils/utils-enum';
import { Perfil } from './../../../../enums/perfil';
import { UsuarioService } from './../usuario.service';
import { Usuario } from './../../user/usuario';
import { Router } from '@angular/router';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuario-read',
  templateUrl: './usuario-read.component.html',
  styleUrls: ['./usuario-read.component.scss']
})
export class UsuarioReadComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nome', 'login', 'email', 'telefoneCelular', 'telefoneFixo', 'endereco', 'perfil', 'acoes'];
  id_cat: number = 0;
  filtroUsuario: Usuario = new Usuario();
  categorias: Categoria[] = new Array();

  todosPerfis = Perfil;
  valoresPerfis = Object.values(this.todosPerfis).filter(Number);
  
  @ViewChild('tabelaUsuarios') tabelaUsuarios;

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
    this.service.findByFilters(filtroTodos).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.ajustaListaDeUsuarios();
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

  exportar() {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.tabelaUsuarios.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wscols = [{ wch: 40 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Usu??rios');
    XLSX.writeFile(wb, 'Usu??rios.xlsx');
  }


}
