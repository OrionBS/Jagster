import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.subscription.add(

    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
