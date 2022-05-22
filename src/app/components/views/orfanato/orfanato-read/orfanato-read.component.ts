import { Orfanato } from './orfanato.model';
import { OrfanatoService } from './../orfanato.service';
import { CategoriaService } from '../../categoria/categoria.service';
import { Utils } from '../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../categoria/categoria-read/categoria.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-orfanato-read',
  templateUrl: './orfanato-read.component.html',
  styleUrls: ['./orfanato-read.component.scss']
})
export class OrfanatoReadComponent implements OnInit {
  orfanatos: Orfanato[] = [];
  displayedColumns: string[] = ['nome', 'endereco', 'quantidadeCriancas', 'acoes'];
  id_cat: number = 0;
  filtroOrfanato:Orfanato = new Orfanato();
  categorias: Categoria[] = new Array();

  constructor(private service: OrfanatoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
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

}
