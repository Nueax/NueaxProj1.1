import { Component, OnInit, NgZone } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-internet-connection',
  templateUrl: './internet-connection.component.html',
  styleUrls: ['./internet-connection.component.css']
})


export class InternetConnectionComponent implements OnInit
{
 
  isInternetConnectcionAvailable:Boolean;
  InternetStatusColor:any = navigator.onLine ? "accent":"primary";
  InternetStatus:any= navigator.onLine ? "ONLINE":"OFFLINE";

  constructor(private connectionService: ConnectionService,private NgZone:NgZone) 
  {
    this.isInternetConnectcionAvailable = navigator.onLine;
    this.InternetConnection();
  }

  ngOnInit()
  {
    
  }

  InternetConnection()
  {
    this.connectionService.monitor().subscribe(isConnected => {
                                                                this.isInternetConnectcionAvailable = isConnected;
                                                                if (this.isInternetConnectcionAvailable) 
                                                                {
                                                                  this.InternetStatus = "ONLINE";
                                                                  this.InternetStatusColor = "accent";
                                                                }
                                                                else 
                                                                {
                                                                  this.InternetStatus = "OFFLINE";
                                                                  this.InternetStatusColor="primary";
                                                                }

                                                                this.NgZone.run(()=>this.isInternetConnectcionAvailable = isConnected);
                                                              }
                                              )
  }
  
    
}
