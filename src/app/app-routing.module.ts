import { GraficosComponent } from './graficos/graficos.component';
import { UsuarioReadComponent } from './components/views/usuario/usuario-read/usuario-read.component';
import { OrfanatoUpdateComponent } from './components/views/orfanato/orfanato-update/orfanato-update.component';
import { OrfanatoDeleteComponent } from './components/views/orfanato/orfanato-delete/orfanato-delete.component';
import { OrfanatoCreateComponent } from './components/views/orfanato/orfanato-create/orfanato-create.component';
import { OrfanatoReadComponent } from './components/views/orfanato/orfanato-read/orfanato-read.component';
import { LayoutComponent } from './components/views/layout/layout.component';
import { LoginComponent } from './components/views/login/login.component';
import { DoacaoUpdateComponent } from './components/views/doacao/doacao-update/doacao-update.component';
import { DoacaoDeleteComponent } from './components/views/doacao/doacao-delete/doacao-delete.component';
import { DoacaoCreateComponent } from './components/views/doacao/doacao-create/doacao-create.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { HomeComponent } from './components/views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { DoacaoReadComponent } from './components/views/doacao/doacao-read/doacao-read.component';
import { AuthGuard } from './auth.guard';
import { UsuarioDeleteComponent } from './components/views/usuario/usuario-delete/usuario-delete.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent, canActivate : [AuthGuard], children: [
      { 
        path: 'home', 
        component: HomeComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'categorias',
        component: CategoriaReadComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'categorias/create',
        component: CategoriaCreateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'categorias/delete/:id',
        component: CategoriaDeleteComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'categorias/update/:id',
        component: CategoriaUpdateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'doacoes',
        component: DoacaoReadComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'doacoes/create',
        component: DoacaoCreateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'doacoes/delete/:id',
        component: DoacaoDeleteComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'doacoes/update/:id',
        component: DoacaoUpdateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'orfanatos',
        component: OrfanatoReadComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'orfanatos/create',
        component: OrfanatoCreateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'orfanatos/delete/:id',
        component: OrfanatoDeleteComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'orfanatos/update/:id',
        component: OrfanatoUpdateComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'usuarios',
        component: UsuarioReadComponent,
        canActivate : [AuthGuard]
      },/*
      {
        path:'orfanatos/create',
        component: OrfanatoCreateComponent,
        canActivate : [AuthGuard]
      },*/
      {
        path:'usuarios/delete/:id',
        component: UsuarioDeleteComponent,
        canActivate : [AuthGuard]
      },
      {
        path:'graficos',
        component: GraficosComponent,
        canActivate : [AuthGuard]
      }
      /*,
      {
        path:'orfanatos/update/:id',
        component: OrfanatoUpdateComponent,
        canActivate : [AuthGuard]
      }*/
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }