import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  enableCustomClass = false;
  toogleClicked(event) {
    this.enableCustomClass = event;
  }
}
