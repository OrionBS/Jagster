import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountModel} from "../models/AccountModel";
import {TransactionModel} from "../models/TransactionModel";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = "http://localhost:8080/accounts";

  public getAccounts(): Observable<AccountModel[]> {
    return this.httpClient.get<AccountModel[]>(this.url, {withCredentials: true})
  }

  public insertAccount(account: { name: string, description: string }): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>(this.url, account, {withCredentials: true})
  }

  public getAccountById(accountId: number): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(this.url + '/' + accountId, {withCredentials: true})
  }

  public updateAccount(accountId: number, account: { name: string, description: string }): Observable<AccountModel> {
    return this.httpClient.put<AccountModel>(this.url + '/' + accountId, account, {withCredentials: true})
  }

  public deleteAccount(accountId: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + accountId, {withCredentials: true})
  }

  public updateAccountByIdWithCurrencyById(accountId: number, currencyId: number): Observable<{ id: number, currencyId: number }> {
    return this.httpClient.put<{ id: number, currencyId: number }>(this.url + '/' + accountId + '/currencies/' + currencyId, null, {withCredentials: true})
  }

  public getTransactionsByAccountById(accountId: number): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.url + '/' + accountId + '/transactions', {withCredentials: true})
  }

  public updateAccountByIdWithTransactionById(accountId: number, transactionId: number): Observable<TransactionModel> {
    return this.httpClient.put<TransactionModel>(this.url + '/' + accountId + '/transactions/' + transactionId, null, {withCredentials: true})
  }
}
