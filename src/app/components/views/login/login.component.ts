import { OrfanatoService } from './../orfanato/orfanato.service';
import { UtilsEnum } from './../../../utils/utils-enum';
import { Usuario } from './../user/usuario';
import { Form, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { User } from './user.model';
import { Perfil } from 'src/app/enums/perfil';
import { Orfanato } from '../orfanato/orfanato-read/orfanato.model';
import * as _ from 'lodash';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();
  cadastrando: boolean = false;
  mensagemSucesso: string = '';
  errors: String[] = new Array();
  nomeCompletoFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  enderecoFormControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  telefoneCelularFormControl = new FormControl('', [Validators.required]);
  telefoneFixoFormControl = new FormControl('', []);
  perfilFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]);
  loginFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  senhaFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  orfanatoFormControl = new FormControl('', [Validators.required]);
  confirmacaoSenhaFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  todosPerfis = Perfil;
  valoresPerfis = Object.values(this.todosPerfis).filter(Number);
  orfanatos: Orfanato[] = new Array();

  private perfilUsuarioCorrenteSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public perfilUsuarioCorrente: Observable<number> = new Observable<1>();

  constructor(private router: Router,
    private authService: AuthService) {
    this.perfilUsuarioCorrenteSubject = new BehaviorSubject<number>(1);
    this.perfilUsuarioCorrente = this.perfilUsuarioCorrenteSubject.asObservable();

    this.authService.findOrfanatosByFilters(new Orfanato()).subscribe((orfanatos) => {
      this.orfanatos = orfanatos;
      this.orfanatos = _.orderBy(this.orfanatos, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
    }, (error) => {
      console.error('Erro:', JSON.stringify(error));
    });
  }

  onSubmit() {
    this.authService
      .tentarLogar(this.loginFormControl.value, this.senhaFormControl.value)
      .subscribe((response) => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token)
        this.router.navigate(['home']);
      }, (err) => {
        this.authService.mensagem('Login ou Senha inválida.');
        console.error(err);
        this.errors = ['Usuário e/ou senha incorreto(s).']
      });
  }

  preparaCadastrar(event: any) {
    this.usuario = new Usuario();
    event.preventDefault();
    this.cadastrando = true;
    this.mensagemSucesso = "";
  }

  cancelaCadastro() {
    this.usuario = new Usuario();
    this.cadastrando = false;
  }

  cadastrar() {
    if (this.senhaFormControl.value !== this.confirmacaoSenhaFormControl.value) {
      this.authService.mensagem('Senha e Confirmar Senha são diferentes');
    } else {
      this.authService
        .save(this.usuario)
        .subscribe(() => {
          this.mensagemSucesso = "Usuário cadastrado com sucesso. Efetue o login.";
          this.cadastrando = false;
          this.usuario = new Usuario();
          this.errors = [];
          this.authService.mensagem(this.mensagemSucesso);
        }, (errorResponse) => {
          this.mensagemSucesso = "";
          this.errors = errorResponse.error.errors;
          this.authService.mensagem(errorResponse);
        }

        )
    }

  }

  retornaMensagemErro(formControl: FormControl, nomeCampo: string, tamanhoMinimo: number): string | boolean {
    if (formControl.hasError('required')) {
      return `${nomeCampo} obrigatório`;
    } else {
      if (formControl.hasError('minlength')) {
        return `${nomeCampo} deve ter pelo menos ${tamanhoMinimo} caracteres`;
      } else {
        if (formControl.hasError('email')) {
          return `${nomeCampo} inválido`;
        }
      }
    }
    return false;
  }

  rotuloPerfil(perfil: number | string | Perfil): string {
    return UtilsEnum.retornaRotuloPerfil(perfil);
  }

}