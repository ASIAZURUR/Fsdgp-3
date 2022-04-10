import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header.component';
@NgModule({
  imports: [NgbModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [ HeaderComponent],
  providers: []
})
export class HeaderModule { }
