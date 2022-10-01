import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { cars } from '../cars';
import { paths } from '../routes';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersInfoService } from '../users-info.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  sidebarExpanded = true;

  price:any

  loggedIn:any

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

getAllCars(){

  this.loader = true

  this.http.get(`${paths.backHost}listings/getListings`).subscribe(
      res=>{
        // console.log(res)
        this.loader = false
        this.cars1 = JSON.parse(JSON.stringify(res))
        this.cars1.forEach((a:any,index:any)=>{
          this.cars1[index].carImagesUrl = JSON.parse(a.carImagesUrl)
        })
      },
      err=>{
        console.log(err)
        this.loader = false
        // alert('error')
      }
    )
}
  

  // im = JSON.parse(cars[3].images)

  constructor( private http : HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder,  private users : UsersInfoService ) {

    this.getAllCars()

    this.users.userInfo().subscribe(
      res=>{
        this.loggedIn = true
        console.log(res)
      },
      err=>{
        this.loggedIn = false
        console.log(err)
        // alert(err.error.msg)
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

    })


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
