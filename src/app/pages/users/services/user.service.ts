import { environment } from './../../../../environments/environment.prod';
import {
  UserInterface,
  UserResponseInterface,
} from './../interfaces/user.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getAll(): Observable<UserInterface[]> {
    return of(environment.dataResponseBack);
  }

  getOne(id: number): Observable<UserInterface> {
    const userFind = environment.dataResponseBack.find(
      (user) => user.id === id
    );
    return of(userFind);
  }

  addOne(data: UserInterface): Observable<UserResponseInterface> {
    data.id = environment.dataResponseBack.length + 1;
    environment.dataResponseBack.push(data);
    const msgResponse = { status: 200, msg: 'ok' };
    return of(msgResponse);
  }

  updateOne(data: UserInterface): Observable<UserResponseInterface> {
    environment.dataResponseBack.forEach((user, indx) => {
      if (user.id === data.id) {
        environment.dataResponseBack[indx] = data;
      }
    });
    const msgResponse = { status: 200, msg: 'ok' };
    return of(msgResponse);
  }

  deleteOne(id: number): Observable<UserResponseInterface> {
    environment.dataResponseBack.forEach((user, indx) => {
      if (user.id === id) {
        environment.dataResponseBack.splice(indx, 1);
      }
    });
    const msgResponse = { status: 200, msg: 'ok' };
    return of(msgResponse);
  }
}
