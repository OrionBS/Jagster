import {Injectable} from '@angular/core';
import {filter, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  getCurrencies(): Observable<{ id: number, code: string, name: string, symbol: string }[]> {
    return of(this.data)
  }

  getCurrencyById(currencyId: number): Observable<{ id: number, code: string, name: string, symbol: string } | undefined> {
    return of(this.data).pipe(
      map(currencies => currencies.find(currency => currency.id === currencyId))
    )
  }

  data = [
    {
      id: 1,
      code: 'EUR',
      name: 'Euros',
      symbol: '€'
    },
    {
      id: 2,
      code: 'USD',
      name: 'Dollars',
      symbol: '$'
    }
  ]
}
