import {Component, inject} from '@angular/core';
import {TransactionService} from "../../../services/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent {

  transactionService: TransactionService = inject(TransactionService)


}
