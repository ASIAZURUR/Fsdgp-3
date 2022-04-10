import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    ConfirmationPopoverModule.forRoot(),
    ReactiveFormsModule, 
    NgbModule
  ],
  exports: [
    ConfirmationPopoverModule, 
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgbModule
  ]
})
export class SharedModule { }
