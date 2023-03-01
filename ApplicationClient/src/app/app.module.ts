import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './auth/dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {LoadingComponent} from './loading/loading.component';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import { TransactionsComponent } from './auth/dashboard/transactions/transactions.component';
import { TransactionComponent } from './auth/dashboard/transaction/transaction.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    LoadingComponent,
    TransactionsComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
