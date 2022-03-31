import { Perfil } from "../enums/perfil";

export class UtilsEnum {
    public static retornaRotuloPerfil(perfil: number | string | Perfil): string {
        return Perfil.ADMINISTRATOR === perfil
            ? 'Administrador'
            : Perfil.DOADOR === perfil
                ? 'Doador'
                : Perfil.RESPONSAVEL_ORFANATO === perfil
                    ? 'Responsável por Orfanato'
                    : '';
    }
}
