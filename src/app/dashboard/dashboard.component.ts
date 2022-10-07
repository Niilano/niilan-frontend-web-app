import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersInfoService } from '../users-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  loggedIn = false

  constructor(changeDetectorRef: ChangeDetectorRef, private user:UsersInfoService, private route:Router) {

    this.user.userInfo().subscribe(
      res=>{
        this.loggedIn = true
        console.log(res)
      },
      err=>{
        // this.err
        // this.route.navigate(['cars'])
        console.log(err)

      }
    )
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

}
