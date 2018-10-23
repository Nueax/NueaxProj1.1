import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//------------------- PAGES -------------------------
import {LoginSignupComponent} from '../login-signup/login-signup.component';
import { FirstPageComponent } from '../first-page/first-page.component';
//----------------------------------------------------


const routes: Routes = 
[
 {path:"", redirectTo:"LoginPage", pathMatch:"full"}, 
 {path:"LoginPage", component:LoginSignupComponent},
 {path:"FirstPage", component:FirstPageComponent}
]
 
@NgModule({
 imports: 
 [
   CommonModule,
   RouterModule.forRoot(routes)
 ],
 exports: [RouterModule],
 declarations: []
})

export class Routing {}
