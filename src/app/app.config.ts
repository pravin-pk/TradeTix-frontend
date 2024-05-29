import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { Routes, provideRouter } from '@angular/router';
import { SignupComponent } from './pages/register/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SigninComponent } from './pages/register/signin/signin.component';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-in', component: SigninComponent},
  { path: 'dashboard', component: DashboardComponent},
]
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
