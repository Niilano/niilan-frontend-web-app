import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getAllUsers(){
    return this.http.get(`${environment.apiKey}admin/users/allUsers`)
  }

  getOneUser(userId:any){
    return this.http.get(`${environment.apiKey}admin/users/user${userId}`)
  }

  removeUser(userId:any){
return this.http.get(`${environment.apiKey}admin/users/removeUser${userId}`)
  }

  getListings(){
    return this.http.get(`${environment.apiKey}admin/listings/allListings`)
  }

  broadcastMessage(data:any){
    return this.http.post(`${environment.apiKey}admin/message/broadcast`,data)
  }

  constructor( private http : HttpClient ) { }
}
