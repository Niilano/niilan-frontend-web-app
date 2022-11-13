import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  title = 'Admin | USers'

  allUsers:any = []

  sucMsg:any

  redirect(id:any){
    this.router.navigate([`/dashboard/admin/users/${id}`])
  }

  confirmDelete = false
  delListingId:any

  showConfirmation(listingId:any){
    this.delListingId = listingId
    this.confirmDelete = true
  }

  confirmation(confirm:any){

    confirm && ( this.confirmDelete = false, this.removeUser(this.delListingId) )

    !confirm && ( this.confirmDelete = false )

  }

  removeUser(userId:any){

    this.admin.removeUser(userId).subscribe(
      res=>{
        console.log(res)
        this.delListingId = ''
        this.sucMsg = res
        setTimeout(() => {
          this.sucMsg = ''
          this.router.navigate(['/dashboard/admin/users'])
        }, 3000);
      }
    )

  }

  user : any

  constructor( private admin : AdminService, private routeParam : ActivatedRoute, private router : Router ) { }

  ngOnInit(): void {

    this.admin.getAllUsers().subscribe(
      res=>{
        let result = JSON.parse(JSON.stringify(res))
        this.allUsers = result.allUsers
        console.log(this.allUsers.length)
      }
    )


    this.routeParam.paramMap.subscribe(params => {

      let userRendered = document.getElementById('user') as HTMLElement

      !params.get('id') && userRendered.classList.add('d-none')

      params.get('id') && this.admin.getOneUser(params.get('id')).subscribe(
        res=>{

          let usersRendered = document.getElementById('users') as HTMLElement
          usersRendered.classList.add('d-none')

          let result = JSON.parse(JSON.stringify(res))

          this.user = result.user

          this.user.createdAt = `${new Date(this.user.createdAt).toDateString()} @ ${new Date('2022-10-24T13:16:00.784Z').toLocaleTimeString()}`

          console.log(this.user)

        }
      )
      // console.log(userId)
    })
    
  }

}
