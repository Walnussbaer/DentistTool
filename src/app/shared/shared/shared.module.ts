import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
