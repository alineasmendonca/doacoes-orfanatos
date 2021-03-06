import { Injectable } from '@angular/core';
import { NativeDateAdapter} from '@angular/material/core';

@Injectable({providedIn: 'root'})
export class PortugueseDateProvider extends NativeDateAdapter {

  /*(value: string) {
    const it = value.split('/');
    if (it.length === 3) {
      return new Date(+it[2], +it[1] - 1, +it[0], 12);
    }
  }*/

  format(date: Date) {
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
  }

}
