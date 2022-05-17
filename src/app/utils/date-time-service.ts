// date-time.service
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateTimeService {
  public getFormat(): string {
    return 'DD/MM/YYYY'; // add you own logic here
  }
  public getLocale(): string {
    return 'pt-BR'; // add you own logic here
  }
}
