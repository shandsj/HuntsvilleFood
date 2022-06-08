import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, firstValueFrom, Observable } from 'rxjs';
import { Establishment } from './establishment/establishment.model';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(private http: HttpClient) { }

  public searchForEstablishments(query: string) : Observable<Establishment[]> {
    if (query.length >= 3) {
      console.log(`GET request with ${query} sent`);
      return this.http.get<Establishment[]>('https://huntsvillefood.azurewebsites.net/api/GetRestaurantHealthRatings?search=' + query);        
    }
    
    return empty();
  }
}
