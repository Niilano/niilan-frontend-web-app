import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersInfoService } from '../users-info.service';

import { paths } from '../routes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-listings',
  templateUrl: './manage-listings.component.html',
  styleUrls: ['./manage-listings.component.scss']
})
export class ManageListingsComponent implements OnInit {

  title = "Manage Listings"

  loggedIn:any

  noListings:any

  src:any = []

  cars:any = []

  regions = (["Western North Region- Sefwi Wiawso","Western Region – Sekondi","Volta Region – Ho","Greater Accra Region – Accra","Eastern Region – Koforidua","Ashanti Region – Kumasi","Central Region – Cape Coast","Northern Region – Tamale","Upper East Region – Bolgatanga","Upper West Region – Wa","Oti Region – Dambai","Bono East Region – Techiman","Ahafo Region – Goaso","Bono Region – Sunyani","North East Region – Nalerigu","Savannah Region – Damango"]).sort()

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  speed = ["100km/hr","120km/hr","150km/hr","200km/hr","250km/hr"]

  listCars = this.fb.group({
    token : [localStorage.getItem('user')],
    carName : [''],
    carRegion : [''],
    carLocation : [''],
    noOfSeats: [''],
    fuel: [''],
    speed: [''],
    color : [''],
    price : [''],
    carMake : [''],
    bodyStyle : [''],
    carImagesUrl : [''],
    description : [''],
    driver : [''],
    carPlate : ['']
  })

  updateCarSubmit(){

  }

  imagePreview(files:any){
    if(files.length===0) 
      return;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(_event)=>{
      this.src.push(reader.result)
    }

  }

  constructor( private user: UsersInfoService, private route : Router, private gRoute : ActivatedRoute, private http : HttpClient, private fb:FormBuilder ) {

    this.user.userInfo().subscribe(
      res=>{
        this.loggedIn = true
      },
      err=>{
        // this.err
        // this.route.navigate(['cars'])

      }
    )

    this.http.get(`${environment.apiKey}listings/getAllListings/${localStorage.getItem('userT')}`).subscribe(
      res=>{
        console.log(res)

        let result = JSON.parse(JSON.stringify(res))
        if(result.length < 1){
          this.noListings = "No Vehicles Listed"
        }
        else{
          result.forEach((each:any)=>{
            this.cars.push(each)
          })
          
        }

      },
      err=>{
        console.log(err)
        this.noListings = "No Vehicles Listed"
      }
    )

   }

  ngOnInit(): void {
    this.gRoute.paramMap.subscribe(params => {

      if(params.get('id')){

      let index = Number(params.get('id'))
      
      this.http.get(`${environment.apiKey}listings/getListings/${index}`).subscribe(
      res=>{

        let lists = document.getElementById('lists') as HTMLElement
        lists.classList.add('hidden')

        let form = document.getElementById('uForm') as HTMLElement
        form.classList.remove('hidden')

        let results = JSON.parse(JSON.stringify(res))

        this.listCars.controls['carName'].setValue(results.carName)
        this.listCars.controls['carRegion'].setValue(results.carRegion)
        this.listCars.controls['carLocation'].setValue(results.carLocation)
        this.listCars.controls['noOfSeats'].setValue(results.noOfSeats)
        this.listCars.controls['fuel'].setValue(results.fuel)
        this.listCars.controls['speed'].setValue(results.speed)
        this.listCars.controls['color'].setValue(results.color)
        this.listCars.controls['price'].setValue(results.price)
        this.listCars.controls['carMake'].setValue(results.carMake)
        this.listCars.controls['bodyStyle'].setValue(results.bodyStyle)
        this.listCars.controls['carImagesUrl'].setValue(results.carImagesUrl)
        this.listCars.controls['description'].setValue(results.description)
        this.listCars.controls['driver'].setValue(results.driver)
        this.listCars.controls['carPlate'].setValue(results.carPlate)

        let src = JSON.parse(results.carImagesUrl)

        src.forEach((each:any)=>{
          this.src.push(each)
        })
        
      },
      err=>{
        console.log(err)
      }
    )

      }

    })
  }

}
