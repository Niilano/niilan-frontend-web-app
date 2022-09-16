import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { cars } from '../cars';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  sidebarExpanded = true;

  userToken = localStorage.getItem('user')

  user = localStorage.getItem("username")

  cars = cars

  regions = (["Western North Region- Sefwi Wiawso","Western Region – Sekondi","Volta Region – Ho","Greater Accra Region – Accra","Eastern Region – Koforidua","Ashanti Region – Kumasi","Central Region – Cape Coast","Northern Region – Tamale","Upper East Region – Bolgatanga","Upper West Region – Wa","Oti Region – Dambai","Bono East Region – Techiman","Ahafo Region – Goaso","Bono Region – Sunyani","North East Region – Nalerigu","Savannah Region – Damango"]).sort()

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()


regionsSearch(a:any){
  // alert(a.value)

  // this.cars = ["asfb","das"]

  // cars.forEach((b:any)=>{
  //   // this.cars = b[a]
  //   if(b['category'] == a){
  //     this.cars = b['category']
  //   }
  // })

  // console.log(this.cars)

  // this.route.navigate(['/cars/search','users'])
}
  

  // im = JSON.parse(cars[3].images)

  constructor( private http : HttpClient, private route: Router ) {

    // this.cars[0].images = JSON.parse(cars[0].images) 

    this.cars.forEach((d:any,index:any)=>{
      // console.log(d['category'])
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

    this.from = from.value
    this.to = to.value

  }

}
