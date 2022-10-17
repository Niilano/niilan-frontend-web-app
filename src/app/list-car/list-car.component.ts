import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  regions = (["Western North Region","Western Region","Volta Region","Greater Accra Region","Eastern Region","Ashanti Region","Central Region","Northern Region","Upper East Region","Upper West Region","Oti Region","Bono East Region","Ahafo Region","Bono Region","North East Region","Savannah Region"]).sort()

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
      this.imgToForm()
    }

  }

  resetForm(){

    while(this.src.length){
      this.src.pop()
    }
    
  }

  submitted = false

  listCars = this.fb.group({
    token : [localStorage.getItem('userT')],
    carName : ['',Validators.required],
    carRegion : ['',Validators.required],
    carLocation : ['',Validators.required],
    noOfSeats: ['',Validators.required],
    fuel: ['',Validators.required],
    speed: ['',Validators.required],
    color : ['',Validators.required],
    price : ['',Validators.required],
    carMake : ['',Validators.required],
    bodyStyle : ['',Validators.required],
    carImagesUrl : ['',Validators.required],
    description : ['',Validators.required],
    driver : ['',Validators.required],
    carPlate : ['',Validators.required]
  })

  get listCarsV(){
    return this.listCars.controls
  }

  imgToForm(){
    this.listCars.controls['carImagesUrl'].setValue(JSON.stringify(this.src))
  }

  listCarSubmit(){
    
    this.submitted = true

    if(this.listCars.invalid) return

    this.loading = true

    console.log(this.listCars.getRawValue())

    this.http.post(`${environment.apiKey}listings/list`,this.listCars.getRawValue()).subscribe(
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
