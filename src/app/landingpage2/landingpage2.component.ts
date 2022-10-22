import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-landingpage2',
  templateUrl: './landingpage2.component.html',
  styleUrls: ['./landingpage2.component.scss']
})
export class Landingpage2Component implements OnInit {

  p: number = 1;

  region:any
  fill:any

  regions = (["Western North Region","Western Region","Volta Region","Greater Accra Region","Eastern Region","Ashanti Region","Central Region","Northern Region","Upper East Region","Upper West Region","Oti Region","Bono East Region","Ahafo Region","Bono Region","North East Region","Savannah Region"]).sort()
  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  price = 100

  cars1:any

  moreCars = ()=>{
    this.route.navigateByUrl('cars#cars')
  }

  sortRegion(){
    if(!this.region){
      this.fill = "Please select your region"
      return
    }

    this.route.navigateByUrl(`cars/region/${this.region}`)
  }

  constructor( private cars : CarsService, private route : Router ) {

    this.cars.getAllCars().subscribe(
      res=>{
        this.cars1 = JSON.parse(JSON.stringify(res))
        this.cars1.forEach((a:any,index:any)=>{
          this.cars1[index].carImagesUrl = JSON.parse(a.carImagesUrl)
        })
      }
    )

   }

  ngOnInit(): void {
 
  }

}
