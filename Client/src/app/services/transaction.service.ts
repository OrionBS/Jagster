import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionModel} from "../models/TransactionModel";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = "http://localhost:8080/transactions";

  public getTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.url, {withCredentials: true})
  }

  public getTransactionById(transactionId: number): Observable<TransactionModel> {
    return this.httpClient.get<TransactionModel>(this.url + '/' + transactionId, {withCredentials: true})
  }

  public insertTransaction(transaction: TransactionModel): Observable<TransactionModel> {
    return this.httpClient.post<TransactionModel>(this.url, transaction, {withCredentials: true})
  }

  public deleteTransaction(transactionId: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + transactionId, {withCredentials: true})
  }

  public updateTransactionByIdWithCategoryById(transactionId: number, categoryId: number): Observable<TransactionModel> {
    return this.httpClient.put<TransactionModel>(this.url + '/' + transactionId + '/categories/' + categoryId, null, {withCredentials: true});
  }
}
