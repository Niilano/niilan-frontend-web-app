import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

import {paths} from './routes';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {

  userT:any = ""

  userInfo(){
    return this.http.get(`${environment.apiKey}users/info/${this.userT}`)
  }

  constructor( private http : HttpClient, @Inject(PLATFORM_ID) private platformid : object ) { 
    if(isPlatformBrowser(this.platformid)) this.userT=localStorage.getItem('userT')
   }
}
