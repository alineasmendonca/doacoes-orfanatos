import { Categoria } from './../../categoria/categoria-read/categoria.model';
export class Doacao {
    id?: number;
    idCategoria?: number;
    // categoria?: Categoria;
    descricao?: string;
    quantidade?: number;
    localRetirada?: string;
    // Colocar os demais campos aqui
}