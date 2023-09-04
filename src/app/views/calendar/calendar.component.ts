import { CalendarOptions, EventApi } from '@fullcalendar/core';
import { Component, OnInit, signal } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {LeavesUserService} from "../services/leaves-user.service";
import {Conge} from "../model/conge.model";
import {UserService} from "../services/user.service";
import {User} from "../model/user.model";

const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarVisible = false;
  calendarOptions: CalendarOptions = {
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

    events: [],

    initialView: 'dayGridMonth',
    weekends: true,
    selectMirror: true,
    dayMaxEvents: true,
  };
  constructor(private leavesUserService: LeavesUserService,private userService:UserService) { }
  ngOnInit(): void {
    this.leavesUserService.getCongesAccepted().subscribe((conges: Conge[]) => {
      const events: any[] = [];

      conges.forEach((conge: Conge) => {
        this.userService.getUtilisateur(conge.utilisateurId).subscribe((user: User) => {
          const title = `${user.nom} ${user.prenom}`;
          const endDate = new Date(conge.dateFin);
          endDate.setDate(endDate.getDate() + 1);
          const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
          console.log(formattedEndDate);
          events.push({
            title: title,
            start: conge.dateDebut,
            end: formattedEndDate,
            backgroundColor: this.getColorByLeaveType(conge.type),
            borderColor: this.getColorByLeaveType(conge.type),
            textColor: 'white',
            fontColor: 'white',
            fontFamily: 'Poppins, sans-serif',
          });

          if (events.length === conges.length) {
            this.calendarOptions.events = events;
            this.calendarVisible = true; // Show the calendar when the events are loaded
          }
        });
      });
    });
  }


  getColorByLeaveType(type: string): string {
    switch (type) {
      case 'PAYE':
        return '#4CAF50';
      case 'MALADIE':
        return '#FF9800';
      case 'PARENTAL':
        return '#757575';
      case 'FAMILIAL':
        return '#673AB7';
      case 'SPECIAL':
        return '#2196F3';
      default:
        return '#000000';
    }

}
}
