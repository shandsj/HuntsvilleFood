import { Component } from '@angular/core';
import { EstablishmentService } from './establishment.service';
import { Establishment } from './establishment/establishment.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private establishmentService: EstablishmentService) {

  }

  title = 'Huntsville Restaurant Ratings';  
  establishments: Establishment[] = [];

  async onKeyUpEvent(event: any) {
    this.establishments = [];
    this.establishmentService.searchForEstablishments(event.target.value).subscribe(values => {
      this.establishments = values;
    });
  }
}
