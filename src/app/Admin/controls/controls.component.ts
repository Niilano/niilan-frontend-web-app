import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersInfoService } from 'src/app/users-info.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  title = 'Administrator'

  loggedIn = false

  role :any

  userName = ''

  constructor( private user : UsersInfoService, private route : Router ) { }

  ngOnInit(): void {

    this.user.userInfo().subscribe(
      res=>{
        this.loggedIn = true
        let result = JSON.parse(JSON.stringify(res))
        this.userName = result.user
        result.role !== 'admin' ? this.route.navigate(['dashboard']) : ''
        this.role = result.role
      },
      err=>{
        // this.err
        this.route.navigate(['login'])
        alert(err.error.msg)

      }
    )

  }

}
