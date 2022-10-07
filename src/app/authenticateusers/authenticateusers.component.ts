import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authenticateusers',
  templateUrl: './authenticateusers.component.html',
  styleUrls: ['./authenticateusers.component.scss']
})
export class AuthenticateusersComponent implements OnInit {

  SucMsg:any
  ErrMsg:any

  submitted = false

  // Log in form
  login = this.fb.group({
    email : ['',Validators.required],
    password : ['',Validators.required]
  })

  get loginV(){
    return this.login.controls
  }

  submitLoginDetails(){
    this.submitted = true

    if(this.login.invalid) return

    else{
    
    this.http.post(`${environment.apiKey}users/login`,this.login.getRawValue()).subscribe(
      res=>{
        
        let result = JSON.parse(JSON.stringify(res))

        this.SucMsg = result.msg

        setTimeout(()=>{
          this.SucMsg = ''
          localStorage.setItem('userT',result.token);
          this.route.navigate(['cars']);
        },2000)

      },
      err=>{

        console.log(err)

        this.ErrMsg = err.error.msg

        if(!err.error.msg){
          this.ErrMsg = " Authentication failed "
        }

        setTimeout(()=>{
          this.ErrMsg = ''
        },3000)

      }
    )

    }

  }

  // Register Form

  mustmatch(password:string,confirmpassword:string){

    // registration password and confirm password matching function

    return(fg:FormGroup)=>{
      const control = fg.controls[password]
      const match = fg.controls[confirmpassword]

      if(match.errors && !match.errors['mustmatch']){
        return
      }

      if(control.value !== match.value) {
        match.setErrors({mustmatch:true})
      }

      else{
        match.setErrors(null)
      }
      
    }
  }

  register = this.fb.group({
    fullName : ['',Validators.required],
    email : ['',[Validators.required,Validators.email]],
    phoneNumber : ['',Validators.required],
    password : ['',Validators.required],
    confirmPassword : ['',[Validators.required,Validators.max(6)]],
    agreedTermsOfService : ['',Validators.required]
  },
    {
      validators: [this.mustmatch('password','confirmPassword')]
      }
  )

  get registerV(){
    return this.register.controls
  }

  submitRegister(){
    this.submitted = true

    if(this.register.invalid){
      // this.submitted = false
      return
    }

    // console.log(this.register.getRawValue())

    this.http.post('http://localhost:4000/users/register',this.register.getRawValue()).subscribe(
      res=>{

        // console.log(res)

        let result = JSON.parse(JSON.stringify(res))

        this.SucMsg = result.msg

        setTimeout(()=>{
          this.SucMsg = ''
          localStorage.setItem('user',result.token);
          this.route.navigate(['cars']);
        },2000)

      },
      err=>{

        console.log(err)

        this.ErrMsg = err.error.msg

        setTimeout(()=>{
          this.ErrMsg = ''
        },3000)

      }
    )

  }

  constructor( private fb : FormBuilder, private http : HttpClient, private route : Router ) {
   }

  ngOnInit(): void {

    let login = document.getElementById('login') as HTMLElement

    let register = document.getElementById('register') as HTMLElement

    if(location.pathname=='/login'){
      login.classList.toggle('d-none')
    }

    else if(location.pathname == '/register'){
      register.classList.toggle('d-none')
    }

  }

  ngAfterViewInit(){

  }

}
