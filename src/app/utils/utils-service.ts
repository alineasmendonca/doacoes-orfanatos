import { HttpParams } from '@angular/common/http';
// import isNil from 'lodash/isNil';
// import isPlainObject from 'lodash/isPlainObject';
import * as _ from 'lodash';

export class UtilsService {
  public static buildQueryParams(source: Object): HttpParams {
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
      let value: any = source[key as keyof Object];
      if (_.isNil(value)) {
        return;
      }
      if (_.isPlainObject(value)) {
        value = JSON.stringify(value);
      } else {
        value = value.toString();
      }
      target = target.append(key, value);
    });
    return target;
  }

  public static toHttpParams(params: any): HttpParams {
    return Object.getOwnPropertyNames(params)
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
