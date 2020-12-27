import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer-component',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  startTimer(){

    console.log("Timer started");
    document.getElementById("timerLabel").innerHTML="Start";

  }

  stopTimer(){

    console.log("Timer stopped");

  }

  resetTimer(){

    console.log("Timer has been reset");
    document.getElementById("timerLabel").innerHTML="00:00";

  }

}
