import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalHostService {

  constructor(private _http:Http) { }

  public SignUp(FormValues)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/SignUp.php",FormValues).map(res=>{console.log(res.json())});
  }

  public Login(EmailId,Password)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Login.php",{"EmailId":EmailId,"Password":Password}).map(res=>res.json());
  }

  public Profile(FormValues,TimeStamp)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Profile.php",{"FormValues":FormValues,"TimeStamp":TimeStamp}).map(res=>res.json());
  }

  public Get_LocalHost_Time_Stamp(Email_Id)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Get_TimeStamp.php",{"EmailId":Email_Id}).map(res=>res.json());
  }

  public Get_All_Data_From_LocalHost()
  {
    return this._http.get("http://localhost:8080/APIs/Nueax/Get_All_LocalHost_Data.php").map(res=>res.json());
  }
  
  public Get_Data_From_LocalHost(EmailId)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Get_LocalHost_Data.php",{"EmailId":EmailId}).map(res=>res.json());
  }

  public Get_EmailId_LocalHost()
  {
    return this._http.get("http://localhost:8080/APIs/Nueax/Get_EmailId.php").map(res=>res.json());
  }

  public CheckLocalHostConnection()
  {
     return this._http.get("http://localhost:8080/APIs/Nueax/CheckConnection.php")
                .map(res=>res.json()).catch(this.errorHandler);
  }

  public errorHandler()
  {
     return Observable.throw(false);
  }
}
