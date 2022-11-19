import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { cars } from '../cars';
import { paths } from '../routes';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersInfoService } from '../users-info.service';

import { environment } from 'src/environments/environment';
import { CarsService } from '../cars.service';
import { SeoService } from '../seo.service';

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

noCarAvailable:any
popup:any

  constructor( private seo : SeoService,  private http : HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder,  private users : UsersInfoService, private cars : CarsService ) {

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


  }

  ngOnInit(): void {

    this.seo.addTag()

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

        if(!(this.cars1.length > 0)){
          this.noCarAvailable = `No vehicle available for your search "Region: ${params.get('region')}"`
          this.popup = `No vehicle available for your search "Region: ${params.get('region')}"`
        }

      }
    )
    break

    case Boolean(params.get('brand') && params.get('type')):
      this.cars.sortCars(params.get('brand'),params.get('type')).subscribe(
      res=>{
        console.log(res)
        this.loader = false
        this.cars1 = JSON.parse(JSON.stringify(res))
        this.cars1.forEach((a:any,index:any)=>{
          this.cars1[index].carImagesUrl = JSON.parse(a.carImagesUrl)
        })

        if(!(this.cars1.length > 0)){
          this.noCarAvailable = `No vehicle available for your search "Brand: ${params.get('brand')}", "Type: ${params.get('type')}"`
          this.popup = `No vehicle available for your search "Brand: ${params.get('brand')}", "Type: ${params.get('type')}"`
        }

        else{
          this.noCarAvailable = ""
          this.popup = ""
        }

      }
    )
      break
      default:
        this.getAllCars()
}

    })

    setTimeout(() => {
      this.popup = ''
    }, 3000);

   }

}
