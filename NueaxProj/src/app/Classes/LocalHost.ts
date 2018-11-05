import { Component, OnInit} from '@angular/core';
import {LocalHostService} from '../LocalHostService/local-host.service';
import { Injectable } from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component';
import {MatSnackBar} from '@angular/material'
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

   LocalHostSignUp(FormValues,Type)
   {
        this.LocalHostService.SignUp(FormValues)
                              .subscribe(res=>{
                                                if(Type=="Primary")
                                                {
                                                  this.MatSnackBar.open("Sign Up Sucessfully. Now you can login.","OK", {
                                                    verticalPosition:'bottom', 
                                                    //horizontalPosition:'left',
                                                    panelClass: ['sucess-snackbar']
                                                    }).afterDismissed().subscribe(()=>{
                                                      console.log("Inside SnackBar");
                                                      window.location.reload();})
                                                }
                                              }
                                        );               
   }

  LocalHostLogIn(FormValues)
  {
    this.LocalHostService.Login(FormValues.EmailId,FormValues.Password)
        .subscribe(result=>{
                              console.log("Step:5 :-Credentials Checking");
                              if(result[1])
                              {
                                console.log("Step:6 :-Credentials are valid");
                                console.log("Step:7 :-Checking For Internet Connection");
                                if(this.InternetConnectionComponent.isInternetConnectcionAvailable)
                                {
                                  console.log("Step:8 :- Firebase Sign Up");
                                  this.FirebaseSignup(FormValues);
                                }
                                console.log("Step:8 :- Set Email Id And Password For Sharing");
                                this.ShareData.setEmailId(FormValues.EmailId,FormValues.Password);
                                
                                console.log("Step:9 Go To First Page");
                                this.Go_To_First_Page();
                              }
                              else
                              {
                                this.MatSnackBar.open("Local Host Invalid EmailId and Password LocalHost",'OK',{
                                verticalPosition:'bottom', 
                                //horizontalPosition:'left',
                                 panelClass: ['error-snackbar']
                                });
                              }  
                            },
                    error=>{
                              this.MatSnackBar.open("Local Host Invalid EmailId and Password LocalHost",'OK',{
                                verticalPosition:'bottom', 
                                //horizontalPosition:'left',
                                panelClass: ['error-snackbar']
                                });
                           }
                  )              
   }
  
   InsertDataInLocalHost(FormValues,TimeStamp,Type)
   {
      this.LocalHostService.Profile(FormValues,TimeStamp)
          .subscribe(Response=>{
                                  if(Type=="Primary")
                                  {
                                    this.MatSnackBar.open("Sucessfully Submit the Data",'OK',{
                                      verticalPosition:'bottom', 
                                      //horizontalPosition:'left',
                                      panelClass: ['sucess-snackbar']
                                                                                             }
                                                          );
                                  }
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
