import { Component, OnInit } from '@angular/core';
import { UsersInfoService } from '../users-info.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  title = "Dashboard"
  userName = ''

  constructor( private user:UsersInfoService ) { }

  ngOnInit(): void {

    this.user.userInfo().subscribe(
      res=>{
        
        let result = JSON.parse(JSON.stringify(res))

        this.userName = result.user

        console.log(res)

      },
      err=>{

      }
    )

  }

}
