import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'timerface',
  templateUrl: './timerface.component.html',
  styleUrls: ['./timerface.component.css']
})
export class TimerfaceComponent implements OnInit, OnChanges {

  /** the count of elapsed miliseconds since a known start time */
  @Input() elapsedMiliseconds : number;

  formatedElapsedMiliseconds: string; 

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    this.formatedElapsedMiliseconds = this.formatTime(this.elapsedMiliseconds);

  }

  /**
   * Formats a number of miliseconds to a more human readable format. 
   * 
   * The format has the following format: h:mm:ss:msmsms
   * 
   * @param miliseconds the amount of miliseconds to be converted to a better format
   */
  formatTime(miliseconds: number) : string{

    const HOURS_TO_MILISECONDS: number = 3600000;
    const MINUTES_TO_MILISECONDS: number = 60000;
    const SECONDS_TO_MILISECONDS: number = 1000;

    let formattedTime: string;
    let hours: number;
    let minutes: number;
    let seconds: number;
    let remainingMiliseconds: number;

    let preformatedRemainingMiliseconds: string;
    let preformatedSeconds: string;
    let preformatedMinutes: string;

    // calculate parts of time
    hours = Math.floor(miliseconds / HOURS_TO_MILISECONDS);
    minutes = Math.floor((miliseconds - hours*HOURS_TO_MILISECONDS) / MINUTES_TO_MILISECONDS);
    seconds = Math.floor((miliseconds - hours*HOURS_TO_MILISECONDS - minutes*MINUTES_TO_MILISECONDS) / SECONDS_TO_MILISECONDS);
    remainingMiliseconds = Math.floor(miliseconds- hours*HOURS_TO_MILISECONDS - minutes*MINUTES_TO_MILISECONDS - seconds*SECONDS_TO_MILISECONDS);

    // add some zero padding to miliseconds string so that the view does not flicker when value changes between 3 digits and 1 digit long miliseconds
    switch(true){
      case remainingMiliseconds<10: {
        preformatedRemainingMiliseconds = "00" + remainingMiliseconds;
        break;
      }
      case remainingMiliseconds<100: {
        preformatedRemainingMiliseconds = "0" + remainingMiliseconds;
        break;
      }
      default: 
      {
        preformatedRemainingMiliseconds = remainingMiliseconds.toString();
        break;
      }
    }

    // do the same for minutes
    switch(true){
      case seconds<10: {
        preformatedSeconds = "0" + seconds;
        break;
      }
      default: 
      {
        preformatedSeconds = seconds.toString();
        break;
      }
    }

    // and the same for minutes
    switch(true){
      case minutes<10: {
        preformatedMinutes = "0" + minutes;
        break;
      }
      default: 
      {
        preformatedMinutes = minutes.toString();
        break;
      }
    }


    formattedTime = hours + " : " + preformatedMinutes + " : " + preformatedSeconds + " : " + preformatedRemainingMiliseconds;
    return formattedTime;
  }

}
