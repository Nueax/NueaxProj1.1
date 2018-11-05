import { Component, OnInit,NgZone, OnDestroy} from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component'
import {Firebase} from '../Classes/FireBase';
import {LocalHost} from '../Classes/LocalHost';
import {PasswordValidation} from '../CustomValidation/ConfirmPassword';
import {ISubscription} from 'rxjs-compat/Subscription';
// ------- Angular Forms --------
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ShareData } from '../Classes/ShareData';

// ------------------------------
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit,OnDestroy
{

  SignUpButtonColor:any="warn";
  LogInButtonColor:any="primary";
  SignUpFormHidden:any=true;
  LogInFormHidden:any=false;
  EmailId:any;
  Subs1:ISubscription;
  Subs2:ISubscription;
  // --------------- Forms ------------
    SignUpForm:FormGroup;
    LoginForm:FormGroup;
  //-----------------------------------

  constructor(
              private Formbuilder:FormBuilder,private InternetConnection:InternetConnectionComponent,
              private Firebase:Firebase,private LocalHost:LocalHost,private ShareData:ShareData
            ) 
  { 

  }

  ngOnInit() 
  {
    this.SignUpForm = this.Formbuilder.group({
                                               EmailId:[null,Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
                                               Password:[null,Validators.compose([Validators.required,Validators.minLength(6)])],
                                               ConfirmPassword:[null,Validators.required]
                                             },
                                              {
                                                validator:PasswordValidation.MatchPassword
                                              });     
    
    this.LoginForm = this.Formbuilder.group({
                                                EmailId:[null,Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
                                                Password:[null,Validators.compose([Validators.required,Validators.minLength(6)])],
                                            });  
                                            
            
  }

  //----Show the Login form----
        ShowLogInForm()
        {
            this.LogInButtonColor="primary";
            this.LogInFormHidden = false;

            this.SignUpButtonColor="warn";
            this.SignUpFormHidden=true;
        }
  //----------------------------

  //----Show the Sign Up form----
        ShowSignUpForm()
        {
            this.LogInButtonColor="warn";
            this.LogInFormHidden = true;

            this.SignUpButtonColor="primary";
            this.SignUpFormHidden=false;
        }
  //----------------------------
  
  //------ Login ------------
    Login(FormValue)
    {
      
      this.Subs1 =this.ShareData.currentInternetConnection
      .subscribe(InternetConnection=>{
                                        
                                        console.log("Step:1 :- Login Function call");
                                        console.log("Step:2 :-Login Check Internet Connection");
                                        console.log(InternetConnection);

                                        if(InternetConnection)
                                        {
                                          console.log("Step:3 :-Login Internet Connection Available");
                                          console.log("Step:4 :-Calling Firebase Login Function");
                                          this.Firebase.FirebaseLogin(FormValue,"Primary");
                                        }
                                        else
                                        { 
                                          console.log("Step:3 :-Login Internet Connection Available");
                                          console.log("Step:4 :-Calling  Login Function");
                                          this.LocalHost.LocalHostLogIn(FormValue);
                                        } 
      })
    }
  //-------------------------  

  //------ Sign Up ------------
    SignUp(FormValue)
    {
      console.log("INTERNET CONNECTION");
      this.Subs1 =this.ShareData.currentInternetConnection
                      .subscribe(InternetConnection=>{
                                                        if(InternetConnection)
                                                        {
                                                          this.Firebase.FirebaseSignup(FormValue,"Primary");
                                                          this.LocalHost.LocalHostSignUp(FormValue,"Secondary");
                                                          console.log("Secondary Local Host Sign Up");
                                                        }
                                                        else
                                                        {
                                                          console.log("Primary Local Host Sign Up");
                                                          this.LocalHost.LocalHostSignUp(FormValue,"Primary");
                                                        }
                                                      }
                                );
                         
     
     
    }
  //---------------------------

  ngOnDestroy(): void 
  {
    this.Subs1.unsubscribe();  
  }
}
