import {Injectable} from '@angular/core';
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public getAccounts(userId: number): Observable<{ id: number, name: string, description: string, currencyId: number }[]> {
    return of(this.data).pipe(
      map(accounts =>
        accounts.filter(account => account.userId === userId)
      )
    )
  }

  data = [
    {
      id: 1,
      name: 'Personnal Account',
      description: 'Description of my awesome personnal account.',
      currencyId: 1,
      userId: 1
    },
    {
      id: 2,
      name: 'Common Account',
      description: 'Description of my conflictual common account.',
      currencyId: 2,
      userId: 1
    },
    {
      id: 3,
      name: 'Trip Account',
      description: 'Description of my moving trip account.',
      currencyId: 1,
      userId: 2
    }
  ]
}
