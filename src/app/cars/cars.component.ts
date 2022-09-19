import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

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

  cars1:any

  carsSorted:any = []

  searchForm = this.fb.group({
    price : ['500'],
    location : [''],
    bodyStyle : [''],
    carMake : ['']
  })

  regions = (["Western North Region- Sefwi Wiawso","Western Region – Sekondi","Volta Region – Ho","Greater Accra Region – Accra","Eastern Region – Koforidua","Ashanti Region – Kumasi","Central Region – Cape Coast","Northern Region – Tamale","Upper East Region – Bolgatanga","Upper West Region – Wa","Oti Region – Dambai","Bono East Region – Techiman","Ahafo Region – Goaso","Bono Region – Sunyani","North East Region – Nalerigu","Savannah Region – Damango"]).sort()

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()


sortSearch(){
  
  console.log(this.searchForm.getRawValue())

  this.router.navigate(['/cars/search',this.searchForm.getRawValue().location,this.searchForm.getRawValue().price,this.searchForm.getRawValue().bodyStyle])
}

loader = false
  

  // im = JSON.parse(cars[3].images)

  constructor( private http : HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder ) {

    // this.regionsSearch()

    // if(!location.pathname.includes('search')) this.cars = cars

    // this.cars[0].images = JSON.parse(cars[0].images)
    
    // this.loader = true

    this.http.get('http://localhost:4000/listings/getListings').subscribe(
      res=>{
        // console.log(res)
        this.cars1 = JSON.parse(JSON.stringify(res))
        this.cars1.forEach((a:any,index:any)=>{
          this.cars1[index].carImagesUrl = JSON.parse(a.carImagesUrl)
        })
      },
      err=>{

      }
    )

    this.route.paramMap.subscribe(params => {
      
      // console.log(params.get('location'))

      cars.forEach((b:any)=>{
    // this.cars = b[a]
    if((b['location'] == params.get('location')) && (b['category'] == params.get('category')) && (b['price'] <= Number(params.get('price'))) ){
      this.carsSorted.push(b)
      // console.log("Categories : ",b['category'])
    }
    
  })

  // this.loader = false

  //     // params.get('carsId')
    })

    // alert(this.route.snapshot.paramMap.get('price'))

    // this.cars.forEach((d:any,index:any)=>{
    //   // console.log(d['category'])
    //   this.cars[index].images = JSON.parse(JSON.stringify(d.images))
    // })

    // console.log(this.cars)

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

    this.from = this.searchForm.getRawValue().price
    this.to = to.value

  }

}
