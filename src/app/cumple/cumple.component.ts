import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-cumple',
  templateUrl: './cumple.component.html',
  styleUrls: ['./cumple.component.css']
})
export class CumpleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'First event',
    },
    {
      start: startOfDay(new Date()),
      title: 'Second event',
    },
    {
      start: startOfDay(new Date()),
      title: 'Third event',
    },
    {
      start: startOfDay(new Date()),
      title: 'Forth event',
    }
  ]
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    //this.openAppointmentList(date)
  }
}
