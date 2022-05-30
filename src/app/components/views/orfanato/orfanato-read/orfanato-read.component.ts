import { AuthService } from './../../login/auth-service.service';
import { Usuario } from './../../user/usuario';
import { Orfanato } from './orfanato.model';
import { OrfanatoService } from './../orfanato.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { Utils } from '../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-orfanato-read',
  templateUrl: './orfanato-read.component.html',
  styleUrls: ['./orfanato-read.component.scss']
})
export class OrfanatoReadComponent implements OnInit {
  orfanatos: Orfanato[] = [];
  displayedColumns: string[] = ['nome', 'endereco', 'quantidadeCriancas', 'acoes'];
  id_cat: number = 0;
  filtroOrfanato: Orfanato = new Orfanato();
  categorias: Categoria[] = new Array();
  @ViewChild('tabelaOrfanatos') tabelaOrfanatos;
  usuarioAutenticado: Usuario = new Usuario();

  constructor(private service: OrfanatoService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuarioAutenticado = usuario;
    }, (error) => {
      console.log(error);
    });
    this.findAll();

  }

  findAll(): void {
    let filtroTodos: Orfanato = new Orfanato();
    this.service.findByFilters(filtroTodos).subscribe(resposta => {
      this.orfanatos = resposta;
      this.orfanatos = _.orderBy(this.orfanatos, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
    })
  }

  incluirOrfanato(): void {
    this.router.navigate(['orfanatos/create']);
  }

  pesquisar(): void {
    this.service.findByFilters(this.filtroOrfanato).subscribe(resposta => {
      this.orfanatos = resposta;
      this.orfanatos = _.orderBy(this.orfanatos, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
    })
  }

  voltar(): void {
    this.router.navigate(['home']);
  }

  limpar(form: NgForm): void {
    form.reset();
    this.filtroOrfanato = new Orfanato();
    this.findAll();
  }

  exportar() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tabelaOrfanatos.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wscols = [{ wch: 60 }, { wch: 60 }, { wch: 20 }];
    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Orfanatos');
    XLSX.writeFile(wb, 'Orfanatos.xlsx');
  }

}
