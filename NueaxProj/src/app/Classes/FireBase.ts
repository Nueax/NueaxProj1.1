import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {LocalHost} from '../Classes/LocalHost';

//---------------- Routing ---------------
import {Router} from '@angular/router';
import { Injectable, NgZone} from '@angular/core';
//---------------------------------------

@Injectable()
export class Firebase
{
    constructor(
                 private AngularFireAuth:AngularFireAuth,private AngularFireDatabase:AngularFireDatabase,
                 private Router:Router,private NgZone:NgZone,private LocalHost:LocalHost
                )
    {
        
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

    FirebaseLogin(FormValues)
    {
        console.log("Enter login page");
        console.log(FormValues);
    
        let FirebaseConnectionAvailable = true;
        this.AngularFireAuth.auth.signInWithEmailAndPassword(FormValues.EmailId,FormValues.Password)
            .catch(info=>
                         {
                           FirebaseConnectionAvailable =false;
                           console.log(info);
                         }
                  ).then(Info=>{
                                  if(FirebaseConnectionAvailable)
                                  {
                                     console.log("Inside");
                                     this.Go_To_First_Page();
                                  }
                                  else
                                  {
                                    this.LocalHost.LocalHostLogIn(FormValues);
                                  }
                               }
                        )
    }
    
    Firebase_Data_Insertion(FormValues)
    {
        console.log(FormValues);
   
        var TimeStamp = Date();
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
            )
    }
    
    Go_To_First_Page()
    {
       this.Router.navigateByUrl("FirstPage");
    }

}