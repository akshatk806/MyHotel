import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = "http://localhost:3000"    // base url

  private reservations: Reservation[] = [];

  // this is happening before ngOnIt lifecycle hook invoked
  // because later on we have to load the data from service from the component in the lifecycle hook and this is invoked after constructor of service get invoked
  // ** constructor is loaded before ngOnIt life cycle hook
  // constructor is used to load all reservations from local storage
  /*
  constructor() {
    if(typeof localStorage !== 'undefined') {
      let savedReservation = localStorage.getItem("reservations");
      this.reservations = savedReservation ? JSON.parse(savedReservation) : [];
    }
  }
  */
  // we are no more required of localstorage


  // constructor for DI 
  constructor(private httpClient: HttpClient) {

  }

  // CRUD

  getAllReservations(): Observable<Reservation[]> {    // asynchrnous way to wait for result 
    // return this.reservations;
    return this.httpClient.get<Reservation[]>(this.apiUrl + "/reservations");   // endpoint
  }

  getReservation(id: string) : Observable<Reservation> {     // we return a reservation value or a value which is undefined because we don't have a reservation corresponding to id (because of find method)
    //return this.reservations.find(res => res.id === id)
    return this.httpClient.get<Reservation>(this.apiUrl + "/reservation/" + id);
  }

  createReservation(reservation: Reservation) : Observable<void> {
    reservation.id = uuidv4();
    /*
    this.reservations.push(reservation);
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
    */
    return this.httpClient.post<void>(this.apiUrl + "/reservation", reservation);
  }

  deleteReservation(id: string): Observable<void> {
    /*
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
    */

    return this.httpClient.delete<void>(this.apiUrl + "/reservation/" + id);
  }

  updateReservation(id:string, updatedReservation: Reservation): Observable<void> {
    /*
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
    */
     
    updatedReservation.id = id;
    return this.httpClient.put<void>(this.apiUrl + "/reservation/" + id, updatedReservation);
  }
}
