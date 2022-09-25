import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {paths} from './routes';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {

  userInfo(){
    return this.http.get(`${paths.backHost}users/info/${localStorage.getItem('user')}`)
  }

  constructor( private http : HttpClient ) { }
}
