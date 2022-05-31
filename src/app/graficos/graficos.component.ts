import { take } from 'rxjs/operators';
import { DoacaoService } from './../components/views/doacao/doacao.service';
import { Perfil } from './../enums/perfil';
import { UsuarioService } from './../components/views/usuario/usuario.service';
import { Usuario } from './../components/views/user/usuario';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { Doacao } from '@app/components/views/doacao/doacao-read/doacao.model';
Chart.register(...registerables)

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  @ViewChild("qtdDoacoesMensal", { static: true }) graficoDoacaoMensal: ElementRef;
  @ViewChild("qtdUsuariosPorPerfil", { static: true }) graficoUsuariosPorPerfil: ElementRef;
  grafico: number;

  chartDoacaoMensal: Chart;
  chartUsuariosPorPerfil: Chart;

  usuariosComPerfilAdministrador: Usuario[] = new Array();
  usuariosComPerfilDoador: Usuario[] = new Array();
  usuariosComPerfilResponsavelOrfanato: Usuario[] = new Array();


  constructor(private usuarioService: UsuarioService,
    private doacaoService: DoacaoService) { }

  ngOnInit(): void {
    this.usuarioService.findByFilters(new Usuario()).pipe(take(1)).subscribe((usuarios) => {
      console.log(JSON.stringify(usuarios));
      console.log('Qtd usuários cadastrados:', usuarios.length);
      this.usuariosComPerfilAdministrador = usuarios.filter((usuario) => usuario.perfil === Perfil.ADMINISTRATOR);
      this.usuariosComPerfilDoador = usuarios.filter((usuario) => usuario.perfil === Perfil.DOADOR);
      this.usuariosComPerfilResponsavelOrfanato = usuarios.filter((usuario) => usuario.perfil === Perfil.RESPONSAVEL_ORFANATO);
    }, (error) => {
      console.error('Erro:', JSON.stringify(error));
    });

    this.doacaoService.findByFilters(new Doacao()).pipe(take(1)).subscribe((doacoes) => {
      
    }, (error) => {
      console.error('Erro:', JSON.stringify(error));
    });


  }

  exibeGrafico(): void {
    let perfisUsuario = ["Administrador", "Doador", "Responsável por Orfanato"];
    let qtdUsuariosPorPerfil = [this.usuariosComPerfilAdministrador?.length, this.usuariosComPerfilDoador?.length, this.usuariosComPerfilResponsavelOrfanato.length];
    let coresBarras = ["red", "green","blue"];

    if(this.chartDoacaoMensal){
      this.chartDoacaoMensal.destroy();
    }
    if(this.chartUsuariosPorPerfil){
      this.chartUsuariosPorPerfil.destroy();
    }
    
    if (this.grafico === 1) {
      console.log('Entrei aqui 1');
      this.chartDoacaoMensal = new Chart(this.graficoUsuariosPorPerfil.nativeElement, {
        type: 'bar',
        data: {
          labels: perfisUsuario,
          datasets: [{
            data: qtdUsuariosPorPerfil,
            backgroundColor: coresBarras
          }
          ]
        }
      });
    }

    if (this.grafico === 2) {
      console.log('Entrei aqui 1');
      this.chartUsuariosPorPerfil = new Chart(this.graficoDoacaoMensal.nativeElement, {
        type: 'line',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [{
            data: [85, 72, 86, 81, 84, 86, 94, 60, 62, 65, 41, 58],
            borderColor: '#00AEFF',
            // fill: false
          }
          ]
        }
      });
    }
  }

}
