import { Component, OnInit, NgZone} from '@angular/core';
import {Firebase} from '../Classes/FireBase';
import {LocalHost} from '../Classes/LocalHost';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {LocalHostService} from '../LocalHostService/local-host.service';
import {MatTableDataSource, MatTabChangeEvent} from '@angular/material';

import {InternetConnectionComponent} from '../internet-connection/internet-connection.component'

// ------- Angular Forms --------
import {FormBuilder,FormGroup} from '@angular/forms';
// ------------------------------

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})


export class FirstPageComponent implements OnInit 
{
  displayedColumns: string[] = ['First_Name', 'Last_Name', 'Email_Id', 'Contact','DOB'];
  FirebaseTableData = new MatTableDataSource();
  LocalHostTableData = new MatTableDataSource();
  EmailField = true;
  EmailId=this.AngularFireAuth.auth.currentUser.email;
  Uid = this.AngularFireAuth.auth.currentUser.uid;
  PersonalDetailsForm:FormGroup;

  constructor(private Firebase:Firebase,private AngularFireDatabase:AngularFireDatabase,
             private Formbuilder:FormBuilder,private LocalHostService:LocalHostService,
             private InternetConnection:InternetConnectionComponent,private LocalHost:LocalHost,
             private AngularFireAuth:AngularFireAuth,private NgZone:NgZone
            ) 
  { }

  ngOnInit() 
  {
    this.PersonalDetailsForm = this.Formbuilder.group({
                                                        First_Name:[],
                                                        Last_Name:[],
                                                        Email_Id:[this.EmailId],
                                                        Contact:[],
                                                        DOB:[]
                                                     });   
    
    if(this.InternetConnection.isInternetConnectcionAvailable)
    {
      this.Get_Firebase_TimeStamp();
    }
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
    this.LocalHostService.Get_All_Data_From_LocalHost()
                         .subscribe(Data=>
                                            {
                                              console.log(Data);
                                              this.LocalHostTableData.data = Data;
                                            })
  }

  SubmitForm(FormValues)
  {
    this.EmailField=false;
    console.log(FormValues);

    if(this.InternetConnection.isInternetConnectcionAvailable)
    {
      this.Firebase.Firebase_Data_Insertion(FormValues);
    }
    
    this.LocalHost.InsertDataInLocalHost(FormValues);
    
  }

  Get_Firebase_TimeStamp()
    {
      var Firebase = this.AngularFireDatabase.database.ref('Signup').child(this.Uid).child("TimeStamp");
      Firebase.once('value').then(snapshot=>{
                                              var Firebase_TimeStamp = snapshot.val();
                                              var Email_Id = this.AngularFireAuth.auth.currentUser.email;
                                              this.Get_LocalHost_TimeStamp(Email_Id,Firebase_TimeStamp);    
                                            }
                                         
                              );
    }

    Get_LocalHost_TimeStamp(Email_Id,Firebase_TimeStamp)
    {
        this.LocalHostService.Get_LocalHost_Time_Stamp(Email_Id)
        .subscribe(LocalHost_Time_Stamp=>{
                            console.log(Firebase_TimeStamp);
                            console.log(LocalHost_Time_Stamp[1]);
                            this.Compare_LH_FB_TimeStamp(Firebase_TimeStamp,LocalHost_Time_Stamp[1],Email_Id);
                        })
    }

    Compare_LH_FB_TimeStamp(Firebase_TimeStamp,LocalHost_Time_Stamp,Email_Id) 
    {
        if(Firebase_TimeStamp!=null || LocalHost_Time_Stamp)
        {
            console.log("Null check");
            
            if(Firebase_TimeStamp==null)
            {
                this.Get_LocalhostData(Email_Id,LocalHost_Time_Stamp);
            }
            else
            {
                Firebase_TimeStamp = new Date(Firebase_TimeStamp).getTime()/1000;    
                if(Firebase_TimeStamp!=LocalHost_Time_Stamp)
                {
                    this.Get_LocalhostData(Email_Id,LocalHost_Time_Stamp);
                }
            }
        }
    }

    Get_LocalhostData(Email_Id,LocalHost_Time_Stamp)
    {
        this.LocalHostService.Get_Data_From_LocalHost(Email_Id)
            .subscribe(LocalHost_Data=>{
                                            this.Send_To_Firebase(LocalHost_Data,LocalHost_Time_Stamp);            
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

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => 
    {
      if(tabChangeEvent.index==1 && this.InternetConnection.isInternetConnectcionAvailable)
      {
        this.ShowFireBaseData();
      }
      else if(tabChangeEvent.index==2)
      {
        this.ShowLocalHostData();
      }
      // console.log('tabChangeEvent => ', tabChangeEvent);
      // console.log('index => ', tabChangeEvent.index);
    }

}
