import { Component, OnInit} from '@angular/core';
import {LocalHostService} from '../LocalHostService/local-host.service';
import {LoginSignupComponent} from '../login-signup/login-signup.component'

export class Session
{
  
    EmailId:any;
   constructor()
   {}


   SetEmailId(EmailId)
   {
        this.EmailId = EmailId;
   }

   GetEmailId()
   {
        return this.EmailId;
   }
}