import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  brand = ''
  type = ''

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  price = 100

  riderect(){
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
