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
    this.reservations = this.reservationService.getAllReservations();
  }
}
