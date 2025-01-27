import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  // CRUD

  getAllReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string) : Reservation | undefined {     // we return a reservation value or a value which is undefined because we don't have a reservation corresponding to id (because of find method)
    return this.reservations.find(res => res.id === id)
  }

  createReservation(reservation: Reservation) : void {
    reservation.id = uuidv4();
    this.reservations.push(reservation);
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  updateReservation(id:string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }
}
