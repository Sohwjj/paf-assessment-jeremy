import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  editDetails = {};

  finalSearchCriteria: string;

  constructor(private http: HttpClient) { }

  getStalls(criteria): Observable<any> {
    this.finalSearchCriteria = `/stalls?area=${criteria.area}&cuisine=${criteria.cuisine}`;
    console.log(this.finalSearchCriteria);
    return this.http.get(`${environment.api_url}${this.finalSearchCriteria}`);
  }

  getStall(criteria): Observable<any> {
    this.finalSearchCriteria = `/stall?stallname=${criteria.stallname}`;
    console.log(this.finalSearchCriteria);
    return this.http.get(`${environment.api_url}${this.finalSearchCriteria}`);
  }

  addStall(details): Observable<any> {
    console.log(details);
    return this.http.post(`${environment.api_url}/add-stall`, details);
  }

  editEntry(details): Observable<any> {
    return this.http.put(`${environment.api_url}/edit`, details);
  }

  deleteEntry(details): Observable<any> {
    return this.http.post(`${environment.api_url}/delete`, details);
  }

}
