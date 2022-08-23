import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'niilan';

  ngAfterViewInit(){
    let preloader = document.getElementById("preloader") as HTMLElement

    let content = document.getElementById("content") as HTMLElement
  
    setTimeout(()=>{
      preloader.classList.add('hidden')
      content.classList.remove('hidden')
    },2000)
  
  }

}
