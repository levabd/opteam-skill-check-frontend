import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignUpComponent } from './signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
      FormsModule, ReactiveFormsModule,
  ],
  declarations: [SignUpComponent]
})
export class SignupModule { }
