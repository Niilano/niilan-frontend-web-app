import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  opp:any

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

  rent(){
    // alert("Please Log in!!!")
    // this.errorMessage = "Kindly login to submit this request"
    this.successMessage='mn'

    setTimeout(() => {
      this.errorMessage = ""
    }, 2000);

  }


  constructor(  private route: ActivatedRoute, private http : HttpClient, private cars : CarsService ) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let index = Number(params.get('carsId'))
      this.car = cars[index];

      this.cars.getOneCar(index).subscribe(
      res=>{
        // console.log(res)
        this.car1 = JSON.parse(JSON.stringify(res))
        // console.log(this.car1.carImagesUrl)
        this.car1.carImagesUrl = JSON.parse(this.car1.carImagesUrl)
        if(JSON.parse(JSON.stringify(res)).driver == 'Self driving' ){
          this.driving = false
        }
        else{
          this.driving = true
        }
        // console.log(this.car1.carImagesUrl)
        
      },
      err=>{

      }
    )

      // console.log( typeof(params.get('carsId')))
    })

    // console.log(this.car[0])
  }

}
