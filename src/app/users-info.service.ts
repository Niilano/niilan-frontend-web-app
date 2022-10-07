import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {paths} from './routes';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {

  userInfo(){
    return this.http.get(`${environment.apiKey}users/info/${localStorage.getItem('userT')}`)
  }

  constructor( private http : HttpClient ) { }
}
