import {ChangeDetectorRef, Component, NgZone, OnChanges, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar'; 

@Component({
  selector: 'timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {

  /** stores the string that displays the elapsed time on the timer */
  timerTime: string = "00:00";

  /** stores the number of elapsed miliseconds since start when the user pressed the start button */
  elapsedMs: number = 0; 

  /** stores the id of the interval that calculates the elapsed ms */
  private timerIntervalId: number;

  /** config object for all snackbars of this component */
  private snackbarConfig: MatSnackBarConfig<any> = {
    horizontalPosition: 'center',
    verticalPosition: "top",
    duration: 4000, //4000 ms
  };

  /** caption for the button of the snackar which can close the snackbar */
  private snackbarActionLabel: string = "Okay"

  /** constructor of this component. Intializes a service for using Angular Material SnackBars */
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  /**
   * Gets executed when the user starts the timer. 
   */
  startTimer(){

    /** the time when the user pressed the "Start" button*/ 
    let startTime: number = Date.now();

    this.elapsedMs = 0;
    this.timerTime = "00:00";

    console.log("Timer started");

    // calculate difference between current time and start time
    this.timerIntervalId = window.setInterval(() => {
      this.elapsedMs = Date.now() - startTime;
      this.timerTime = this.elapsedMs.toString();
      console.log(this.elapsedMs)
    },100); // calculate difference "only" every second so we can maintain a good performance

    this._snackBar.open("Timer wurde gestartet","Okay",this.snackbarConfig);

  }

  stopTimer(){

    clearInterval(this.timerIntervalId);

    this._snackBar.open("Timer wurde gestoppt","Okay",this.snackbarConfig);

  }

  resetTimer(){

    clearInterval(this.timerIntervalId);
    
    this.timerTime="00:00";

    this._snackBar.open("Timer wurde zurückgesetzt","Okay",this.snackbarConfig);

  }

}
