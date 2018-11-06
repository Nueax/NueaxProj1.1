import{Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs-compat/BehaviorSubject';
import { Observable } from 'rxjs';
import { LocalHostService } from '../LocalHostService/local-host.service';

const Observe = new Observable(observer=>{})
@Injectable()
export class ShareData
{
    private messageSource = new BehaviorSubject<any>("Email");
    private password = new BehaviorSubject<any>("");
    private InternetConnection = new BehaviorSubject<any>(navigator.onLine);
    private LocalHostConnection = new BehaviorSubject<any>("");

    currentEmailId = this.messageSource.asObservable();
    currentPassword = this.password.asObservable();
    currentInternetConnection = this.InternetConnection.asObservable();
    currentLocalHostConnection = this.LocalHostConnection.asObservable();

    constructor(){}

    setEmailId(EmailId,Password)
    { 
        console.log("Set EmailId in EmailID");  
        console.log(EmailId);  
        this.messageSource.next(EmailId);
        this.password.next(Password);
        console.log("The method is call");
    }
    
    set_InternetConnection(Value)
    {
        this.InternetConnection.next(Value);
        console.log("Inside Internet connection subscriber");
    }

    setLocalHost(Value)
    {
        this.LocalHostConnection.next(Value);
        console.log("Share Data Select LocalHost");
    }
    
}