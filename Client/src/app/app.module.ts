import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {Oauth2CallbackComponent} from './oauth2-callback/oauth2-callback.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MenuComponent} from './menu/menu.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from "./auth/auth.guard";
import {AccountsComponent} from './auth/accounts/accounts.component';
import {ButtonComponent} from './library/button/button.component';
import {InputComponent} from './library/input/input.component';
import {CurrenciesComponent} from './currency/currencies/currencies.component';
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {IconComponent} from './library/icon/icon.component';
import {DialogModule} from "@angular/cdk/dialog";
import {AccountFormComponent} from './auth/account-form/account-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { StepperComponent } from './library/stepper/stepper.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import { CurrencyRadioInputComponent } from './library/currency-radio-input/currency-radio-input.component';
import { AccountComponent } from './auth/account/account.component';
import { TransactionsComponent } from './auth/transactions/transactions.component';
import { TransactionFormComponent } from './auth/transaction-form/transaction-form.component';
import { CategoryRadioInputComponent } from './library/category-radio-input/category-radio-input.component';
import { DateInputComponent } from './library/date-input/date-input.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'oauth2/callback', component: Oauth2CallbackComponent},
  {
    path: 'auth', component: AuthComponent, canActivate: [AuthGuard], children: [
      {path: 'accounts', component: AccountsComponent},
      {path: 'accounts/:accountId', component: AccountComponent},
      {path: 'accounts/:accountId/transactions', component: TransactionsComponent},
      {path: '**', redirectTo: "accounts", pathMatch: "full"}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    Oauth2CallbackComponent,
    HomeComponent,
    MenuComponent,
    AuthComponent,
    AccountsComponent,
    ButtonComponent,
    InputComponent,
    CurrenciesComponent,
    IconComponent,
    AccountFormComponent,
    StepperComponent,
    CurrencyRadioInputComponent,
    AccountComponent,
    TransactionsComponent,
    TransactionFormComponent,
    CategoryRadioInputComponent,
    DateInputComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    DialogModule,
    CdkStepperModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
