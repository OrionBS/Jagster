import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCurrencies(): Observable<{ id: number, name: string, icon: string }[]> {
    return of(this.data)
  }

  data = [
    {
      id: 1,
      name: 'Food',
      icon: 'kitchen'
    },
    {
      id: 2,
      name: 'Fuel',
      icon: 'local_gas_station'
    },
    {
      id: 3,
      name: 'Wage',
      icon: 'payments'
    },
    {
      id: 4,
      name: 'Transport',
      icon: 'commute'
    },
  ]
}
