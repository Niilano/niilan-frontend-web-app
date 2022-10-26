import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  newsrc:any = []

  //ngModel
  availableDate:any

  removeImageFromSrc(index:number){
    this.src.splice(index,1)
    // this.imgToForm()
    return
  }

  removeImageFromNewSrc(index:number){
    this.newsrc.splice(index,1)
    // this.imgToForm()
    return
  }

  imgToForm(){
    this.listCars.controls['token'].setValue(localStorage.getItem('userT'))
    this.listCars.controls['newImageSrc'].setValue(JSON.stringify(this.newsrc))
    this.listCars.controls['oldImageSrc'].setValue(JSON.stringify(this.src))
  }

  cars:any = []

  regions = (["Western North Region","Western Region","Volta Region","Greater Accra Region","Eastern Region","Ashanti Region","Central Region","Northern Region","Upper East Region","Upper West Region","Oti Region","Bono East Region","Ahafo Region","Bono Region","North East Region","Savannah Region"]).sort()

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  speed = ["100km/hr","120km/hr","150km/hr","200km/hr","250km/hr"]

  sucMsg:any
  errMsg:any
  loading:any

  status:any

  changeAvailable=false

  changeAvailableDate(){

    this.changeAvailable = true
    
  }

  listCars = this.fb.group({
    token : ['',Validators.required],
    listingId : ['',Validators.required],
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
    carImagesUrl : [''],
    description : ['',Validators.required],
    driver : ['',Validators.required],
    carPlate : ['',Validators.required],
    newImageSrc : [''],
    oldImageSrc : [''],
    s : [''],
    status : ['']
  })

  get listCarsV(){
    return this.listCars.controls
  }

  submitted = false

  updateCarSubmit(){
    this.submitted = true
    this.imgToForm()
console.log(this.listCars.getRawValue())

    // let no = document.getElementById("no") as HTMLInputElement

    if(this.availableDate){
      this.listCars.controls['status'].setValue(`Vehicle will be avialable on ${new Date(this.availableDate).toDateString()
    }`)
    }
    
    if(this.listCars.getRawValue().newImageSrc.length <= 2 && this.listCars.getRawValue().oldImageSrc.length <= 2 ){
      // alert(this.listCars.getRawValue().newImageSrc.length)
      return
    }

    if(!this.availableDate && this.changeAvailable){
      return
    }

    // if(no.checked && !this.availableDate) { this.availableDate=''; return }

    if(this.listCars.invalid) {  this.availableDate=''; return }

    this.loading = true

    console.log(this.listCars.getRawValue())

    this.http.post(`${environment.apiKey}listings/update`,this.listCars.getRawValue()).subscribe(
      res=>{

        let result = JSON.parse(JSON.stringify(res))

        this.loading = false

        this.sucMsg = result.msg

        setTimeout(() => {
          this.sucMsg = ""
          this.route.navigate([`/manage`])
        }, 2000);

        console.log("Response",res)
      },
      err=>{
        // this.availableDate = ''
        console.log(err)
        this.loading = false
        this.errMsg = err.error.msg
        setTimeout(() => {
          this.errMsg = ""
        }, 2000);
      }
    )

  }

  imagePreview(files:any){
    if(files.length===0) 
      return;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(_event)=>{
      this.newsrc.push(reader.result)
    }

    this.imgToForm()

    let x = document.getElementById('images') as HTMLInputElement
    x.value = ''

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

        this.listCars.controls['listingId'].setValue(results.id)
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
        this.listCars.controls['description'].setValue(results.description)
        this.listCars.controls['driver'].setValue(results.driver)
        this.listCars.controls['carPlate'].setValue(results.carPlate)

        this.status = results.status

        if(results.status != "Vehicle is available"){
        this.listCars.controls['status'].setValue("Vehicle will be available on")
        }

        else{
          this.listCars.controls['status'].setValue(results.status)
        }

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
