import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass']
})
export class TransactionComponent {

  @Input()
  data!: { id: number, description: string, amount: number, date: Date, categoryIcon: string, currencySymbol: string }

}
