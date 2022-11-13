import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByNumberSignColorDirective } from './by-number-sign-color.directive';

@NgModule({
  declarations: [
    ByNumberSignColorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ByNumberSignColorDirective,
  ]
})
export class ByNumberSignColorModule {}
