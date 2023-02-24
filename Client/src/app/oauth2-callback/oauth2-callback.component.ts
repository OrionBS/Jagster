import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GoogleService} from "../services/google.service";
import {GoogleAuthorization} from "../models/GoogleAuthorization";
import {GoogleToken} from "../models/GoogleToken";
import {catchError, map, of, Subscription, switchMap, tap, timer} from "rxjs";


@Component({
  selector: 'app-oauth2-callback',
  templateUrl: './oauth2-callback.component.html',
  styleUrls: ['./oauth2-callback.component.sass']
})
export class Oauth2CallbackComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  googleService: GoogleService = inject(GoogleService)

  ngOnInit(): void {

    this.subscription.add(
      this.activatedRoute.queryParamMap.pipe(
        switchMap((paramMap) => {
          console.log(paramMap)
          return this.googleService.manageGoogleAuthorization(paramMap).pipe(
            catchError(err => {
              console.table(err)
              this.router.navigate(['/'])
              return of(err)
            })
          )
        }),
        switchMap((googleAuthorization: GoogleAuthorization) => {
          console.log(googleAuthorization.code)
          return this.googleService.manageGoogleTokenByUsingAuthorizationCode(googleAuthorization).pipe(
            catchError(err => {
              console.table(err)
              this.router.navigate(['/'])
              return of(err)
            })
          )
        }),
        switchMap((googleToken: GoogleToken) => {
          this.googleService.storeGoogleToken(googleToken)
          return this.router.navigate(['/auth'])
        })
      ).subscribe(value => {
        console.log(value)
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
