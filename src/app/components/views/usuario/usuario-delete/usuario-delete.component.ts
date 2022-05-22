import { UsuarioService } from './../usuario.service';
import { Usuario } from './../../user/usuario';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Utils } from '../../../../utils/utils';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.scss']
})
export class UsuarioDeleteComponent implements OnInit {
  usuario: Usuario = new Usuario();
  categorias: Categoria[] = new Array();
    

  constructor(private service: UsuarioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route
      .params
      .pipe(take(1))
      .subscribe(params => {
        this.usuario.id = Utils.readRouteParam(params, 'id');
        this.findById();
      });
  }


  excluirUsuario(): void {
    this.service.delete(this.usuario.id!).subscribe((resposta) => {
      this.router.navigate(['usuarios']);
      this.service.mensagem('Usuário excluído com sucesso.');
    }, err => {
      this.router.navigate(['usuarios']);
      this.service.mensagem('Falha ao excluir usuário. Tente novamente mais tarde.');
      for (let i = 0; i < err?.error?.errors?.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  cancelar(): void {
    this.router.navigate(['usuarios']);
  }

  findById(): void {
    this.service.findById(this.usuario.id!).subscribe((usuario) => {
      this.usuario = {...usuario};
    })
  }
}
