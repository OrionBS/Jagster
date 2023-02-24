import {Component, inject, OnInit} from '@angular/core';
import {GoogleService} from "../services/google.service";
import {IdToken} from "../models/IdToken";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  googleService: GoogleService = inject(GoogleService)

  idToken!: IdToken;

  ngOnInit(): void {
    this.idToken = this.googleService.getIdTokenFromStorage();
  }

}
