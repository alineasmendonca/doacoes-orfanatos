import { Utils } from './../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Component, OnInit } from '@angular/core';
import { Doacao } from '../doacao-read/doacao.model';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-doacao-categoria-read',
  templateUrl: './doacao-categoria-read.component.html',
  styleUrls: ['./doacao-categoria-read.component.scss']
})
export class DoacaoCategoriaReadComponent implements OnInit {

  doacoes: Doacao[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'quantidade', 'acoes'];
  id_cat: number = 0;

  constructor(private service: DoacaoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route
        .params
        .pipe(take(1))
        .subscribe(params => {
          this.id_cat = Utils.readRouteParam(params, 'id_cat');
          this.findAllByCategoria();
        });
  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta)=>{
      this.doacoes = resposta;
    })
  }


  incluirDoacao(): void {
    this.router.navigate(['doacoes/create']);
  }

}
