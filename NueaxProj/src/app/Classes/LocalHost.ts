import {LocalHostService} from '../LocalHostService/local-host.service';
import {Firebase} from "../Classes/FireBase";
import { Injectable } from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class LocalHost
{
  
   Firebase:Firebase;
   
   constructor(
                private LocalHostService:LocalHostService,
                private InternetConnectionComponent:InternetConnectionComponent,
                private Router:Router
              )
   {}

   LocalHostSignUp(FormValues)
   {
        this.LocalHostService.SignUp(FormValues)
                              .subscribe(res=>{
                                                 console.log("LocalHostSucessfully");
                                               }
                                        );               
   }

    LocalHostLogIn(FormValues)
    {
      this.LocalHostService.Login(FormValues.EmailId,FormValues.Password)
          .subscribe(result=>{
                                console.log(result);
                                if(result)
                                {
                                  if(this.InternetConnectionComponent.isInternetConnectcionAvailable)
                                  {
                                    this.Firebase.FirebaseSignup(FormValues);
                                  }
                                  this.Go_To_First_Page();
                                }
                                else
                                {
                                  console.log("Invalid EmailId and Password");
                                }
                             }
                    )
   }

  
   InsertDataInLocalHost(FormValues)
   {
      this.LocalHostService.Profile(FormValues).subscribe(Response=>{console.log(Response)});
   }

   Go_To_First_Page()
  {
    this.Router.navigateByUrl("FirstPage");
  }  
}