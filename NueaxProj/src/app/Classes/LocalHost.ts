import { Component, OnInit} from '@angular/core';
import {LocalHostService} from '../LocalHostService/local-host.service';
import { Injectable } from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material'
import { Router } from '@angular/router';
import {LoginSignupComponent} from '../login-signup/login-signup.component'
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  styleUrls:["../../styles.css"]
})

export class LocalHost
{
  private LoginSignupComponent:LoginSignupComponent;
   constructor(
                private LocalHostService:LocalHostService,private AngularFireAuth:AngularFireAuth,
                private InternetConnectionComponent:InternetConnectionComponent,
                private Router:Router,private MatSnackBar:MatSnackBar
              )
   {}

   LocalHostSignUp(FormValues)
   {
        this.LocalHostService.SignUp(FormValues)
                              .subscribe(res=>{
                                                this.MatSnackBar.open("Sign Up Sucessfully. Now you can login.","OK", {
                                                  verticalPosition:'bottom', 
                                                  //horizontalPosition:'left',
                                                  panelClass: ['sucess-snackbar']
                                                  });
                                              }
                                        );               
   }

    LocalHostLogIn(FormValues)
    {
      this.LocalHostService.Login(FormValues.EmailId,FormValues.Password)
          .subscribe(result=>{
                                // console.log("Inside LocalHost LogIn");
                                // console.log(result[1]);
                                if(result[2])
                                {
                                  if(this.InternetConnectionComponent.isInternetConnectcionAvailable)
                                  {
                                    
                                    this.FirebaseSignup(FormValues);
                                  }
                                  this.Go_To_First_Page();
                                }
                                else
                                {
                                 this.MatSnackBar.open("Invalid EmailId and Password",'OK',{
                                  verticalPosition:'bottom', 
                                  //horizontalPosition:'left',
                                   panelClass: ['error-snackbar']
                                  });
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

  FirebaseSignup(FormValues)
    {
        var no_error = true;
        this.AngularFireAuth.auth.createUserWithEmailAndPassword(FormValues.EmailId,FormValues.Password)
            .catch(
                     Info=>{
                              console.log(Info.message);
                              no_error=false;
                           }
                  )
            .then (
                    ()=>{
                            if(no_error==true)
                            {
                              console.log("SignUp Sucessfully")
                            }
                        }
                  );
    }
}
