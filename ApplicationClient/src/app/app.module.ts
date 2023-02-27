import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './auth/dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {LoadingComponent} from './loading/loading.component';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";

const routes: Routes = [
  {path: '', component: LoadingComponent},
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    LoadingComponent
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
