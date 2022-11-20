import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AdminService } from '../admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

  title = " Broadcast Message "

  submitted = false

  success : any
  error : any

  broadcastMessage(data:any){
    return this.http.post(`${environment.apiKey}admin/message/broadcast`,data)
  }

  smsForm = this.fb.group({
    message : ["",Validators.required],
    channel : ["sms",Validators.required]
  }
  )

  get smsV(){
    return this.smsForm.controls
  }

  sendSMS(){

    this.submitted = true

    if(this.smsForm.invalid) { 
      // this.submitted = false; 
      return;
    }

    this.broadcastMessage(this.smsForm.getRawValue()).subscribe(
      res=>{
        this.success = res

        setTimeout(() => {
          this.success = ""
        }, 3000);
      }
    )

    console.log(this.smsForm.getRawValue())

  }

  emailForm = this.fb.group({
    subject : ["",Validators.required],
    message : ["",Validators.required],
    channel : ["email",Validators.required]
  }
  )

  get emailV(){
    return this.emailForm.controls
  }

  sendEmail(){

    this.submitted = true

    if(this.emailForm.invalid){

      // this.submitted = false; 
      return;

    }

    this.broadcastMessage(this.emailForm.getRawValue()).subscribe(
      res=>{
        this.success = res

        setTimeout(() => {
          this.success = ""
        }, 3000);
      }
    )

    console.log(this.emailForm.getRawValue())
  }

  constructor( private http : HttpClient, private fb : FormBuilder, private routeParam : ActivatedRoute, private router : Router ) { }

  ngOnInit(): void {

    this.routeParam.paramMap.subscribe(params => {

      let forms = document.querySelectorAll('form')

      forms.forEach( form => !form.classList.contains('d-none') && form.classList.add('d-none') )

      setTimeout(() => {

        if(params.get('channel')){

          let channel:any = params.get('channel')
          
          let selectChannelForm = document.getElementById(channel) as HTMLElement
  
          selectChannelForm.classList.remove('d-none')
  
          // !selectChannelForm && this.router.navigate(['/dashboard/admin/broadcast'])
  
          // selectChannelForm ? selectChannelForm.classList.remove('d-none') : this.router.navigate(['/dashboard/admin/broadcast'])
  
        }
        
      }, 0);

    })

  }

}
