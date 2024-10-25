import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {

   }

   getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(
        ({data}: any) => data as TrackModel
      )
    )
   }

   getAllRandom$() : Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      mergeMap(({data} : any)=> this.skipById(data, 2)),
      catchError((err) => {
        const {status, statusText} = err;
        // Para hacer algo con la data de error...
        return of([])
      })
    )
   }

   private skipById(listTracks: TrackModel[], id:number): Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp);
    })
   }
}
