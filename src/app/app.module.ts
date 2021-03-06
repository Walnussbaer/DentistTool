import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeDashboardComponent } from './components/welcome-dashboard/welcome-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { TreatmentPreparationComponent } from './components/treatment-preparation/treatment-preparation.component';
import { TimerComponent } from './components/timer/timer.component';
import { TimerfaceComponent } from './components/timer/timerface/timerface.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeDashboardComponent,
    TreatmentPreparationComponent,
    TimerComponent,
    TimerfaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
