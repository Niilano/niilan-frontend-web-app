import { Component } from '@angular/core';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'niilan';

  cld = new Cloudinary({
    cloud: {
      cloudName: 'dpi89fe6z'
    }
  });

  img:any

  files: File[] = [];

  constructor(){

  }

onSelect(event: { addedFiles: any; }) {
  console.log(event);
  this.files.push(...event.addedFiles);
  this.img = this.cld.image(this.files[0].toString());
  console.log(this.img)
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

  ngAfterViewInit(){
    let preloader = document.getElementById("preloader") as HTMLElement

    let content = document.getElementById("content") as HTMLElement
    content.classList.remove('hidden')
    // setTimeout(()=>{
    //   // preloader.classList.add('hidden')
    //   content.classList.remove('hidden')
    // },2000)
  
  }

}
