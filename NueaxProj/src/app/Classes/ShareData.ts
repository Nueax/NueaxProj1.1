import{Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs-compat/BehaviorSubject';

@Injectable()
export class ShareData
{
    private messageSource = new BehaviorSubject<any>("Email");
    currentEmailId = this.messageSource.asObservable();

    constructor(){}

    setEmailId(EmailId)
    {   
        this.messageSource.next(EmailId);
        console.log("The method is call");
    }
}