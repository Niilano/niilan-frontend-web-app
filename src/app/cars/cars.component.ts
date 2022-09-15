import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { cars } from '../cars';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  userToken = localStorage.getItem('user')

  user = localStorage.getItem("username")

  cars = cars

  

  // im = JSON.parse(cars[3].images)

  constructor( private http : HttpClient ) {

    // this.cars[0].images = JSON.parse(cars[0].images) 

    this.cars.forEach((d:any,index:any)=>{
      // console.log(index)
      this.cars[index].images = JSON.parse(JSON.stringify(d.images))
    })

    console.log(this.cars)

    this.http.get(`http://localhost:4000/users/info/${this.userToken}`).subscribe(
      res=>{
        
        let result = JSON.parse(JSON.stringify(res))

        // this.user = result.user

        // console.log(result.user)

      },
      err =>{

      }
    )

  }

  from:any
  to:any

  priceRangeFrom(){
    let from = document.getElementById('from') as HTMLInputElement
    this.from = from.value

  }

  priceRangeTo(){
    let to = document.getElementById('to') as HTMLInputElement
    this.to = to.value

  }

  ngOnInit(): void {

    let from = document.getElementById('from') as HTMLInputElement
    let to = document.getElementById('to') as HTMLInputElement

    this.from = from.defaultValue
    this.to = to.value

  }

}
