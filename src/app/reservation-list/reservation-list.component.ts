import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  // Angular DI injects reservation service into this component
  constructor(private reservationService : ReservationService) {   

  }

  ngOnInit(): void {
    // here we take our reservation service we call the asynchrunous reservation method which is sending a required to our mookon backend api which returns an obserable, subscribing to obserable and once it done we can get the return value which could be our reservations 
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservations = reservations    // we put the value from actual result to our reservations property
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }
}
