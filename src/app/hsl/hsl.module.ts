import { NgModule } from '@angular/core';
import { HSLComponent } from './hsl.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { HSLState } from './hsl.state';
import { routes } from './hsl.routes';
import { MaterialModule } from './../material.module'
@NgModule({
  imports: [
    CommonModule, 
    MaterialModule, 
    RouterModule.forChild(routes), 
    NgxsModule.forFeature([HSLState])
  ],
  declarations: [
    HSLComponent]
})
export class HSLModule { }
