import {ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';  
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar'; 
import { faPlay, faStop,faHistory, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip'; 

@Component({
  selector: 'timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {

  /** caption of the timer */
  @Input() caption: string;

  /** icon for start timer button */
  faPlay: IconDefinition = faPlay;

  /** icon for stop timer button*/
  faStop: IconDefinition = faStop;

  /** icon for reset timer button */
  faHistory: IconDefinition = faHistory;

  progressBarMode: ProgressBarMode = "buffer"; 

  /** stores the number of elapsed miliseconds since start when the user pressed the start button */
  elapsedMs: number = 0; 

  /** stores the id of the interval that calculates the elapsed ms */
  private timerIntervalId: number;

  /** the time the user wants to measure, given in seconds */
  public configuredStopTime: number = 60;

  /** config object for all snackbars of this component */
  private snackbarConfig: MatSnackBarConfig<any> = {
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    duration: 4000, //4000 ms
  };

  /** caption for the button of the snackar which can close the snackbar */
  private snackbarActionLabel: string = "Okay"

  /** indicates whether the timer is working (as stoppwatch or actual timer) */
  public timerRunning: boolean = false;

  /** indicates whether a previously runned timer is just stopped */
  public timerStopped: boolean = false;

  /**uses the timer component as an actual timer (with a predefined time to elapse) */
  public useAsTimer: boolean = true;

  /** plays a sound sample when this component is used as a timer and the user defined time has elapsed */
  public playEndOfTimerSoundSample: boolean = true;

  /** constructor of this component. Intializes a service for using Angular Material SnackBars */
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  /**
   * Gets executed when the toggle to switch between timer and stopwatch is used by ther user. 
   */
  switchTimerContext(){
    if (this.configuredStopTime <= 0 && this.useAsTimer==true){
      this.configuredStopTime = 60;
    }
  }

  /**
   * Gets executed when the user starts the timer. 
   */
  startTimer(){

    /** the time when the user pressed the "Start" button*/ 
    let startTime: number = Date.now();

    // stop any previous interval execution
    clearInterval(this.timerIntervalId);

    this.elapsedMs = 0;

    // calculate difference between current time and start time
    this.timerIntervalId = window.setInterval(() => {
      this.elapsedMs = Date.now() - startTime;
    },25); // calculate difference "only" every second so we can maintain a good performance

    this.timerRunning = true;
    this.progressBarMode = "indeterminate";

    console.log("Timer started");
    this._snackBar.open("Timer wurde gestartet",this.snackbarActionLabel,this.snackbarConfig);

  }

  /**
   * Gets executres when the user stops the timer. Does NOT clear the timerface. 
   */
  stopTimer(){

    clearInterval(this.timerIntervalId);

    this.timerRunning = false;
    this.progressBarMode = "buffer";
    this.timerStopped = true;

    console.log("Timer stopped");
    this._snackBar.open("Timer wurde gestoppt",this.snackbarActionLabel,this.snackbarConfig);

  }

  /**
   * Gets executes when the user resets the timer. Does clear the timerface. 
   */
  resetTimer(){

    clearInterval(this.timerIntervalId);
    
    this.timerRunning = false;
    this.elapsedMs=0;
    this.progressBarMode = "buffer";

    console.log("Timer reset");
    this._snackBar.open("Timer wurde zurückgesetzt",this.snackbarActionLabel,this.snackbarConfig);

  }

}
