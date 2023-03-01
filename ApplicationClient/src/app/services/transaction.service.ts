import {Injectable} from '@angular/core';
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public getTransactions(accountId: number): Observable<{ id: number, description: string, categoryId: number, date: Date, amount: number }[]> {
    return of(this.data).pipe(
      map(transactions => transactions.filter(
          transaction => transaction.accountId === accountId
        )
      )
    )
  }

  data = [
    {
      id: 1,
      description: "Supermarket",
      categoryId: 1,
      amount: -54.76,
      date: new Date(),
      accountId: 1
    },
    {
      id: 1,
      description: "Total",
      categoryId: 2,
      amount: -124.56,
      date: new Date(),
      accountId: 1
    },
    {
      id: 1,
      description: "Business",
      categoryId: 3,
      amount: 456.89,
      date: new Date(),
      accountId: 1
    },
    {
      id: 1,
      description: "Train",
      categoryId: 4,
      amount: -34.26,
      date: new Date(),
      accountId: 1
    },
  ]

}
