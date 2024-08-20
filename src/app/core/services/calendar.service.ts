import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, from, of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  //list?: CalendarListEntry[];

  constructor(private http: HttpClient) { }

  public getList() : Observable<any>  {
    return this.http.get("http://localhost:9000/calendar/list").pipe(
      switchMap((resp: any) => {
        // Handle the user info here
        console.log('calendars received', resp);
        return of(resp);
      })
    );
  }

  public getCalendar(id:string) : Observable<any>  {
    return this.http.get(`http://localhost:9000/calendar/item/${id}`).pipe(
      switchMap((resp: any) => {
        // Handle the user info here
        console.log('calendar received', resp);
        return of(resp);
      })
    );
  }
}
