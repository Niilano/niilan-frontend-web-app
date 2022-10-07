import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { cars } from '../cars';
import { paths } from '../routes';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersInfoService } from '../users-info.service';

import { environment } from 'src/environments/environment';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  p: number = 1;

  sidebarExpanded = true;

  price = 100

  loggedIn:any

  // cars = cars

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

loader = true

getAllCars(){

  this.loader = true

  this.cars.getAllCars().subscribe(
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

  constructor( private http : HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder,  private users : UsersInfoService, private cars : CarsService ) {

    // alert(environment)

    // this.getAllCars()

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

  //   this.route.paramMap.subscribe(params => {
      
  //     // console.log(params.get('location'))

  //     cars.forEach((b:any)=>{
  //   // this.cars = b[a]
  //   if((b['location'] == params.get('location')) && (b['category'] == params.get('category')) && (b['price'] <= Number(params.get('price'))) ){
  //     this.carsSorted.push(b)
  //     // console.log("Categories : ",b['category'])
  //   }
    
  // })

  //   })


  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

switch(true){
  case Boolean(params.get('region')):
    this.cars.sortCarsByRegion(params.get('region')).subscribe(
      res=>{
        this.loader = false
        this.cars1 = JSON.parse(JSON.stringify(res))
        this.cars1.forEach((a:any,index:any)=>{
          this.cars1[index].carImagesUrl = JSON.parse(a.carImagesUrl)
        })
      }
    )
    break

    case Boolean(params.get('brand') && params.get('type') && params.get('price')):
      this.cars.sortCars(params.get('brand'),params.get('type'),params.get('price')).subscribe(
      res=>{
        this.loader = false
        this.cars1 = JSON.parse(JSON.stringify(res))
        this.cars1.forEach((a:any,index:any)=>{
          this.cars1[index].carImagesUrl = JSON.parse(a.carImagesUrl)
        })
      }
    )
      break
      default:
        this.getAllCars()
}

    })

   }

}
