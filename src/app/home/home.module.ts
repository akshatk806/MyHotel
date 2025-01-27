import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  // we allow other modules to use this component
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
