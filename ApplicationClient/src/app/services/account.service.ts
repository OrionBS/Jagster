import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: { id: number, name: string, description: string, userId: number }[] = [
    {id: 1, name: 'Compte personnel', description: 'Description de mon compte personnel de transactions.', userId: 1},
    {id: 2, name: 'Compte commun', description: 'Description de mon compte commun de transactions.', userId: 1},
    {id: 3, name: 'Compte voyage', description: 'Description de mon compte voyage de transactions.', userId: 2},
  ]

  public getAccountsById(userId: number): Observable<{ id: number, name: string, description: string, userId: number }[]> {
    return of(this.accounts).pipe(
      map(accounts => accounts.filter(
        account => account.userId === userId
      ))

    )
  }
}
