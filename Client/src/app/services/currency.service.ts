import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrencyModel} from "../models/CurrencyModel";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  httpClient: HttpClient = inject(HttpClient)
  url: string = "http://localhost:8080/currencies"

  public getCurrencies(): Observable<CurrencyModel[]> {
    return this.httpClient.get<CurrencyModel[]>(this.url, {withCredentials: true})
  }

  public insertCurrency(currency: CurrencyModel): Observable<CurrencyModel> {
    return this.httpClient.post<CurrencyModel>(this.url, currency, {withCredentials: true})
  }

  public getCurrencyById(currencyId: number): Observable<CurrencyModel> {
    return this.httpClient.get<CurrencyModel>(this.url + '/' + currencyId, {withCredentials: true})
  }

  public updateCurrency(currencyId: number, currency: CurrencyModel): Observable<CurrencyModel> {
    return this.httpClient.put<CurrencyModel>(this.url + '/' + currencyId, currency, {withCredentials: true})
  }

  public deleteCurrency(currencyId: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + currencyId, {withCredentials: true})
  }

}
