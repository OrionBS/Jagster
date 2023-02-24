import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountModel} from "../../models/AccountModel";
import {CurrencyEntity} from "../../entity/CurrencyEntity";
import {CurrencyService} from "../../services/currency.service";
import {TransactionService} from "../../services/transaction.service";
import {CategoryService} from "../../services/category.service";
import {CategoryModel} from "../../models/CategoryModel";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit, OnDestroy {
  history: History = history;
  accountService: AccountService = inject(AccountService)
  accountServiceSubscription: Subscription = new Subscription();
  currencyService: CurrencyService = inject(CurrencyService)
  currencyServiceSubscription: Subscription = new Subscription()
  categoryService: CategoryService = inject(CategoryService)
  categoryServiceSubscription: Subscription = new Subscription()
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  account!: AccountView

  ngOnInit(): void {
    this.loadAccount(this.getAccountId())
  }

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe()
    this.currencyServiceSubscription.unsubscribe()
    this.categoryServiceSubscription.unsubscribe()
  }

  getAccountId(): number {
    let accountId: any
    this.activatedRoute.paramMap.subscribe({
      next: value => accountId = value.get('accountId'),
      error: err => this.router.navigate(['../'], {relativeTo: this.activatedRoute})
    })
    return accountId
  }

  loadAccount(accountId: number) {
    this.accountServiceSubscription = this.accountService.getAccountById(accountId).subscribe({
      next: (account) => {
        this.currencyServiceSubscription = this.currencyService.getCurrencyById(account.currencyId).subscribe({
          next: (currency) => {
            this.categoryServiceSubscription = this.categoryService.getCategories().subscribe({
              next: (categories) => {
                this.accountServiceSubscription = this.accountService.getTransactionsByAccountById(account.id).subscribe({
                  next: (transactions) => {
                    this.account = {
                      id: account.id,
                      name: account.name,
                      description: account.description,
                      initialAmount: account.initialAmount,
                      currencySymbol: currency.symbol,
                      transactions: transactions.map(
                        (transaction) => {
                          return {
                            description: transaction.description,
                            date: transaction.date,
                            amount: transaction.amount,
                            categoryIcon: categories.find(category => category.id === transaction.categoryId)?.icon
                          }
                        }
                      )
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  }

}

export interface AccountView {
  id: number
  name: string
  description: string
  initialAmount: number
  currencySymbol: string
  transactions:
    {
      description: string
      date: Date
      amount: number
      categoryIcon: string | undefined
    }[]
}
