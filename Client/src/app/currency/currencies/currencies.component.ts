import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Subscription} from "rxjs";
import {CurrencyModel} from "../../models/CurrencyModel";
import {Dialog, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.sass']
})
export class CurrenciesComponent implements OnInit, OnDestroy {
  currencyService: CurrencyService = inject(CurrencyService)
  dialogRef: DialogRef = inject(DialogRef)
  dialog: Dialog = inject(Dialog)
  currencyServiceSubscription: Subscription = new Subscription()
  currencies: CurrencyModel[] = []

  ngOnInit(): void {

    this.currencyServiceSubscription = this.currencyService.getCurrencies().subscribe({
      next: (value) => this.currencies = value
    })

  }

  ngOnDestroy(): void {
    this.currencyServiceSubscription.unsubscribe();
  }

}
