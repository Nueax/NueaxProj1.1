import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {LocalHost} from '../Classes/LocalHost';

//---------------- Routing ---------------
import {Router} from '@angular/router';
import { Injectable, NgZone} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ShareData } from './ShareData';
//---------------------------------------

@Injectable()
export class Firebase
{
    constructor(
                 private AngularFireAuth:AngularFireAuth,private AngularFireDatabase:AngularFireDatabase,
                 private Router:Router,private NgZone:NgZone,private LocalHost:LocalHost,private MatSnackBar:MatSnackBar,
                 private ShareData:ShareData
               ){}
 
    FirebaseSignup(FormValues,Type)
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
                            if(no_error==true && Type=="Primary")
                            {
                              console.log("SignUp Sucessfully")
                              this.MatSnackBar.open("SignUp Sucessfully",'OK',{
                                                                                verticalPosition:'bottom', 
                                                                                //horizontalPosition:'left',
                                                                                panelClass: ['sucess-snackbar']                                                                                        
                                                                              }
                                                    ).afterDismissed().subscribe(()=>{
                                                                                        console.log("Inside SnackBar");
                                                                                        window.location.reload();
                                                                                        //this.Router.navigateByUrl("LoginPage")
                                                                                    })
                              }
                            })
                            
    
    }
                
    FirebaseLogin(FormValues,Type)
    {
         let FirebaseConnectionAvailable = true;
        this.AngularFireAuth.auth.signInWithEmailAndPassword(FormValues.EmailId,FormValues.Password)
            .catch(info=>
                         {
                           console.log("Step:5 :-Credentials are not valid");  
                           FirebaseConnectionAvailable =false;
                         }
                  ).then(Info=>{
                                  if(Type=="Primary")
                                  {  
                                    if(FirebaseConnectionAvailable)
                                    {
                                        console.log("Step:6 :-Local Host Sign Up");  
                                        this.LocalHost.LocalHostSignUp(FormValues,"Secondary");
                                        console.log("Step:7 :- Set EmailID and Password");  
                                        this.ShareData.setEmailId(FormValues.EmailId,FormValues.Password);
                                        console.log("Step:8 :- Go To First Page");  
                                        this.Go_To_First_Page();
                                    }
                                    else
                                    {
                                        console.log("Step:6 :- Credentials Check in Local Host");
                                        this.LocalHost.LocalHostLogIn(FormValues);
                                    }
                                  }
                                }
                        )
    }
    
    Firebase_Data_Insertion(FormValues)
    {
        console.log(FormValues);
   
        var TimeStamp = Date.now().toString();
        var Uid = this.AngularFireAuth.auth.currentUser.uid;
        var ref = this.AngularFireDatabase.database.ref("Signup").child(Uid);
        ref.set(  
                { 
                    First_Name: FormValues.First_Name,
                    Last_Name: FormValues.Last_Name, 
                    Contact:FormValues.Contact,
                    Email_Id: FormValues.Email_Id, 
                    DOB:FormValues.DOB,
                    TimeStamp: TimeStamp
                }
            ).then(()=>{ 
                          this.MatSnackBar.open("Sucessfully Submit the Data to Firebase",'OK',{
                                                                                        verticalPosition:'bottom', 
                                                                                        //horizontalPosition:'left',
                                                                                        panelClass: ['sucess-snackbar']                                                                                        
                                                                                    }
                                                )
                        })
    }
    
    Go_To_First_Page()
    {
       this.Router.navigateByUrl("FirstPage");
    }
}