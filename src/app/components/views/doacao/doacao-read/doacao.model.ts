import { Categoria } from './../../categoria/categoria-read/categoria.model';
export class Doacao {
    id?: number;
    categoria?: Categoria;
    // idCategoria?: number;
    descricao?: string;
    quantidade?: number;
    // Colocar os demais campos aqui
}