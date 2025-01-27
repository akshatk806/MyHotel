import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  // form group which is going to bind at <form> in html
  reservationForm: FormGroup = new FormGroup({});

  onSubmit() {
    
  }
}
