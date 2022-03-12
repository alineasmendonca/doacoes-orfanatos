import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  name: string = '';
  password: string = '';
  phone: string = '';
  email: string = '';
  cadastrando: boolean = false;
  mensagemSucesso: string = '';
  errors: String[] = new Array();

  constructor(private router: Router,
    private authService : AuthService) { }

  onSubmit(){
    this.authService
          .tentarLogar(this.username, this.password)
          .subscribe((response)=> {
            console.log('Login:', response);
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token)
            this.router.navigate(['home']);
          }, (err) => {
            alert('Erroooooo');
            console.error(err);
            this.errors = ['Usuário e/ou senha incorreto(s).']
          })
        }

  preparaCadastrar( event : any ){
    event.preventDefault();
    this.cadastrando = true;
    this.mensagemSucesso = "";
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const user : User = new User();
    user.username = this.username;
    user.name = this.name;
    user.password = this.password;
    user.email = this.email;
    user.phone = this.phone;
    this.authService
      .save(user)
      .subscribe( () => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
        this.cadastrando = false;
        this.username = '';
        this.password = '';
        this.errors = [];
      }, (errorResponse) => {
        this.mensagemSucesso = "";
        this.errors = errorResponse.error.errors;
      }

      )
  }

}