import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMateriaDesignModule } from './AngularMaterial/AngularMaterialDesignModule';

import { InternetConnectionComponent } from './internet-connection/internet-connection.component';

//-------------- Routing -------------------
import{Routing} from './Routing/Routing';
//------------------------------------------

//----------------------Firebase Library----------------------
import{AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireDatabaseModule} from '@angular/fire/database';
//-----------------------------------------------------------


//----------- For Reactive Forms -----------------
import {ReactiveFormsModule} from "@angular/forms";
import { HttpModule, Http } from '@angular/http';
//-------------------------------------------

import {ShareData} from './Classes/ShareData';

import { FirstPageComponent } from './first-page/first-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

import{Firebase} from "./Classes/FireBase";
import { LocalHost } from './Classes/LocalHost';


var config = {
  apiKey: "AIzaSyDYKWW2AvLTogIVjdezvTRjZGBWh1wFiDM",
  authDomain: "nueax-82290.firebaseapp.com",
  databaseURL: "https://nueax-82290.firebaseio.com",
  projectId: "nueax-82290",
  storageBucket: "nueax-82290.appspot.com",
  messagingSenderId: "769400406104"
};

@NgModule({
  declarations: [
                  AppComponent,LoginSignupComponent,InternetConnectionComponent,FirstPageComponent
                ],
  imports: [
              BrowserModule,BrowserAnimationsModule,AngularMateriaDesignModule,ReactiveFormsModule,
              HttpModule,AngularFireModule.initializeApp(config),AngularFireAuthModule,
              AngularFireDatabaseModule,Routing
           ],
  providers: [InternetConnectionComponent,LocalHost,Firebase,ShareData],
  bootstrap: [AppComponent]
})
export class AppModule { }
