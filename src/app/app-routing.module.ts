import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreatmentPreparationComponent } from './components/treatment-preparation/treatment-preparation.component';
import { WelcomeDashboardComponent } from './components/welcome-dashboard/welcome-dashboard.component';


const routes: Routes = [
  // dashboard, welcome screen of the application
  {path: 'dashbaord', component: WelcomeDashboardComponent},

  // all functional screens
  {path: 'treatment-preparation', component: TreatmentPreparationComponent},
  //...

  // default root
  {path: '', component: WelcomeDashboardComponent, pathMatch: 'full'},
  // wildcard root
  {path: '', component: WelcomeDashboardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
