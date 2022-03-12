import { Utils } from './../../../../utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Component, OnInit } from '@angular/core';
import { Doacao } from './doacao.model';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-doacao-read',
  templateUrl: './doacao-read.component.html',
  styleUrls: ['./doacao-read.component.scss']
})
export class DoacaoReadComponent implements OnInit {
  doacoes: Doacao[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'quantidade', 'acoes'];
  id_cat: number = 0;

  constructor(private service: DoacaoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      this.findAll();
  
  }

  findAllByCategoria(): void {
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta)=>{
      this.doacoes = resposta;
    })
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta)=>{
      this.doacoes = resposta;
    })
  }

  incluirDoacao(): void {
    this.router.navigate(['doacoes/create']);
  }

}
