import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements OnInit {

  category:any = ""

  errorMsg = ""
  successMsg = ""

  regions = (["Western North Region","Western Region","Volta Region","Greater Accra Region","Eastern Region","Ashanti Region","Central Region","Northern Region","Upper East Region","Upper West Region","Oti Region","Bono East Region","Ahafo Region","Bono Region","North East Region","Savannah Region"]).sort()

  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  src:any = []

  seats:any = []

  speed = ["100km/hr","120km/hr","150km/hr","200km/hr","250km/hr"]


  selectCategory(category:any){

    this.category = category

    if(!this.category){

      // this.errorMsg = "Please select what you want to host"

      // setTimeout(() => {
      //   this.errorMsg = ""
      // }, 3000);

      return

    }

   this.router.navigate([`/list/${category}`])

  // location.assign(`/list/${category}`)

  }

  toggle(category : any){
    
    let categoryForm = document.getElementById(category) as HTMLElement
    let selectHost = document.getElementById("selectHost") as HTMLElement
    
    categoryForm.classList.remove("d-none")
    categoryForm.classList.add("d-flex")
    selectHost.classList.add("selectHost-hide")

  }

  constructor( private router : Router, private activeRoute : ActivatedRoute ) {

   }

  ngOnInit(): void {

    var i = 0;

    while(i<50){
      this.seats.push(i)
      i++
    }

    this.activeRoute.paramMap.subscribe(params => {

      if(!params.get('category')){
        return
      }

      this.category = params.get('category')

      switch(params.get('category')){

        case this.category:

          setTimeout(() => {
            this.toggle(params.get('category'))
          }, 0);
          
          break

          default:
            this.category = ""

      }

    })

  }

  ngAfterViewInit(){

    let hostChoice = document.querySelectorAll(".hostChoice")

    hostChoice.forEach( choice => choice.addEventListener( "click" , () => {

      hostChoice.forEach( choice => choice.classList.remove("active") )

      choice.classList.add('active')

    })

       )

    const formGroup = document.querySelectorAll(".form-group")
    const nextBtns = document.querySelectorAll(".btn-next")
    const prevBtns = document.querySelectorAll(".btn-prev");

//     const progressSteps = document.querySelectorAll(".progress-step");
//     const progress = document.getElementById("progress") as HTMLElement

    let formStepsNum = 0

    function updateFormSteps() {
      
    formGroup.forEach((formGroup) => {
    formGroup.classList.contains("form-group-active") && formGroup.classList.remove("form-group-active");
     });

    formGroup[formStepsNum].classList.add("form-group-active");
    }

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        // updateProgressbar();
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        // updateProgressbar();
      });
    });

//     function updateProgressbar() {
//       progressSteps.forEach((progressStep, idx) => {
//         if (idx < formStepsNum + 1) {
//           progressStep.classList.add("progress-step-active");
//         } else {
//           progressStep.classList.remove("progress-step-active");
//         }
//       });

//       const progressActive = document.querySelectorAll(".progress-step-active");

//   progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";

//   // console.log(/ )

// }

  }

}
