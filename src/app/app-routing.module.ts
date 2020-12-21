import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeDashboardComponent } from './components/welcome-dashboard/welcome-dashboard.component';


const routes: Routes = [
  {path: 'dashbaord', component: WelcomeDashboardComponent},
  // default root
  {path: '', component: WelcomeDashboardComponent, pathMatch: 'full'},
  // wildcard root
  {path: '', component: WelcomeDashboardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
