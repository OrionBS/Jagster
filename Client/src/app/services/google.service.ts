import {inject, Injectable} from '@angular/core';
import {google} from "../constants/google";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ParamMap, Router} from "@angular/router";
import {GoogleAuthorization} from "../models/GoogleAuthorization";
import {GoogleToken} from "../models/GoogleToken";
import {BehaviorSubject, Observable, Subject, timer} from "rxjs";
import {IdToken} from "../models/IdToken";
import {storage} from "../constants/storage";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  httpParams: HttpParams = new HttpParams();
  httpClient: HttpClient = inject(HttpClient);
  router: Router = inject(Router)

  public getAuthorizationCode(): void {

    const state: string = Math.random().toString(36).substring(7);
    sessionStorage.setItem(storage.state, state);

    window.location.href = google.authorization_request
      + '?scope=' +
      google.scope
      + '&access_type=' +
      google.access_type
      + '&response_type=' +
      google.response_type
      + '&state=' +
      state
      + '&redirect_uri=' +
      google.redirection_url
      + '&client_id=' +
      google.client_id
      + '&prompt=' +
      google.prompt

  }

  public manageGoogleAuthorization(paramMap: ParamMap): Observable<GoogleAuthorization> {
    return new Observable(subscriber => {
      if (!paramMap.has('state') || !paramMap.has('code')) {
        // Missing required parameters from url.
        subscriber.error("Missing url's params")
      } else {
        const state = paramMap.get('state')
        const code = paramMap.get('code')
        if (!state || !code) {
          // State or code is empty.
          subscriber.error("Wrong credentials.")
          const stateFromSession = sessionStorage.getItem(storage.state)
          if (!stateFromSession) {
            // Missing state from session storage.
            subscriber.error("Missing session storage's state.")
          } else {
            if (stateFromSession !== state) {
              // States didn't match.
              subscriber.error("States didn't match.")
            }
          }
        } else {
          subscriber.next(
            {
              code: code,
              state: state
            }
          )
        }
      }
    });
  }

  public manageGoogleTokenByUsingAuthorizationCode(googleAuthorization: GoogleAuthorization): Observable<GoogleToken> {
    console.log("Asking google token with code.")
    this.httpParams = this.httpParams.append('client_id', google.client_id)
    this.httpParams = this.httpParams.append('client_secret', google.code_secret)
    this.httpParams = this.httpParams.append('redirect_uri', google.redirection_url)
    this.httpParams = this.httpParams.append('grant_type', google.grant_type_authorization_code)
    this.httpParams = this.httpParams.append('code', googleAuthorization.code);
    return this.httpClient.post<GoogleToken>(google.token_request, null, {params: this.httpParams});
  }

  public generateGoogleTokenByUsingRefreshCode(googleToken: GoogleToken): Observable<GoogleToken> {
    console.log("Asking google token with refresh token.")
    this.httpParams = this.httpParams.append('client_id', google.client_id)
    this.httpParams = this.httpParams.append('client_secret', google.code_secret)
    this.httpParams = this.httpParams.append('grant_type', google.grant_type_refresh_token)
    this.httpParams = this.httpParams.append('refresh_token', googleToken.refresh_token);
    return this.httpClient.post<GoogleToken>(google.token_request, null, {params: this.httpParams});
  }

  public getIdTokenFromStorage(): IdToken {

    const idToken: string | null = localStorage.getItem(storage.id_token);

    if (!idToken) {
      throw new Error("Missing id token.")
    } else {

      const parsedIdToken: IdToken = JSON.parse(idToken);

      if (parsedIdToken.exp * 1000 < Date.now()) {

        throw new Error("Id token expired.")

      } else {
        return parsedIdToken;
      }

    }

  }

  public getGoogleTokenFromStorage(): GoogleToken {

    const googleToken: string | null = localStorage.getItem(storage.google_token);

    if (!googleToken) {
      this.router.navigate(['/'])
      throw new Error("Missing google token.")
    } else {
      return JSON.parse(googleToken);
    }

  }

  public revokeGoogleTokenWithIdToken(googleToken: GoogleToken) {
    console.log("Asking google token revocation.")
    this.httpParams = this.httpParams.append('token', googleToken.access_token)
    return this.httpClient.post<any>(google.revoke_request, null, {params: this.httpParams});
  }

  public isStateValid(googleAuthorization: GoogleAuthorization, router: Router) {


  }

  public scheduledGoogleTokenRefreshing(googleToken: GoogleToken) {

    const timeInMilliseconds: number = (googleToken.expires_in * 1000) - 3000;

    timer(timeInMilliseconds).subscribe({
      next: (value) => {
        this.generateGoogleTokenByUsingRefreshCode(googleToken).subscribe({
          next: (newGoogleToken) => {
            newGoogleToken.refresh_token = googleToken.refresh_token
            localStorage.setItem(storage.google_token, JSON.stringify(newGoogleToken))
            this.scheduledGoogleTokenRefreshing(newGoogleToken);
          }
        })
      }
    })


  }

  public revokeTokenId(router: Router) {

    const googleToken: GoogleToken = this.getGoogleTokenFromStorage();

    this.revokeGoogleTokenWithIdToken(googleToken).subscribe({
      next: value => {
        console.log(value)
        localStorage.removeItem(storage.google_token)
        localStorage.removeItem(storage.id_token)
        sessionStorage.removeItem(storage.state)
        router.navigate(['/']);
      },
      error: err => {
        console.log(err)
      }
    })

  }

  public storeGoogleToken(googleToken: GoogleToken) {
    localStorage.setItem('google_token', JSON.stringify(googleToken));
    localStorage.setItem('id_token', JSON.stringify(jwtDecode(googleToken.id_token)));
  }
}
