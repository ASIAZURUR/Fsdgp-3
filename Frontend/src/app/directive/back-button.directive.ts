import { Location } from '@angular/common';
import { Directive, HostListener, NgModule } from '@angular/core';
@Directive({
  selector: '[backButton]'
})
export class BackButtonDirective {
  constructor(private location: Location) { }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
@NgModule({
  declarations: [BackButtonDirective],
  exports: [BackButtonDirective]
})
export class BackButtonDirectiveModule { }
