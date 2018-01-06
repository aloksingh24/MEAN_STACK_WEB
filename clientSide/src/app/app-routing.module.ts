import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TshirtComponent } from './components/tshirt/tshirt.component';
import { RegisterComponent} from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';


const appRoutes: Routes = [{
   path:'home',
   component:HomeComponent
  },
  {
     path:'tshirt' ,
     component:TshirtComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'profile',
    component : ProfileComponent
  },
  {
    path : '*',
    component : HomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [  RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent,TshirtComponent,RegisterComponent,LoginComponent,ProfileComponent]
