import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  finalSearchCriteria: string;

  constructor(private http: HttpClient) { }

  getStalls(criteria): Observable<any> {
    this.finalSearchCriteria = `/stalls?area=${criteria.area}&cuisine=${criteria.cuisine}`;
    console.log(this.finalSearchCriteria);
    return this.http.get(`${environment.api_url}${this.finalSearchCriteria}`);
  }

  /*getStall(criteria): Observable<any> {
    return this.http.get(`${environment.api_url}/${criteria}`);
  }*/

  addStall(details): Observable<any> {
    console.log(details);
    return this.http.post(`${environment.api_url}/add-stall`, details);
  }

}
