import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landingpage2',
  templateUrl: './landingpage2.component.html',
  styleUrls: ['./landingpage2.component.scss']
})
export class Landingpage2Component implements OnInit {

  regions = (["Western North Region- Sefwi Wiawso","Western Region – Sekondi","Volta Region – Ho","Greater Accra Region – Accra","Eastern Region – Koforidua","Ashanti Region – Kumasi","Central Region – Cape Coast","Northern Region – Tamale","Upper East Region – Bolgatanga","Upper West Region – Wa","Oti Region – Dambai","Bono East Region – Techiman","Ahafo Region – Goaso","Bono Region – Sunyani","North East Region – Nalerigu","Savannah Region – Damango"]).sort()
  carBody = (["Convertible","Sports Car & Coupe","Crossover","Sedan","SUV","Pickup Truck","Van/Minivan","Hatchback"]).sort()
  carMake = (["Buick","INFINITI","Mitsubishi","Chevrolet","Jaguar","Nissan","Chrysler","Jeep","Ram","Dodge","Kia","Toyota","Ford","Lincoln","Volkswagen","GMC","Mazda","Volvo","Hyundai","Mercedes-Benz"]).sort()

  price = 100

  constructor() { }

  ngOnInit(): void {
    const menu = document.querySelector('.menu-bar p') as HTMLElement
    const logo = document.querySelector('.logo') as HTMLElement
    const header = document.querySelector('header') as HTMLElement
    const mnav = document.querySelectorAll('#m-nav a')
    const nav = document.querySelector('.desktop') as HTMLElement
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > header.offsetHeight + 150) {
        header.style.backgroundColor = 'white';
        header.classList.add('shadow')
        nav.style.color = 'black';
        logo.style.color = 'black';
        menu.style.color = 'black';
        mnav.forEach((a:any)=>{
          a.style.color = 'black';
          a.style.borderColor = 'black';
        })
    } else {
       header.style.backgroundColor = '';
       header.classList.remove('shadow')
        nav.style.color = '';
        logo.style.color = '';
        menu.style.color = '';
        mnav.forEach((a:any)=>{
          a.style.color = '';
          a.style.borderColor = '';
        })
    }
}
  }

}
