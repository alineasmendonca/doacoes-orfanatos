import { Perfil } from 'src/app/enums/perfil';
import { SituacaoDoacao } from './../../../../enums/situacao-doacao';
import { UtilsEnum } from './../../../../utils/utils-enum';
import { Usuario } from './../../user/usuario';
import { AuthService } from './../../login/auth-service.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Doacao } from './doacao.model';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-doacao-read',
  templateUrl: './doacao-read.component.html',
  styleUrls: ['./doacao-read.component.scss']
})
export class DoacaoReadComponent implements OnInit {
  doacoes: Doacao[] = [];
  displayedColumns: string[] = ['descricao', 'quantidade', 'localRetirada', 'situacaoRotulo', 'acoes'];
  id_cat: number = 0;
  filtroDoacao: Doacao = new Doacao();
  categorias: Categoria[] = new Array();
  usuarioAutenticado: Usuario = new Usuario();

  todasSituacoesDoacao = SituacaoDoacao;
  valoresSituacoesDoacao = Object.values(this.todasSituacoesDoacao).filter(Number);


  @ViewChild('tabelaDoacoes') tabelaDoacoes;


  constructor(private service: DoacaoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.findByFilters(new Categoria()).subscribe((categorias) => {
      this.categorias = categorias;
      this.categorias = _.orderBy(this.categorias, [i => i?.nome?.toLocaleLowerCase()], ['asc']);

    });

    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuarioAutenticado = usuario;
    }, (error) => {
      console.error(error);
    });

    this.findAll();

  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.doacoes = resposta;
    })
  }

  findAll(): void {
    let filtroTodos: Doacao = new Doacao();
    this.service.findByFilters(filtroTodos).subscribe(resposta => {
      this.ajustaDoacoes(resposta);
    })
  }

  incluirDoacao(): void {
    this.router.navigate(['doacoes/create']);
  }

  pesquisar(): void {
    this.service.findByFilters(this.filtroDoacao).subscribe(resposta => {
      this.ajustaDoacoes(resposta);
    })
  }

  ajustaDoacoes(resposta: Doacao[]): void {
    this.doacoes = resposta;
    this.doacoes.forEach((doacao) => {
      if (doacao.situacao) {
        doacao.situacaoRotulo = this.rotuloSituacaoDoacao(doacao.situacao)
      }
    });
    
    // Ajustar aqui
    if(this.usuarioAutenticado.perfil === Perfil.DOADOR){
      this.doacoes = this.doacoes.filter((doacao)=> doacao.idDoador === this.usuarioAutenticado.id);
    }

    this.doacoes = _.orderBy(this.doacoes, [i => i?.descricao?.toLocaleLowerCase()], ['asc']);
  }

  rotuloSituacaoDoacao(situacao: number | string | SituacaoDoacao): string {
    return UtilsEnum.retornaRotuloSituacaoDoacao(situacao);
  }

  voltar(): void {
    this.router.navigate(['home']);
  }

  limpar(form: NgForm): void {
    form.reset();
    this.filtroDoacao = new Doacao();
    this.findAll();
  }

  exportar() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tabelaDoacoes.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wscols = [{ wch: 60 }, { wch: 20 }, { wch: 60 }];
    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Doações');
    XLSX.writeFile(wb, 'Doacoes.xlsx');
  }

}
