import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import {cars} from '../cars';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  user = localStorage.getItem('username')

  email = ''

  opp:any

  request = this.fb.group({
    hostId : [''],
    propertyId : [''],
    email : ['',Validators.email],
    contact : [''],
    firstName : ['',Validators.required],
    lastName : ['',Validators.required],
    pickUpDate : ['',Validators.required],
    pickUpTime : ['',Validators.required],
    days : ['',Validators.required],
    locationUSe : ['',Validators.required],
    pLocation : ['',Validators.required],
    dLincense : [''],
    dLincenseImage : ['']
})

get requestsControls(){
  return this.request.controls
}

loading = false
submitted = false

con = true

rent(){
  this.submitted = true

  if(this.request.getRawValue().email=="" && this.request.getRawValue().contact=="") return
  if(this.request.invalid) return

  this.loading = true

  this.cars.requestCar(this.request.getRawValue()).subscribe(
    res=>{
      this.loading = false
      // console.log(res)
      let result = JSON.parse(JSON.stringify(res))
      this.successMessage = result.msg

      setTimeout(() => {
      this.changeRoute.navigate(['/cars'])
      },4100)

    },
    err=>{
      // console.log(err)
      this.errorMessage = err.error.msg
    }
  )

  console.log(this.request.getRawValue())

  setTimeout(() => {
    this.successMessage = ""
    this.errorMessage = ""
  }, 4000);

}

  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  images = ['https://picsum.photos/id/62/900/500','https://picsum.photos/id/83/900/500']

  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  car:any
  car1:any

  @ViewChild('carousel', { static: true })  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  expDes(d:any){
    let s = document.getElementById('ee') as HTMLElement
    s.classList.toggle('des-less')
    s.classList.toggle('des-more')
    d.innerText = d.innerText == "Less" && "Read More" || d.innerText != "Less" && "Less"
  }

  successMessage:any
  errorMessage:any

  driving:any

  files: File[] = [];

onSelect(event: { addedFiles: any; }) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}


  constructor(  private route: ActivatedRoute, private changeRoute : Router, private http : HttpClient, private cars : CarsService, private fb : FormBuilder ) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let index = Number(params.get('carsId'))
      this.car = cars[index];

      this.cars.getOneCar(index).subscribe(
      res=>{

        if(!res){
          this.changeRoute.navigate(['/404'])
        }

        console.log(res)
        this.car1 = JSON.parse(JSON.stringify(res))
        
        this.car1.carImagesUrl = JSON.parse(this.car1.carImagesUrl)
        if(JSON.parse(JSON.stringify(res)).driver == 'Self driving' ){
          this.driving = false
        }
        else{
          this.driving = true
        }

        this.request.controls['hostId'].setValue(this.car1.userId);
        this.request.controls['propertyId'].setValue(this.car1.id);
        // console.log(this.car1.carImagesUrl)
        
      },
      err=>{
        this.changeRoute.navigate(['/404'])
      }
    )

      // console.log( typeof(params.get('carsId')))
    })

    // console.log(this.car[0])
  }

}
