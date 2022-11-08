import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements OnInit {

  category = ""

  errorMsg = ""
  successMsg = ""

  selectCategory(category:any){

    this.category = category

    if(!this.category){

      // this.errorMsg = "Please select what you want to host"

      // setTimeout(() => {
      //   this.errorMsg = ""
      // }, 3000);

      return

    }

    let categoryForm = document.getElementById(this.category) as HTMLElement
    let selectHost = document.getElementById("selectHost") as HTMLElement
    
    categoryForm.classList.remove("d-none")
    categoryForm.classList.add("d-flex")
    selectHost.classList.add("selectHost-hide")

  }

  constructor() {

   }

  ngOnInit(): void {
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
