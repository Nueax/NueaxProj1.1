import { Component, OnInit,NgZone} from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component'
import {Firebase} from '../Classes/FireBase';
import {LocalHost} from '../Classes/LocalHost';
import {PasswordValidation} from '../CustomValidation/ConfirmPassword';

// ------- Angular Forms --------
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

// ------------------------------
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit 
{

  SignUpButtonColor:any="warn";
  LogInButtonColor:any="primary";
  SignUpFormHidden:any=true;
  LogInFormHidden:any=false;
  EmailId:any;

 // --------------- Forms ------------
    SignUpForm:FormGroup;
    LoginForm:FormGroup;
  //-----------------------------------

  constructor(
              private Formbuilder:FormBuilder,private InternetConnection:InternetConnectionComponent,
              private Firebase:Firebase,private LocalHost:LocalHost,private NgZone:NgZone
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

  ShowLogInForm()
  {
      this.LogInButtonColor="primary";
      this.LogInFormHidden = false;

      this.SignUpButtonColor="warn";
      this.SignUpFormHidden=true;
  }

  ShowSignUpForm()
  {
      this.LogInButtonColor="warn";
      this.LogInFormHidden = true;

      this.SignUpButtonColor="primary";
      this.SignUpFormHidden=false;
  }

  Login(FormValue)
  {
    if(this.InternetConnection.isInternetConnectcionAvailable)
    {
      this.Firebase.FirebaseLogin(FormValue);
    }
    else
    { 
      this.LocalHost.LocalHostLogIn(FormValue);
    } 
  }

  SignUp(FormValue)
  {
    if(this.InternetConnection.isInternetConnectcionAvailable)
    {
      this.Firebase.FirebaseSignup(FormValue);
    }
    
    this.LocalHost.LocalHostSignUp(FormValue);
    
  }
}
