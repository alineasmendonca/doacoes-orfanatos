import { UsuarioDeleteComponent } from './components/views/usuario/usuario-delete/usuario-delete.component';
import { UsuarioReadComponent } from './components/views/usuario/usuario-read/usuario-read.component';
import { PortugueseDateProvider } from './utils/portuguese-date-provider';
import { OrfanatoReadComponent } from './components/views/orfanato/orfanato-read/orfanato-read.component';
import { TokenInterceptor } from './token.interceptor';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { AuthService } from './components/views/login/auth-service.service';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component'
import { HomeComponent } from './components/views/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { DoacaoReadComponent } from './components/views/doacao/doacao-read/doacao-read.component';
import { DoacaoCreateComponent } from './components/views/doacao/doacao-create/doacao-create.component';
import { DoacaoDeleteComponent } from './components/views/doacao/doacao-delete/doacao-delete.component';
import { DoacaoUpdateComponent } from './components/views/doacao/doacao-update/doacao-update.component';
import { DoacaoCategoriaReadComponent } from './components/views/doacao/doacao-categoria-read/doacao-categoria-read.component';
import { LoginComponent } from './components/views/login/login.component';
import { LayoutComponent } from './components/views/layout/layout.component';
import { OrfanatoCreateComponent } from './components/views/orfanato/orfanato-create/orfanato-create.component';
import { OrfanatoDeleteComponent } from './components/views/orfanato/orfanato-delete/orfanato-delete.component';
import { OrfanatoUpdateComponent } from './components/views/orfanato/orfanato-update/orfanato-update.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatOptionModule, MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginatorIntlBr } from './utils/mat-paginator-intl-br';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CategoriaReadComponent,
    CategoriaCreateComponent,
    CategoriaDeleteComponent,
    CategoriaUpdateComponent,
    DoacaoReadComponent,
    DoacaoCreateComponent,
    DoacaoDeleteComponent,
    DoacaoUpdateComponent,
    DoacaoCategoriaReadComponent,
    OrfanatoReadComponent,
    OrfanatoCreateComponent,
    OrfanatoDeleteComponent,
    OrfanatoUpdateComponent,
    UsuarioReadComponent,
    UsuarioDeleteComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    TextFieldModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    { provide: MatPaginatorIntlBr, useClass: MatPaginatorIntlBr },
    { provide: DateAdapter, useClass: PortugueseDateProvider },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }/*,
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }