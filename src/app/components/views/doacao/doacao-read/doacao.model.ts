import { Categoria } from './../../categoria/categoria-read/categoria.model';
export class Doacao {
    id?: number;
    idCategoria?: number;
    // categoria?: Categoria;
    descricao?: string;
    quantidade?: number;
    localRetirada?: string;
    dataCadastro: string;
    dataLiberacao: Date;
    dataAutorizacao: string;
    idDoador: number;
    situacao: number;
    // Colocar os demais campos aqui
}