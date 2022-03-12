export class Utils {
  static isEmptyObject(o: object): boolean {
    return Object.keys(o).length === 0;
  }

  /**
   * Comparação de objetos
   * @param obj1 Objeto 1.
   * @param obj2 Objeto 2.
   * @param fieldNames Campos usados na comparação.
   */
  // static equals(obj1: any, obj2: any, ...fieldNames: string[]): boolean {
  //   if (!obj1 || !obj2) {
  //     return false;
  //   }
  //   if (typeof obj1 !== typeof obj2) {
  //     return false;
  //   }
  //   fieldNames.forEach(n => {
  //     if (obj1[n] !== obj2[n]) {
  //       return false;
  //     }
  //   });
  //   return true;
  // }

  static readRouteParam(params: any, paramName: any) {
    return Utils.isEmptyObject(params) ? undefined : params[paramName];
  }

  /**
   * Shallow clone
   * @param obj Objeto a ser clonado.
   */
  static cloneObj<T>(obj: T): T {
    return Object.assign({}, obj) as T;
  }

  /**
   * Deep Clone.
   * @param original Objeto original
   * @param jsonReplacerFn  replacer.
   */
  // public static deepClone<T>(original: T, jsonReplacerFn?: Function) {
  //   const __proto__ = '__proto__';
  //   const clone = JSON.parse(JSON.stringify(original, jsonReplacerFn as any));
  //   clone[__proto__] = original[__proto__];
  //   return clone as T;
  // }

  /**
   * Array Shallow clone.
   * @param arr clone.
   */
  public static cloneArray<T>(arr: T[]): T[] {
    return arr.slice(0);
  }

  /**
   * Cria um objeto passando o tipo
   * @param c C Tipo
   */
  public static create<T>(c: { new(): T; }): T {
    return new c();
  }

  public static isNullOrUndefined(arg: any): boolean {
    return arg === undefined || arg == null;
  }

  public static coalesce<T>(arg: T, defaultReturn: T) {
    return Utils.isNullOrUndefined(arg) ? defaultReturn : arg;
  }

  // public static converteDataParaCarregarNaTela(data: string): string {
  //   if (data) {
  //     let dataConvertidaParaCargaNaTela = '';
  //     data = data + '.000Z';
  //     dataConvertidaParaCargaNaTela += data.substr(6, 4);
  //     dataConvertidaParaCargaNaTela += '-';
  //     dataConvertidaParaCargaNaTela += data.substr(3, 2);
  //     dataConvertidaParaCargaNaTela += '-';
  //     dataConvertidaParaCargaNaTela += data.substr(0, 2);
  //     dataConvertidaParaCargaNaTela += 'T00:00:00';
  //     dataConvertidaParaCargaNaTela += data.substr(25, 5);
  //     return dataConvertidaParaCargaNaTela;
  //   }

  // }

  // public static converteData(data: string): string {
  //   let dataConvertida = '';

  //   if (data != null) {
  //     /*Caso a data esteja no formato DDMMAAAA*/
  //     if (data.length === 8) {
  //       // Recupera o ano
  //       dataConvertida = data.substr(4, 4);
  //       dataConvertida = dataConvertida + '-';

  //       // Recupera o mês
  //       dataConvertida = dataConvertida + data.substr(2, 2);
  //       dataConvertida = dataConvertida + '-';

  //       // Recupera o dia
  //       dataConvertida = dataConvertida + data.substr(0, 2);

  //       // Concatena o horário
  //       dataConvertida = dataConvertida + 'T00:00:00';
  //       return dataConvertida;
  //     } else {
  //       /*Caso a data esteja no formato DD/MM/AAAA*/
  //       if (data.length === 10) {
  //         // Recupera ano
  //         dataConvertida = data.substr(6, 4);
  //         dataConvertida = dataConvertida + '-';

  //         // Recupera mês
  //         dataConvertida = dataConvertida + data.substr(3, 2);
  //         dataConvertida = dataConvertida + '-';

  //         // Recupera dia
  //         dataConvertida = dataConvertida + data.substr(0, 2);

  //         // Concatena o horário
  //         dataConvertida = dataConvertida + 'T00:00:00';
  //         return dataConvertida;
  //       }
  //     }
  //   }
  // }
}
