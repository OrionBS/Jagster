import {Component, inject} from '@angular/core';
import {UserService} from "../services/user.service";
import {AccountService} from "../services/account.service";
import {combineLatest, map, mergeMap} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {



}
