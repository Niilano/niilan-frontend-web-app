import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-authenticateusers',
  templateUrl: './authenticateusers.component.html',
  styleUrls: ['./authenticateusers.component.scss']
})
export class AuthenticateusersComponent implements OnInit {

  submitted = false

  // Log in form
  login = this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required]
  })

  get loginV(){
    return this.login.controls
  }

  submitLoginDetails(){
    this.submitted = true

    if(this.login.errors){
      // this.submitted = false
      return
    }

    // alert('helooo')
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

        console.log(res)

      },
      err=>{

        console.log(err)

      }
    )

  }

  constructor( private fb : FormBuilder, private http : HttpClient ) {
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
