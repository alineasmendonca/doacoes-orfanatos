import { SituacaoDoacao } from './../../../../enums/situacao-doacao';
import { OrfanatoService } from './../../orfanato/orfanato.service';
import { Orfanato } from './../../orfanato/orfanato-read/orfanato.model';
import { Interesse } from './../interesse.model';
import { InteresseService } from './../interesse.service';
import { Usuario } from './../../user/usuario';
import { AuthService } from './../../login/auth-service.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { Categoria } from './../../categoria/categoria-read/categoria.model';
import { Utils } from './../../../../utils/utils';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DoacaoService } from './../doacao.service';
import { Doacao } from './../doacao-read/doacao.model';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-doacao-update',
  templateUrl: './doacao-update.component.html',
  styleUrls: ['./doacao-update.component.scss']
})
export class DoacaoUpdateComponent implements OnInit {
  descricao = new FormControl('', [Validators.required, Validators.minLength(5)]);
  quantidade = new FormControl('', [Validators.required, Validators.min(1)]);
  categoria = new FormControl('', [Validators.required]);
  localRetirada = new FormControl('', [Validators.required, Validators.minLength(5)]);

  categorias: Categoria[] = new Array();
  doacao: Doacao = new Doacao();

  usuarioAutenticado: Usuario = new Usuario();
  dataLiberacao: Date = new Date();
  dataFinalDemonstracaoInteresse: Date = new Date();
  usuarioDemonstrouInteressePelaDoacao: boolean;

  interessesUsuarioAutenticadoDoacao: Interesse[];
  interesseUsuarioAutenticado: Interesse = null;

  orfanatosInteressados: Orfanato[] = new Array();
  orfanatosContemplados: Orfanato[] = new Array();
  displayedColumns: string[] = ['nome', 'endereco', 'telefone', 'quantidadeCriancas', 'dataFundacao'];

  orfanatoContemplado: Orfanato;

  constructor(private service: DoacaoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private interesseService: InteresseService,
    private orfanatoService: OrfanatoService,
    private route: ActivatedRoute,
    private router: Router) {
    this.capturarDemonstracaoDeInteressePeloUsuarioAutenticado();
  }

  ngOnInit(): void {
    this.authService.usuarioAutenticado.pipe(take(1)).subscribe((usuario) => {
      this.usuarioAutenticado = usuario;
    }, (error) => {
      console.error(error);
    });



    this.categoriaService.findByFilters(new Categoria()).pipe(take(1)).subscribe((categorias) => {
      this.categorias = categorias;
      this.categorias = _.orderBy(this.categorias, [i => i?.nome?.toLocaleLowerCase()], ['asc']);

    });

    this.route
      .params
      .pipe(take(1))
      .subscribe(params => {
        this.doacao.id = Utils.readRouteParam(params, 'id');
        this.findById();
        let interesse: Interesse = new Interesse();
        interesse.idDoacao = this.doacao.id;

        this.orfanatoService.buscarOrfanatosInteressadosPorUmaDoacao(interesse).pipe(take(1)).subscribe((orfanatos) => {
          this.orfanatosInteressados = orfanatos;
          this.orfanatosInteressados = _.orderBy(this.orfanatosInteressados, [i => i?.nome?.toLocaleLowerCase()], ['asc']);
          // console.log(JSON.stringify(this.orfanatosInteressados));
          // console.log('Qtd de orfanatos interessados na doação:', this.orfanatosInteressados.length);
        });

        this.orfanatoService.recuperarOrfanatoContemplado(interesse).pipe(take(1)).subscribe((orfanatos) => {
          // console.log('Id da doação:', this.doacao.id);
          this.orfanatosContemplados = orfanatos;
          // console.log(JSON.stringify(this.orfanatosContemplados));
          // console.log('Qtd de orfanatos contemplados na doação:', this.orfanatosContemplados.length);
        });
      });

  }

  atualizarDoacao(): void {
    this.service.update(this.doacao).pipe(take(1)).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação alterada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao alterar doação. Tente novamente mais tarde.');
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  liberarDoacao(): void {
    this.service.liberar(this.doacao).pipe(take(1)).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação liberada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao liberar doação. Tente novamente mais tarde.');
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  autorizarDoacao(): void {
    this.service.autorizar(this.doacao).pipe(take(1)).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Doação autorizada com sucesso.');
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao autorizar doação. Tente novamente mais tarde.');
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }

    );

  }

  demonstrarInteresse(): void {

    let interesse: Interesse = new Interesse();
    interesse.idDoacao = this.doacao.id;
    interesse.idOrfanatoInteressado = this.usuarioAutenticado.idOrfanato;
    interesse.idUsuarioInteressado = this.usuarioAutenticado.id;

    this.interesseService.create(interesse).pipe(take(1)).subscribe((resposta) => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Demonstração de interesse incluída com sucesso.');
      this.usuarioDemonstrouInteressePelaDoacao = true;
    }, err => {
      this.router.navigate(['doacoes']);
      this.service.mensagem('Falha ao demonstrar interesse pela doação. Tente novamente mais tarde.');
      for (let i = 0; i < err?.error?.errors?.length; i++) {
        this.service.mensagem(err.error.errors[i].message);
      }
    }
    );
  }

  capturarDemonstracaoDeInteressePeloUsuarioAutenticado(): void {
    this.interesseService.findAll().pipe(take(1)).subscribe((interesses) => {
      this.interessesUsuarioAutenticadoDoacao = interesses;
      this.interessesUsuarioAutenticadoDoacao = this.interessesUsuarioAutenticadoDoacao.filter((interesse) => interesse.idDoacao == this.doacao.id &&
        interesse.idUsuarioInteressado === this.usuarioAutenticado.id &&
        interesse.idOrfanatoInteressado === this.usuarioAutenticado.idOrfanato);
      this.usuarioDemonstrouInteressePelaDoacao = (this.interessesUsuarioAutenticadoDoacao?.length > 0);
    }, (error) => {
      console.error(error);
    });
  }

  // Implementar
  desfazerInteresse(): void {

    let interesse: Interesse = new Interesse();
    interesse.idDoacao = this.doacao.id;
    interesse.idOrfanatoInteressado = this.usuarioAutenticado.idOrfanato;
    interesse.idUsuarioInteressado = this.usuarioAutenticado.id;

    // console.log('Interesse:', JSON.stringify(interesse));

    this.interessesUsuarioAutenticadoDoacao.forEach((interesse) => {
      this.interesseService.delete(interesse.id).pipe(take(1)).subscribe((resposta) => {
        this.router.navigate(['doacoes']);
        this.service.mensagem('Demonstração de interesse excluída com sucesso.');
        this.usuarioDemonstrouInteressePelaDoacao = false;
      }, err => {
        this.router.navigate(['doacoes']);
        this.service.mensagem('Falha ao desfazer interesse pela doação. Tente novamente mais tarde.');
        for (let i = 0; i < err?.error?.errors?.length; i++) {
          this.service.mensagem(err.error.errors[i].message);
        }
      }
      );
    })


  }

  cancelar(): void {
    this.router.navigate(['doacoes']);
  }

  findById(): void {
    this.service.findById(this.doacao.id!).pipe(take(1)).subscribe((doacao) => {
      this.doacao = { ...doacao };
      if (this.doacao.situacao > 1 || this.usuarioAutenticado.perfil !== 2) {
        this.categoria.disable();
        this.descricao.disable();
        this.quantidade.disable();
        this.localRetirada.disable();
      }
      this.doacao.idCategoria = doacao.idCategoria;
      this.dataLiberacao = new Date(this.doacao.dataLiberacao);
      this.dataFinalDemonstracaoInteresse = this.dataLiberacao;
      this.dataFinalDemonstracaoInteresse.setDate(this.dataFinalDemonstracaoInteresse.getDate() + 15);

      if (this.doacao.situacao === SituacaoDoacao.AUTORIZADA) {
        this.orfanatoService.findById(this.doacao.idOrfanatoContemplado).
          pipe(take(1)).
          subscribe((orfanatoContemplado) => {
            this.orfanatoContemplado = orfanatoContemplado;
          });
      }
    });
  }

  dataPermiteAutorizarDoacao(): boolean {
    // console.log(this.dataFinalDemonstracaoInteresse);
    if (new Date() > this.dataFinalDemonstracaoInteresse) {
      return true;
    }
    return false;
  }

  dataPermiteDemonstrarOuDesfazerInteresse(): boolean {
    if (new Date() <= this.dataFinalDemonstracaoInteresse) {
      return true;
    }
    return false;
  }

  retornaMensagemDeErroDescricao() {
    if (this.descricao.hasError('required')) {
      return 'O campo Descrição é obrigatório.';
    }
    if (this.descricao.invalid) {
      return 'O campo Descrição deve ter pelo menos 5 caracteres.';
    }
    return false;
  }

  retornaMensagemDeErroQuantidade() {
    if (this.quantidade.hasError('required')) {
      return 'O campo Quantidade é obrigatório.';
    }
    if (this.quantidade.hasError('min')) {
      return 'O campo Quantidade deve ser maior do que zero.';
    }

    return false;
  }

  retornaMensagemDeErroCategoria() {
    if (this.categoria.hasError('required')) {
      return 'O campo Categoria é obrigatório.';
    }
    return false;
  }

  retornaMensagemDeErroLocalRetirada() {
    if (this.localRetirada.hasError('required')) {
      return 'O campo Local de Retirada é obrigatório.';
    }
    if (this.localRetirada.invalid) {
      return 'O campo Local de Retirada deve ter pelo menos 3 caracteres.';
    }
    return false;
  }
}
