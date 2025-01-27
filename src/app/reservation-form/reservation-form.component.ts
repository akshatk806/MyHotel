import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  // form group which is going to bind at <form> in html
  reservationForm: FormGroup = new FormGroup({});

  // dependency injection 
  constructor(private formBuilder: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) {
    // DI -> we have a system in angular that knows here ReservationFormComponent knows once we have formBuilder. Once we created a instance of component the angular DI creates an instance of form builder and submits it to this constructor so we can use it
    // formBuilder injected into our reservation-form component
    // once we create a instance of form component the angular dependency injection creates an instance of formbuilder and submites it to this contructor
  }

  // called when component initilize
  ngOnInit(): void {
    // we pick all controls(input) from html and put them into group
    // we have formgroup and inside that formgroup we have controls where each control is an input field
    // we use formbuilder to make formgroup

    // we group together multiple controls (checkInDate.... -> these are name of controls)
    this.reservationForm = this.formBuilder.group({     
      checkInDate: ['', Validators.required],     // [initial value, validation], same property name as in formControlName in html
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],    // multiple validators
      roomNumber: ['', Validators.required]
    }) 

    // get an id from activate route
    let reservationId = this.activatedRoute.snapshot.paramMap.get('id');
    if(reservationId) {
      let reservation = this.reservationService.getReservation(reservationId);
      if(reservation) {
        this.reservationForm.patchValue(reservation)   // getting value from reservation and patch to form means the form is filled already (pre-filled)
      }
    }
  }

  onSubmit() {
    if(this.reservationForm.valid) {
      // form get filled out correctly
      // rules to get our form valid
      // we use form builder to take of all our form control(input fields) to group them all together
      // we specify all our rules in ngOnInit()
      // valid means -> all control are validated properly

      // grabbing the reservation from form
      let reservation: Reservation = this.reservationForm.value;   // from form group

      let reservationId = this.activatedRoute.snapshot.paramMap.get('id');   // if we have id then this is the form for update
      if(reservationId) {
        // updated
        this.reservationService.updateReservation(reservationId, reservation);   // reservation from the form doesn't have an id
      }
      else {
        // here we call service to add new service
        this.reservationService.createReservation(reservation);
      }

      // we need a router instance to navigate
      this.router.navigate(['/reservation-list']);
    }
  }
}
