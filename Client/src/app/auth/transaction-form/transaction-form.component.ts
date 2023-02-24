import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {Subscription} from "rxjs";
import {CategoryModel} from "../../models/CategoryModel";
import * as dayjs from "dayjs";
import {TransactionModel} from "../../models/TransactionModel";
import {TransactionService} from "../../services/transaction.service";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.sass']
})
export class TransactionFormComponent implements OnInit, OnDestroy {
  dialogRef: DialogRef = inject(DialogRef)
  formBuilder: FormBuilder = inject(FormBuilder)
  formGroup!: FormGroup;
  accountService: AccountService = inject(AccountService)
  accountServiceSubscription: Subscription = new Subscription()
  transactionService: TransactionService = inject(TransactionService)
  transactionServiceSubscription: Subscription = new Subscription()
  categoryService: CategoryService = inject(CategoryService)
  categoryServiceSubscription: Subscription = new Subscription()
  categories!: CategoryModel[]

  ngOnInit(): void {

    this.loadCategories()

    this.formGroup = this.formBuilder.group({
      id: [null],
      description: ['', Validators.required],
      amount: [0, Validators.required],
      categoryId: [null, Validators.required],
      date: [dayjs(), Validators.required]
    })

    this.formGroup.valueChanges.subscribe({
      next: value => console.log(value)
    })

  }

  loadCategories() {
    this.categoryServiceSubscription = this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories
    })
  }

  submitTransactionForm(formGroup: FormGroup) {
    const transaction: TransactionModel = {
      id: this.formGroup.get('id')?.value,
      description: this.formGroup.get('description')?.value,
      date: new Date(this.formGroup.get('date')?.value),
      amount: this.formGroup.get('amount')?.value,
      categoryId: this.formGroup.get('categoryId')?.value
    }
    this.transactionServiceSubscription = this.transactionService.insertTransaction(transaction).subscribe({
      next: (transaction) => {
        this.dialogRef.close(transaction)
      }
    })
  }

  initialLoad() {

  }

  ngOnDestroy(): void {
    this.categoryServiceSubscription.unsubscribe()
    this.transactionServiceSubscription.unsubscribe()
  }
}
