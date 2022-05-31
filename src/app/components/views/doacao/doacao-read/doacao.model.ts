import { Categoria } from './../../categoria/categoria-read/categoria.model';
export class Doacao {
    id?: number;
    idCategoria?: number;
    // categoria?: Categoria;
    descricao?: string;
    quantidade?: number;
    localRetirada?: string;
    dataCadastro: Date;
    dataLiberacao: Date;
    dataAutorizacao: Date;
    idDoador: number;
    idOrfanatoContemplado: number;
    situacao: number;
    situacaoRotulo: string;
    // Colocar os demais campos aqui
}