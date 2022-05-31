import { Categoria } from '../../categoria/categoria-read/categoria.model';
export class Orfanato {
    id?: number;
    nome?: string;
    quantidadeCriancas?: number;
    endereco?:string;
    historia?:string;
    dataFundacao?:Date;
    dataFundacaoFormatada: string;
    telefone?: string;
    email?: string;
}