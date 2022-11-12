import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  brandData = [
    {
      name : 'Mercedes-Benz',
      logo : '../../assets/brands/benz.png'
    },
    {
      name : 'Toyota',
      logo : '../../assets/brands/toyota.png'
    },
    {
      name : 'BMW',
      logo : '../../assets/brands/bmw.png'
    },
    {
      name : 'Ford',
      logo : '../../assets/brands/ford.png'
    },
    {
      name : 'Honda',
      logo : '../../assets/brands/honda.png'
    },
    {
      name : 'Hyundai',
      logo : '../../assets/brands/hyundai.png'
    },
    {
      name : 'Chevrolet',
      logo : '../../assets/brands/chevrolet.png'
    },
    {
      name : 'Nissan',
      logo : '../../assets/brands/nissan.png'
    },
    {
      name : 'Mitsubishi',
      logo : '../../assets/brands/mitsubishi.png'
    },
    {
      name : 'Lincoln',
      logo : '../../assets/brands/lincoln.png'
    }

  ]

  typeData = [
    {
      name : 'Pickup Truck',
      logo : '../../assets/types/pickup.jpg'
    },
    {
      name : 'Van/Minivan',
      logo : '../../assets/types/van.jpg'
    },
    {
      name : 'Buses',
      logo : '../../assets/types/bus.jpg'
    },
    {
      name : 'Sports Car & Coupe',
      logo : '../../assets/types/sports.jpg'
    },
    {
      name : 'Sedan',
      logo : '../../assets/types/Sedan.jpg'
    },
    {
      name : 'SUV',
      logo : '../../assets/types/suv.jpg'
    },
    {
      name : 'Hatchback',
      logo : '../../assets/types/Hatchback.jpg'
    },
    {
      name : 'Convertible',
      logo : '../../assets/types/Convertible.jpg'
    },
    {
      name : 'Taxi',
      logo : '../../assets/types/taxi.jpg'
    }
  ]

  chooseBrandOrType(brand:any,type:any){

    this.brand = brand

    this.type = type

    this.riderect()

  }

  brand = ''
  type = ''

  fill:any

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  price = 100

  riderect(){

    if(!this.brand && !this.type){
      this.fill = "Please choose type or brand";
      return
    }

    if(!this.brand){
      this.brand = '...'
    }
    if(!this.type){
      this.type = '...'
    }

   this.route.navigate(['/cars/sort/',this.brand,this.type])
  }

  constructor( private route : Router ) { }

  ngOnInit(): void {
  }

}
