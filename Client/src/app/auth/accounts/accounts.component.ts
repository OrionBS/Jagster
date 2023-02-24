import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {AccountFormComponent} from "../account-form/account-form.component";
import {AccountEntity} from "../../entity/AccountEntity";
import {AccountService} from "../../services/account.service";
import {Subscription} from "rxjs";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit, OnDestroy {
  dialog: Dialog = inject(Dialog)
  currencyDialog?: any;
  accountService: AccountService = inject(AccountService)
  accountServiceSubscription: Subscription = new Subscription()
  currencyService: CurrencyService = inject(CurrencyService)
  currencyServiceSubscription: Subscription = new Subscription()
  accounts: AccountEntity[] = []

  openAccountForm() {
    const dialogRef = this.dialog.open(AccountFormComponent)
    dialogRef.closed.subscribe({
      next: value => value ? this.loadAccounts() : null
    })
  }

  updateAccount(account: AccountEntity) {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      data: account
    })
    dialogRef.closed.subscribe({
      next: value => value ? this.loadAccounts() : null
    })
  }

  ngOnInit(): void {
    this.loadAccounts()
  }

  private loadAccounts() {
    this.accounts = []
    this.accountServiceSubscription = this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        accounts.forEach((account) => {
          this.currencyServiceSubscription = this.currencyService.getCurrencyById(account.currencyId).subscribe({
            next: (currency) => {
              this.accounts.push({
                id: account.id,
                name: account.name,
                description: account.description,
                initialAmount: account.initialAmount,
                currency: {
                  id: currency.id,
                  name: currency.name,
                  code: currency.code,
                  symbol: currency.symbol
                }
              })
            }
          })
        })
      },
      error: err => console.table(err)
    })
  }

  deleteAccount(id: number) {
    this.accountServiceSubscription = this.accountService.deleteAccount(id).subscribe({
      next: value => this.loadAccounts()
    })
  }

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe()
    this.currencyServiceSubscription.unsubscribe()
  }

}
