import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatGridListModule} from '@angular/material/grid-list';


@Component({
  selector: 'app-welcome-dashboard',
  templateUrl: './welcome-dashboard.component.html',
  styleUrls: ['./welcome-dashboard.component.css']
})
export class WelcomeDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
