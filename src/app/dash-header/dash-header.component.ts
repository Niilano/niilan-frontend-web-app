import { Component, Input, OnInit } from '@angular/core';
import { UsersInfoService } from '../users-info.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit {

  @Input() title = ''

  role : any

  constructor( private users : UsersInfoService ) {
    this.users.userInfo().subscribe(
      res=>{
        let result = JSON.parse(JSON.stringify(res))
        this.role = result.role
      }
    )
   }

  ngOnInit(): void {
//     var x = document.getElementById('aside-show') as HTMLElement

//     // if(screen.width > 600){
// x.classList.remove('hide')
//     // }
  }

}
