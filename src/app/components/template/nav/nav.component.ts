import { Usuario } from './../../views/user/usuario';
import { AuthService } from './../../views/login/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  perfilUsuarioAutenticado: number | null = 1;
  perfilUsuarioAutenticadoString: string | null = '';
  usuarioAutenticado: Usuario = new Usuario();

  constructor(private authService: AuthService,
              private router: Router ) { }

  ngOnInit(): void {
    this.perfilUsuarioAutenticadoString = sessionStorage.getItem('perfilUsuarioAutenticado');
    
    this.authService.perfilUsuarioCorrente.subscribe((perfil)=>{
      this.perfilUsuarioAutenticado = perfil;
    })
  }

  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

}
