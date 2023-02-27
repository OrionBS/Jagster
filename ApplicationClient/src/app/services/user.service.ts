import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public getUser(): Observable<{ id: number, firstName: string, lastName: string, email: string, picture: string }> {
    return of({
      id: 1,
      firstName: 'Orion',
      lastName: 'Beauny-Sugot',
      email: 'obeaunysugot@gmail.com',
      picture: 'https://lh3.googleusercontent.com/a/AGNmyxYTqmPrwMGatTwwqi5lsjjIWsQ6t4eOhfPNYJbb8w=s96-c'
    })
  }

}
