import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SignupComponent } from './signup/signup.component';
import { UserAuthGuard } from './user-auth.guard';
import { TestUserComponent } from './test-user/test-user.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {
    path:'dashboard',
    canActivate:[UserAuthGuard],
    component:DashboardComponent,
    children:[
      { path:'',redirectTo:'/dashboard/home',pathMatch:'full'},
      { path:'home',component:HomeComponent},
      { path:'gallery',component:GalleryComponent},
    ]
  },
  {path:'signup',component:SignupComponent},
  {path:"test-user",component:TestUserComponent},
  {path:"privacy-policy",component:PrivacyPolicyComponent},
  {path:'**',redirectTo:'/404',pathMatch:'full'},
  {path:'404',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
