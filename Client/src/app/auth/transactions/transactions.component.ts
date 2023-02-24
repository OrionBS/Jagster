import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {forkJoin, map, Subscription, switchMap, tap, throwError} from "rxjs";
import {AccountService} from "../../services/account.service";
import {TransactionModel} from "../../models/TransactionModel";
import {CategoryService} from "../../services/category.service";
import {TransactionEntity} from "../../entity/TransactionEntity";
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {TransactionFormComponent} from "../transaction-form/transaction-form.component";
import {AccountModel} from "../../models/AccountModel";
import {CategoryModel} from "../../models/CategoryModel";
import {CurrencyService} from "../../services/currency.service";
import {CurrencyModel} from "../../models/CurrencyModel";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  dialog: Dialog = inject(Dialog)
  history: History = history
  subscription: Subscription = new Subscription()
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  activatedRouteSubscription: Subscription = new Subscription()
  accountService: AccountService = inject(AccountService)
  accountServiceSubscription: Subscription = new Subscription()
  categoryService: CategoryService = inject(CategoryService)
  categoryServiceSubscription: Subscription = new Subscription()
  currencyService: CurrencyService = inject(CurrencyService)
  currencyServiceSubscription: Subscription = new Subscription()
  account!: AccountModel
  currency!: CurrencyModel
  transactions: TransactionModel[] = []
  transactionEntities: TransactionEntity[] = []
  categories: CategoryModel[] = []

  ngOnInit(): void {
    this.initialLoad()
  }

  openTransactionForm(transaction?: TransactionEntity) {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      data: transaction
    })
    dialogRef.closed.subscribe({
      next: (transaction) => {
        if (transaction) {
          this.accountService.updateAccountByIdWithTransactionById(this.account.id, (transaction as TransactionModel).id).subscribe({
            next: (transaction) => {
              /*
                            transaction ? this.loadTransactions() : null
              */
            }
          })
        }
      }
    })
  }

  loadAccount() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const accountId: string | null = paramMap.get('accountId')
        if (accountId) {
          this.accountServiceSubscription = this.accountService.getAccountById(parseInt(accountId)).subscribe({
            next: (account) => this.account = account
          })
        } else {
          this.history.back()
        }
      }
    })
  }

  /*loadTransactions() {
    this.accountServiceSubscription = this.accountService.getTransactionsByAccountId(this.account.id).subscribe({
      next: (transactions) => {
        this.transactions = []
        transactions.forEach(
          (transaction) => {
            this.categoryServiceSubscription = this.categoryService.getCategoryById(transaction.categoryId).subscribe({
              next: (category) => {
                this.transactions.push({
                  id: transaction.id,
                  description: transaction.description,
                  date: transaction.date,
                  amount: transaction.amount,
                  categoryId: category.id,
                  categoryIcon: category.icon,
                  currencySymbol: this.currency.symbol
                })
              }
            })
          }
        )
      }
    })
  }*/

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public getCategoryById(categoryId: number): CategoryModel | undefined {
    return this.categories.find(category => category.id === categoryId)
  }

  private initialLoad() {
    this.subscription.add(
      this.activatedRoute.paramMap.pipe(
        map((paramMap: ParamMap) => {
          const accountId: string | null = paramMap.get('accountId')
          if (accountId) {
            return parseInt(accountId)
          } else {
            throw new Error("")
          }
        }),
        switchMap((accountId: number) => {
          return this.accountService.getAccountById(accountId)
        }),
        switchMap((account: AccountModel) => {
          this.account = account
          return forkJoin([
            this.currencyService.getCurrencyById(account.currencyId),
            this.accountService.getTransactionsByAccountById(account.id),
            this.categoryService.getCategories()
          ])
        }),
        tap(([currency, transactions, categories]) => {
          this.currency = currency;
          this.categories = categories
          this.transactions = transactions
        })
      ).subscribe({
        error: err => this.history.back()
      })
    )
  }

  public getCurrencyById(currencyId: number) {
    return this.currency;
  }
}

export interface TransactionView {
  id: number
  description: string
  date: Date
  amount: number
  categoryId?: number
  categoryIcon?: string
  currencySymbol?: string
}
