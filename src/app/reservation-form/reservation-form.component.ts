import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {
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
  }

  onSubmit() {
    if(this.reservationForm.valid) {
      // form get filled out correctly
      // rules to get our form valid
      // we use form builder to take of all our form control(input fields) to group them all together
      // we specify all our rules in ngOnInit()
      // valid means -> all control are validated properly
    }
  }
}
