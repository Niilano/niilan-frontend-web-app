import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  userToken = localStorage.getItem('user')

  user:any

  constructor( private http : HttpClient ) { 

    this.http.get(`http://localhost:4000/users/info/${this.userToken}`).subscribe(
      res=>{
        
        let result = JSON.parse(JSON.stringify(res))

        this.user = result.user

      },
      err =>{

      }
    )

  }

  ngOnInit(): void {
  }

}
