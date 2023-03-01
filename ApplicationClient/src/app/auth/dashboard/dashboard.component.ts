import {Component, inject} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import {combineLatest, map, mergeMap} from "rxjs";
import {CurrencyService} from "../../services/currency.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

  userService: UserService = inject(UserService)
  user$ = this.userService.getUser()
  currencyService: CurrencyService = inject(CurrencyService)
  currencies$ = this.currencyService.getCurrencies()
  categoryService: CategoryService = inject(CategoryService)
  categories$ = this.categoryService.getCurrencies()
  accountService: AccountService = inject(AccountService)
  accounts$ = this.user$.pipe(
    mergeMap(user => this.accountService.getAccounts(user.id))
  )
  data$ = combineLatest([this.user$, this.accounts$, this.currencies$, this.categories$]).pipe(
    map(([user, accounts, currencies, categories]) => {
      return {user: user, accounts: accounts, currencies: currencies, categories: categories}
    })
  )

}
