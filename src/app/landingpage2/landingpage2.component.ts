import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import { CarsService } from '../cars.service';
import { SeoService } from '../seo.service';
// import { SeoService } from '../seo.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landingpage2',
  templateUrl: './landingpage2.component.html',
  styleUrls: ['./landingpage2.component.scss']
})
export class Landingpage2Component implements OnInit {

  @ViewChild('carousel', { static: true })  carousel!: NgbCarousel;

  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  
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

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  p: number = 1;

  region:any
  fill:any

  regions = (["Western North Region","Western Region","Volta Region","Greater Accra Region","Eastern Region","Ashanti Region","Central Region","Northern Region","Upper East Region","Upper West Region","Oti Region","Bono East Region","Ahafo Region","Bono Region","North East Region","Savannah Region"]).sort()
  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  price = 100

  cars1:any

  testimonials = [
    {
      name : 'Abdul',
      from : 'Accra, Ghana',
      feedback : 'I booked a car when returning home from the states during July, I was suprised the kind of service Niilano.com provided me, I provided my pickup date and made a full payment, a day before my arrival i received a call asking me of my plans for pickup the next day. On my arrival at the airport my vehicle was right there waiting for me. Thank you niilano.'
    },
    {
      name : 'Kwadwo Owusu',
      from : 'Tema, Ghana',
      feedback : ' We needed a van for our tour to kakum national park and Elmina castle. we spent two days and niilano.com provided us with our choice of booking with a driver. very grateful niilano 🙏 . '
    },
    {
      name : 'Asiamah Junior',
      from : 'Mankessim, Ghana',
      feedback : "I am already into the rental business and i had done many research on how to expand my business, god being sooo good i had find niilano.com and explored a little bit, i listed two of my cars over there since it was free and within this month i've had a foreign visitor book my car for one week generating Gh5000 revenue for me this month "
    },
    {
      name : 'Micheal Morone',
      from : 'Bangalore, India',
      feedback : "Am micheal, a researcher currently based in india, i will be in Ghana for the first time on a project with my team next month, we simply need a van with a driver to make a few travels in Ghana, i have already booked a van with niilano.com after a few research on the internet and i am impressed how simple and effective the process was, i will back here to provide relevant feedback after we've being served by niilano.com.  "
    },
    {
      name : 'Abena',
      from : 'Accra, Ghana',
      feedback : 'My husband and I wanted a well maintained vehicle with a driver for our wedding. we actually got what we wanted from niilano.com by simply booking for our choice of vehicle.'
    },
    {
      name : 'William Tetteh',
      from : 'Accra, Ghana',
      feedback : 'Am a host here on niilano.com, i have being a member over two months and i get an income of nearly Gh3000 from renting my vehicle on niilano with a liitle commision.'
    }
  ]

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

  constructor( private cars : CarsService, private route : Router, private seo : SeoService, @Inject(PLATFORM_ID) private platformid : object ) {

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

    this.seo.updateSeoTag()
    
  }

  ngAfterViewInit(){

    if(isPlatformBrowser(this.platformid)){

    let scroll = document.getElementById('scroll') as HTMLElement

  setInterval(()=>{

    scroll.scrollBy(1,0);

  },100)

}

  }

}
