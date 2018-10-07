import { Component, OnInit} from '@angular/core';
import {InternetConnectionComponent} from '../internet-connection/internet-connection.component'
import {Firebase} from '../Classes/FireBase';
import {LocalHost} from '../Classes/LocalHost';

// ------- Angular Forms --------
import {FormBuilder,FormGroup} from '@angular/forms';
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

 // --------------- Forms ------------
    SignUpForm:FormGroup;
    LoginForm:FormGroup;
  //-----------------------------------

  constructor(
              private Formbuilder:FormBuilder,private InternetConnection:InternetConnectionComponent,
              private Firebase:Firebase,private LocalHost:LocalHost
            ) 
  { 

  }

  ngOnInit() 
  {
    this.SignUpForm = this.Formbuilder.group({
                                                EmailId:[],
                                                Password:[],
                                                ConfirmPassword:[]
                                            });     
    
    this.LoginForm = this.Formbuilder.group({
                                                EmailId:[],
                                                Password:[],
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

  //----------- If InternetConnection Available --------------------
  CopyOfLocalHostData()
  {

  }

  InsertIntoFirebase()
  {

  }
  FirebaseSignUp()
  {
    
  }

  //----------------------------------------------------------------

  LocalHostSignUp()
  {

  }
}
