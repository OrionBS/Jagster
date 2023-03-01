import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {AccountService} from "./services/account.service";
import {combineLatest, delay, map, mergeMap, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.fakeUser()
  }

  fakeUser() {
    localStorage.setItem('user', '1')
  }
}
