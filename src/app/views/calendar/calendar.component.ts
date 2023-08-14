import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [
      {
        title: 'Ouassima',
        start: '2023-07-31',
        end: '2023-08-02',
        backgroundColor: '#673AB7',
        borderColor: '#673AB7',
        textColor: 'white',
        fontColor: 'white'
      },
      {
        title: 'Ouassima',
        start: '2023-07-31',
        end: '2023-08-04',
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        textColor: 'white',
        fontColor: 'white'
      },
      {
        title: 'Ouassima',
        start: '2023-08-07',
        end: '2023-08-09',
        backgroundColor: '#FF9800',
        borderColor: '#FF9800',
        textColor: 'white',
        fontColor: 'white'
      }
    ],
    initialView: 'dayGridMonth',
    weekends: true,
    selectMirror: true,
    dayMaxEvents: true,
  });

  constructor() { }

  ngOnInit(): void {
  }


}
