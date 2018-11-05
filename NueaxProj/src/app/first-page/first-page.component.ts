import { Component, OnInit,OnChanges,ViewEncapsulation, NgZone, OnDestroy} from '@angular/core';
import {Firebase} from '../Classes/FireBase';
import {LocalHost} from '../Classes/LocalHost';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {LocalHostService} from '../LocalHostService/local-host.service';
import {MatTableDataSource, MatTabChangeEvent} from '@angular/material';
import {ISubscription} from 'rxjs-compat/Subscription';

// ------- Angular Forms --------
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareData } from '../Classes/ShareData';
import { InternetConnectionComponent } from '../internet-connection/internet-connection.component';
import { PlatformLocation, Location } from '@angular/common';
// ------------------------------

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class FirstPageComponent implements OnInit,OnDestroy
{
  displayedColumns: string[] = ['First_Name', 'Last_Name', 'Email_Id', 'Contact','DOB'];
  FirebaseTableData = new MatTableDataSource();
  LocalHostTableData = new MatTableDataSource();
  EmailField = true;
  EmailId:any;
  Password:any;
  Uid : any;
  PersonalDetailsForm:FormGroup;
  InternetConnection:any;
  Subs : ISubscription;
  Subs1 : ISubscription;
  SUbs2 :ISubscription;
  Subs2 : ISubscription;

  constructor(private Firebase:Firebase,private AngularFireDatabase:AngularFireDatabase,
             private Formbuilder:FormBuilder,private LocalHostService:LocalHostService,
             private LocalHost:LocalHost,private AngularFireAuth:AngularFireAuth,private NgZone:NgZone,
             private route: ActivatedRoute,private ShareData:ShareData,private BrowserBack:PlatformLocation,
             private Router:Router,private Location:Location
            ) 
  { 
    this.BrowserBack.onPopState(()=>{
                                      console.log("back button click");
                                      this.Location.go("/LoginPage");
                                      window.location.reload();
                                    });
  }

  ngOnInit()
  {
  
    //Subscribing Observable for the checking the internet connection available or not
    this.Subs = this.ShareData.currentInternetConnection
                    .subscribe(InternetConnection=>{
                                                      this.InternetConnection = InternetConnection;
                                                      console.log("Internet connection")
                                                      console.log(InternetConnection);
                                                      this.InternetConnection=InternetConnection;
                                                      if(InternetConnection)
                                                      {
                                                        this.ShareData.currentEmailId
                                                            .subscribe(EmailId=>{
                                                                                  this.EmailId = EmailId;
                                                                                  this.ShareData.currentPassword
                                                                                      .subscribe(
                                                                                                  Password=>{
                                                                                                              this.Password = Password;
                                                                                                              console.log("EmailID");
                                                                                                              console.log(this.EmailId);
                                                                                                              console.log("Password");
                                                                                                              console.log(this.Password);
                                                                                                              
                                                                                                              console.log("Firebase Signup");
                                                                                                              this.AngularFireAuth.auth
                                                                                                                  .createUserWithEmailAndPassword(this.EmailId,this.Password)
                                                                                                                  .catch(()=>{
                                                                                                                                console.log("Email already exist");
                                                                                                                                this.Get_Firebase_TimeStamp();
                                                                                                                              })
                                                                                                                  .then(()=>{
                                                                                                                              console.log("Next");
                                                                                                                              this.AngularFireAuth.auth
                                                                                                                                  .signInWithEmailAndPassword(this.EmailId,this.Password)
                                                                                                                                  .then(()=>{
                                                                                                                                                this.Uid = this.AngularFireAuth.auth.currentUser.uid;
                                                                                                                                                this.Get_Firebase_TimeStamp();
                                                                                                                                            });
                                                                                                                             }
                                                                                                                        )
                                                                                                                                        
                                                                                                            }
                                                                                                 )
                                                                                  })
                                        }
                                        else
                                        {
                                          this.Subs1 = this.ShareData.currentEmailId
                                                          .subscribe(EmailId=>{
                                                                                this.EmailId = EmailId;
                                                                                this.Subs2 = this.ShareData.currentPassword
                                                                                      .subscribe(
                                                                                                  Password=>{
                                                                                                              this.Password = Password;
                                                                                                              console.log("Sharing the data"+EmailId);
                                                                                                              this.Get_Firebase_TimeStamp();
                                                                                                            }
                                                                                                );
                                                                              });
                                        }   

                                      });
   
    //Subscribing Observable for the checking the LocalHost available or not
    this.SUbs2 = this.ShareData.currentLocalHostConnection
                          .subscribe(Connection=>{
                                                    console.log("STEP (a): Local Host Connectio Checked");
                                                    this.LocalHost.FirebaseSignup({"EmailId":this.EmailId,"Password":this.Password});
                                                    this.Get_Firebase_TimeStamp();
                                                  });

    //-------- Login Form Fields -------
    this.LocalHost                                 
    this.PersonalDetailsForm = this.Formbuilder.group({
                                                        First_Name:[null,Validators.compose([Validators.required])],
                                                        Last_Name:[null,Validators.compose([Validators.required])],
                                                        Email_Id:[this.NgZone.run(()=>this.EmailId)],
                                                        Contact:[null,Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(10)])],
                                                        DOB:[null,Validators.compose([Validators.required])]
                                                     });   
    //-----------------------------------
  }

  ShowFireBaseData()
  {
    var FirebaseDataArray=[];
    console.log("Firebase");
    var keys = [];
    var Firebase = this.AngularFireDatabase.database.ref('Signup');
    Firebase.once('value').then(snapshot=>{
                                            var data = snapshot.val();
                                            
                                            for(var k in data) 
                                            {keys.push(k)};
                                 
                                            for(var i of keys)
                                            {
                                              FirebaseDataArray.push(data[i]);
                                            }
                                            
                                            this.FirebaseTableData.data = FirebaseDataArray;
                                          } 
                                );                     
  }

  ShowLocalHostData()
  {
    this.LocalHostService.CheckLocalHostConnection()
        .subscribe(Value=>{
                              if(Value)
                              {
                                this.ShareData.setLocalHost(Value);
                                console.log("Value of LocalHost Service");
                                console.log(Value);
                              }
                          },
                   error=>{ 
                             console.log(error);this.ShareData.setLocalHost(error);
                          })
                        
    
    
    this.LocalHostService.Get_All_Data_From_LocalHost()
                         .subscribe(Data=>
                                            {
                                              console.log(Data);
                                              this.NgZone.run(()=>this.LocalHostTableData.data = Data);
                                            })
  }

  SubmitForm(FormValues)
  {
    this.EmailField=false;
    console.log(FormValues);
    console.log("Internet connection on submitting the value");
    console.log(this.InternetConnection);

    if(this.InternetConnection)
    {
      this.Firebase.Firebase_Data_Insertion(FormValues);
    }
    
    if(!this.InternetConnection)
    {
      var Timestamp = Date.now().toString();
      console.log("TIMESTAMP");
      console.log(Timestamp);
      this.LocalHost.InsertDataInLocalHost(FormValues,Timestamp,"Primary");    
    }                                 
  }

  Get_Firebase_TimeStamp()
    {
      console.log("STEP (b): Getting Firebase TimeStamp");
      console.log(this.Uid);
      this.NgZone.run(()=>{this.Uid = this.AngularFireAuth.auth.currentUser.uid});
      var Firebase = this.AngularFireDatabase.database.ref('Signup').child(this.Uid).child("TimeStamp");
      Firebase.once('value').then(snapshot=>{
                                              console.log("STEP (c): Firebase TimeStamp is");
                                              console.log(snapshot.val());
                                              var Firebase_TimeStamp = snapshot.val();
                                              var Email_Id = this.AngularFireAuth.auth.currentUser.email;
                                              console.log("STEP (d): Calling Localhost TimeStamp");
                                              this.Get_LocalHost_TimeStamp(Email_Id,Firebase_TimeStamp);    
                                            }
                              );
    }

    Get_LocalHost_TimeStamp(Email_Id,Firebase_TimeStamp)
    {
      console.log("STEP (e): Getting Localhost TimeStamp");
        this.LocalHostService.Get_LocalHost_Time_Stamp(Email_Id)
        .subscribe(LocalHost_Time_Stamp=>{
                                            console.log("STEP (f): LocalHost TimeStamp");
                                            console.log(LocalHost_Time_Stamp[1]);
                                            console.log("STEP (g): Calling the comparing function");
                                            this.Compare_LH_FB_TimeStamp(Firebase_TimeStamp,LocalHost_Time_Stamp[1],Email_Id);
                                          })
    }

    Compare_LH_FB_TimeStamp(Firebase_TimeStamp,LocalHost_Time_Stamp,Email_Id) 
    {
        console.log("STEP (h): Comparing function called");
        if(Firebase_TimeStamp!=null || LocalHost_Time_Stamp)
        {
            if(Firebase_TimeStamp==null)
            {
              console.log("STEP (i): Data is not in firebase");
              console.log("STEP (j): Calling function to get local host data");
              this.Get_LocalhostData(Email_Id,LocalHost_Time_Stamp);
            }
            else if(!LocalHost_Time_Stamp)
            {
              console.log("STEP (i): Data is not in localhost");
              console.log("STEP (j): Calling function to get firebase data");
                this.Get_FirebaseData(Firebase_TimeStamp);
            }
            else
            {
              console.log("STEP (i): Comparing Localhost And Firebase Data");
                if(LocalHost_Time_Stamp>Firebase_TimeStamp)
                {
                  console.log("STEP (j): Firebase Time Stamp is lesser than Localhost Timestamp");
                  console.log("STEP (k): Getting Localhost  data");
                  this.Get_LocalhostData(Email_Id,LocalHost_Time_Stamp);
               
                }
                if(Firebase_TimeStamp>LocalHost_Time_Stamp)
                {
                  console.log("STEP (j): Localhost Timestamp is lesser than Firebase Time Stamp");
                  console.log("STEP (k): Getting firebase data");
                  this.Get_FirebaseData(Firebase_TimeStamp);
                }
            }
        }
    }

    Get_LocalhostData(Email_Id,LocalHost_Time_Stamp)
    {
        this.LocalHostService.Get_Data_From_LocalHost(Email_Id)
            .subscribe(LocalHost_Data=>{
                                            console.log("STEP (k): Send To firebase");
                                            this.Send_To_Firebase(LocalHost_Data,LocalHost_Time_Stamp);            
                                       }
                      );
    }

    Get_FirebaseData(FireBaseTimeStamp)
    {
      var Firebase = this.AngularFireDatabase.database.ref('Signup').child(this.Uid);
      Firebase.once('value').then(snapshot=>{
                                              var Firebase_Data = snapshot.val();   
                                              console.log("STEP (k): Send To LocalHost");    
                                              this.Send_Data_To_LocalHost(Firebase_Data,FireBaseTimeStamp);  
                                            }
                              );
    }

    Send_To_Firebase(LocalHost_Data,LocalHost_Time_Stamp)
    {
        console.log(LocalHost_Data);
        console.log(LocalHost_Data[1]["FirstName"]);
        var Firebase = this.AngularFireDatabase.database.ref("Signup").child(this.Uid);
        Firebase.set(  
                      { 
                          First_Name: LocalHost_Data[1]['FirstName'],
                          Last_Name: LocalHost_Data[1]['LastName'], 
                          Contact:LocalHost_Data[1]['Contact'],
                          Email_Id: LocalHost_Data[1]['EmailId'], 
                          DOB:LocalHost_Data[1]['DOB'],
                          TimeStamp: LocalHost_Time_Stamp
                      }
                    )       
    }

    Send_Data_To_LocalHost(FirebaseData,FireBaseTimeStamp)
    {
      console.log(FirebaseData);
      console.log("Email"+this.EmailId);
      console.log("Pass"+this.Password);
      this.LocalHost.LocalHostSignUp({"FirstName":" ","LastName":" ","EmailId":this.EmailId,"Password":this.Password},"Secondary");
      this.LocalHost.InsertDataInLocalHost(FirebaseData,FireBaseTimeStamp,"Secondary");
    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => 
    {
      this.ShareData.currentInternetConnection
        .subscribe(InternetConnection=>{
                                        if(tabChangeEvent.index==1 && InternetConnection)
                                        {
                                          this.ShowFireBaseData();
                                        }
                                        else if(tabChangeEvent.index==2)
                                        {
                                          this.ShowLocalHostData();
                                        }
                                      })
      // console.log('tabChangeEvent => ', tabChangeEvent);
      // console.log('index => ', tabChangeEvent.index);
    }

    ngOnDestroy(): void 
    {
      this.Subs.unsubscribe();
      this.Subs1.unsubscribe();
      this.Subs2.unsubscribe();
      this.SUbs2.unsubscribe();
      this.AngularFireAuth.auth.signOut();
    }
}
