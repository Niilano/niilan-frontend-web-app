import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {

  title = "List Car"

  user = 'df'

  sucMsg:any
  errMsg:any

  regions = (["Western North Region- Sefwi Wiawso","Western Region – Sekondi","Volta Region – Ho","Greater Accra Region – Accra","Eastern Region – Koforidua","Ashanti Region – Kumasi","Central Region – Cape Coast","Northern Region – Tamale","Upper East Region – Bolgatanga","Upper West Region – Wa","Oti Region – Dambai","Bono East Region – Techiman","Ahafo Region – Goaso","Bono Region – Sunyani","North East Region – Nalerigu","Savannah Region – Damango"]).sort()

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  src:any = []

  seats:any = []

  speed = ["100km/hr","120km/hr","150km/hr","200km/hr","250km/hr"]

  loading = false

  imagePreview(files:any){
    if(files.length===0) 
      return;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(_event)=>{
      this.src.push(reader.result)
    }

  }

  resetForm(){

    while(this.src.length){
      this.src.pop()
    }
    
  }

  listCars = this.fb.group({
    token : [localStorage.getItem('userT')],
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

  listCarSubmit(){
    // this.sucMsg = "Project under development."

    this.loading = true

    this.listCars.controls['carImagesUrl'].setValue(JSON.stringify(this.src))

    console.log(this.listCars.getRawValue())

    this.http.post(`http://localhost:4000/listings/list`,this.listCars.getRawValue()).subscribe(
      res=>{

        let result = JSON.parse(JSON.stringify(res))

        this.loading = false

        this.sucMsg = result.msg

        setTimeout(() => {
          this.sucMsg = ""
          this.router.navigate([`/cars/details/${result.id-1}`])
        }, 2000);

        console.log("Response",res)
      },
      err=>{
        console.log(err)
        this.loading = false
        this.errMsg = err.error.msg
        setTimeout(() => {
          this.errMsg = ""
        }, 2000);
      }
    )

  }

  constructor( private fb:FormBuilder, private http : HttpClient, private router : Router ) {


   }

  ngOnInit(): void {
    var i = 0;

    while(i<50){
      this.seats.push(i)
      i++
    }
  }

}
