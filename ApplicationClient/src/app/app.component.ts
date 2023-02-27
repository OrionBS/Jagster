import {Component, inject} from '@angular/core';
import {UserService} from "./services/user.service";
import {AccountService} from "./services/account.service";
import {combineLatest, delay, map, mergeMap, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  userService: UserService = inject(UserService)
  user$ = this.userService.getUser()
  accountService: AccountService = inject(AccountService)
  accounts$ = this.user$.pipe(
    delay(2000),
    mergeMap(user => this.accountService.getAccountsById(user.id))
  )
  data$ = combineLatest([this.user$, this.accounts$]).pipe(
    map(([user, accounts]) => {
      return {user: user, accounts: accounts}
    })
  )
}
