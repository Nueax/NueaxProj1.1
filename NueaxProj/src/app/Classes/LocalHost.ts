import { Component, OnInit} from '@angular/core';
import {LocalHostService} from '../LocalHostService/local-host.service';
import { Injectable } from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material'
import { Router } from '@angular/router';
import {LoginSignupComponent} from '../login-signup/login-signup.component'
import { AngularFireAuth } from '@angular/fire/auth';
import { ShareData } from './ShareData';



@Component({
  styleUrls:["../../styles.css"]
})

export class LocalHost
{
  private LoginSignupComponent:LoginSignupComponent;
   constructor(
                private LocalHostService:LocalHostService,private AngularFireAuth:AngularFireAuth,
                private InternetConnectionComponent:InternetConnectionComponent,
                private Router:Router,private MatSnackBar:MatSnackBar,private ShareData:ShareData
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
                                console.log("Inside LocalHost LogIn");
                                console.log(result[1]);
                                if(result[1])
                                {
                                  console.log(this.InternetConnectionComponent.isInternetConnectcionAvailable);
                                  if(this.InternetConnectionComponent.isInternetConnectcionAvailable)
                                  {
                                    
                                    this.FirebaseSignup(FormValues);
                                  }
                                  this.ShareData.setEmailId(FormValues.EmailId);
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
      this.LocalHostService.Profile(FormValues)
          .subscribe(Response=>{
                                  this.MatSnackBar.open("Sucessfully Submit the Data",'OK',{
                                    verticalPosition:'bottom', 
                                    //horizontalPosition:'left',
                                    panelClass: ['sucess-snackbar']
                                                                                            }
                                                        );
                              }
                     );
   }

   Go_To_First_Page()
  {
    console.log("Go to first page");
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
