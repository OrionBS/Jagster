import {Component, inject, OnInit} from '@angular/core';
import {GoogleService} from "../services/google.service";
import {IdToken} from "../models/IdToken";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  googleService: GoogleService = inject(GoogleService)
  router: Router = inject(Router)
  idToken!: IdToken;

  ngOnInit(): void {
    this.idToken = this.googleService.getIdTokenFromStorage();
  }
}
