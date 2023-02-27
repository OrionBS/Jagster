import {Component, Inject, inject, OnDestroy, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {mergeMap, of, Subscription} from "rxjs";
import {AccountModel} from "../../models/AccountModel";

import {CurrencyModel} from "../../models/CurrencyModel";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.sass']
})
export class AccountFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  dialogRef: DialogRef = inject(DialogRef)
  formBuilder: FormBuilder = inject(FormBuilder)
  formGroup!: FormGroup;
  accountService: AccountService = inject(AccountService)
  currencyService: CurrencyService = inject(CurrencyService)
  currencies: CurrencyModel[] = []

  constructor(@Inject(DIALOG_DATA) public data: AccountModel) {
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      currencyId: [null, Validators.required],
      initialAmount: [0, Validators.required]
    })

    this.loadCurrencies();

  }

  loadCurrencies() {
    this.subscription.add(
      this.currencyService.getCurrencies().subscribe({
        next: value => this.currencies = value
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  submitAccountForm(formGroup: FormGroup) {
    const accountId: number = formGroup.get('id')?.value
    if (!accountId) {
      this.subscription.add(
        of(formGroup).pipe(
          mergeMap((value) => {
            console.table(value.value)
            return this.accountService.insertAccount({
              name: value.get('name')?.value,
              description: value.get('description')?.value
            })
          }),
          mergeMap((accountWithId) => {
            console.log(accountWithId)
            return this.accountService.updateAccountByIdWithCurrencyById(accountWithId.id, formGroup.get('currencyId')?.value)
          })
        ).subscribe({
          next: value => this.dialogRef.close(value),
          error: err => console.log(err)
        })
      )
    } else {
      this.subscription.add(
        of(formGroup).pipe(
          mergeMap((value) => {
            console.table(value.value)
            return this.accountService.updateAccount(accountId, {
              name: value.get('name')?.value,
              description: value.get('description')?.value
            })
          }),
          mergeMap((accountWithId) => {
            console.log(accountWithId)
            return this.accountService.updateAccountByIdWithCurrencyById(accountWithId.id, formGroup.get('currencyId')?.value)
          })
        ).subscribe({
          next: value => this.dialogRef.close(value),
          error: err => console.log(err)
        })
      )
    }
  }

}
