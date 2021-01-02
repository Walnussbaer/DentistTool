import {ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';  
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar'; 
import { faPlay, faStop,faHistory, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {

  /** caption of the timer */
  @Input() caption: string;

  /** the progess of the progress spinner in percent (only be used in timer mode) */
  public timerProgress: number = 0;

  /** icon for start timer button */
  public faPlay: IconDefinition = faPlay;

  /** icon for stop timer button*/
  public faStop: IconDefinition = faStop;

  /** icon for reset timer button */
  public faHistory: IconDefinition = faHistory;

  /** the mode of the progress bar */
  public progressBarMode: ProgressBarMode = "buffer"; 

  /** stores the number of elapsed miliseconds since start when the user pressed the start button */
  public milisecondsToShow: number = 0;

  /** the caption of the change context button */
  public contextChangeButtonLabel: string;

  /** stores the current active mode */
  public currentMode: TimeGadgetMode = TimeGadgetMode.TIMER;

  /** indicates whether the timer is working (as stoppwatch or actual timer) */
  public timeGadgetRunning: boolean = false;

  /** indicates whether a previously runned timer is just stopped */
  public timerStopped: boolean = false;

  /** plays a sound sample when this component is used as a timer and the user defined time has elapsed */
  public playEndOfTimerSoundSamples: boolean = true;

  /** the form control for the miliseconds input for the timer */
  public timerInputFormControl = new FormControl(60,[
    Validators.required,
    Validators.min(0)
  ]);


  /** stores the id of the interval that calculates the elapsed ms */
  private timeGadgetIntervalId: number;

  /** config object for all snackbars of this component */
  private snackbarConfig: MatSnackBarConfig<any> = {
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    duration: 4000, //4000 ms
  };

  /** caption for the button of the snackar which can close the snackbar */
  private snackbarActionLabel: string = "Okay"

  /** location for announcment sound sample file*/
  private announcementSoundSampleLocation: string = "../../assets/sounds/endOfTimerSoundSample.mp3"; 

  /** location for gong sound sample file */
  private gongSoundSampleLocation: string = "../../assets/sounds/gongSound.mp3";

  /** location for the merged sound file of announcment and gong */
  private mergeSoundFileLocation: string = "../../assets/sounds/mergedEndOfTimerSoundSample.mp3";

  /** constructor of this component. Intializes a service for using Angular Material SnackBars */
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    // sets correct text of context change button
    this.setContextChangeButtonLabel();

    // we subscribe to all changes on the input field for the timer
    this.onTimerInputValueChange();

    // set timerface according to default value of user input for timer, if timer is the initial context
    if (this.currentMode == TimeGadgetMode.TIMER){
      this.setTimerfaceFromUserInput();
    }

  }

  ngOnChanges(): void {
  }

  onTimerInputValueChange(): void {
    this.timerInputFormControl.valueChanges.subscribe(seconds => {
      if (seconds >= 0){
        this.setTimerfaceFromUserInput(); // convert seconds to miliseconds and pass to timerface
      }
      
    });
  }

  /**
   * Gets executed when the toggle button to switch between timer and stopwatch is used by ther user. 
   */
  public onContextChange(){

    if (this.currentMode == TimeGadgetMode.STOPWATCH){
      this.currentMode = TimeGadgetMode.TIMER;
      this.setTimerfaceFromUserInput();
    } else {
      this.currentMode = TimeGadgetMode.STOPWATCH;
      this.resetTimerFace();
    }

    this.setContextChangeButtonLabel();

  }

  public setContextChangeButtonLabel(){
    if (this.currentMode == TimeGadgetMode.STOPWATCH){
      this.contextChangeButtonLabel = "Zu Zeitgeber wechseln"
    } else {
      this.contextChangeButtonLabel = "Zu Stoppuhr wechseln"
    }
  }

  /**
   * Gets executed when the user presses the play button. 
   * 
   * Identifies the mode and then continues in the respective function. 
   */
  public runTimeGadget(){

    // stop any previous interval execution
    clearInterval(this.timeGadgetIntervalId);

    switch (this.currentMode){
      case TimeGadgetMode.STOPWATCH: {
        this.startStopwatch();
        break;
      }
      case TimeGadgetMode.TIMER: {
        this.startTimer();
        
      }
    }

  }

  /**
   * Gets executed when the user presses the stop button. 
   * 
   * Identifies the mode and then continues in the respective function. 
   */
  public stopTimeGadget(){

    clearInterval(this.timeGadgetIntervalId);

    this.timeGadgetRunning = false;
    this.resetProgressBar();

    switch (this.currentMode){
      case TimeGadgetMode.STOPWATCH: {
        this.stopStopwatch();
        break;
      }
      case TimeGadgetMode.TIMER: {
        this.stopTimer();
        break;
      }
    }

  }

  /**
   * Gets executes when the user presses the reset button. 
   * 
   * Identifies the mode and then continues in the respective function. 
   */
  public resetTimeGadget(){

    clearInterval(this.timeGadgetIntervalId);
    this.timeGadgetRunning = false;
    this.resetProgressBar();

    switch (this.currentMode){
      case TimeGadgetMode.STOPWATCH: {
        this.resetStopwatch();
        break;
      }
      case TimeGadgetMode.TIMER: {
        this.resetTimer();
        break;
      }
    }

  }

  /**
   * Sets the miliseconds to show in the timerface according to the userinput. 
   * 
   * Converts userinput (seconds) to miliseconds. 
   */
  private setTimerfaceFromUserInput(){
    this.milisecondsToShow = this.timerInputFormControl.value * 1000;
  }

  /**
   * Resets the timerface to 0. 
   */
  private resetTimerFace(){
    this.milisecondsToShow = 0;
  }

  /**
   * Starts a new stopwatch. 
   */
  private startStopwatch(){

    /** the time when the user pressed the "Start" button*/ 
    let startTime: number = Date.now();
    this.milisecondsToShow = 0;

    // calculate difference between current time and start time
    this.timeGadgetIntervalId = window.setInterval(() => {
      this.milisecondsToShow = Date.now() - startTime;
    },25); // calculate difference "only" every 25ms so we can maintain a good performance

    this.timeGadgetRunning = true;
    this.progressBarMode = "indeterminate";

    console.log("Stopwatch started");
    this._snackBar.open("Stoppuhr wurde gestartet",this.snackbarActionLabel,this.snackbarConfig);
  }

  /**
   * Stops a running stopwatch. Does NOT clear the timerface. 
   */
  private stopStopwatch(){

    console.log("Stopwatch stopped");
    this._snackBar.open("Stoppuhr wurde gestoppt",this.snackbarActionLabel,this.snackbarConfig);

  }

  /**
   * Stops and reset a running stopwatch. Does clear the timerface. 
   */
  private resetStopwatch(){

    this.milisecondsToShow=0;

    console.log("Stopwatch reset");
    this._snackBar.open("Stoppuhr wurde zurückgesetzt",this.snackbarActionLabel,this.snackbarConfig);

  }

  /**
   * Gets executed when the user presses the play button and the mode is set to timer. 
   */
  private startTimer(){

    /** the time when the user pressed the "Start" button*/ 
    let startTime: number = Date.now();

    var elapsedMs: number;
    var timeToRun = this.timerInputFormControl.value * 1000;
    var gongAudio: HTMLAudioElement;
    var announcmentAudio: HTMLAudioElement;

    this.timerInputFormControl.disable(); //TODO: implement observable in timerface component so that we don't have to disable and enable is manually
    this.progressBarMode = "determinate";

    this.timeGadgetRunning = true;

    // calculate difference between current time and start time
    this.timeGadgetIntervalId = window.setInterval(() => {
      elapsedMs= Date.now() - startTime;

      // if time set by user has elapsed
      if (elapsedMs>=timeToRun){

        this.resetTimerFace();

        if (this.playEndOfTimerSoundSamples == true){
          this.playSoundSample(this.mergeSoundFileLocation);
        }
        this.timerProgress = 100;
        this.timeGadgetRunning = false;
        clearInterval(this.timeGadgetIntervalId);
        
      } else {
        this.milisecondsToShow = timeToRun - elapsedMs;
        this.timerProgress = elapsedMs / timeToRun * 100;
      }
    },25); // calculate difference "only" every 25ms so we can maintain a good performance
  }

  /**
   * Gets executed when the user presses the stop button and the mode is set to timer. 
   */
  private stopTimer(){

    this.resetProgressBar();

    console.log("Timer stopped");
    this._snackBar.open("Timer wurde gestoppt",this.snackbarActionLabel,this.snackbarConfig);

  }

    /**
   * Gets executed when the user presses the reset button and the mode is set to timer. 
   */
  private resetTimer(){
    
    this.resetProgressBar();
    this.setTimerfaceFromUserInput();
    this.timerInputFormControl.enable();

    console.log("Timer reset");
    this._snackBar.open("Timer wurde zurückgesetzt",this.snackbarActionLabel,this.snackbarConfig);

  }

  /**
   * Resets progress bar to buffer mode. 
   */
  private resetProgressBar(){

    this.timerProgress = 0;
    this.progressBarMode = "buffer";

  }

  private playSoundSample(soundSampleLocation: string): HTMLAudioElement{

    console.log("Playing sound sample" + soundSampleLocation);

    let audio = new Audio();

    audio.src = soundSampleLocation;
    audio.load();
    audio.play();

    return audio;

  }

}

export enum TimeGadgetMode {

  TIMER = 0,
  STOPWATCH = 1,

}
