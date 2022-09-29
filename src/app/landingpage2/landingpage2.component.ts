import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage2',
  templateUrl: './landingpage2.component.html',
  styleUrls: ['./landingpage2.component.scss']
})
export class Landingpage2Component implements OnInit {

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
