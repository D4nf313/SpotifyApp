import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  private skypByid(
    listTracks: TrackModel[],
    id: number
  ): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter((a) => a._id != id);
      resolve(listTmp);
    });
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }
  getAllRandom(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      tap(data => console.log('*****',data)),
      mergeMap(({ data }: any) => this.skypByid(data, 2)),
      /*    map((dataRevert) => {
        return dataRevert.filter((track: TrackModel) => track._id != 1);
      }) */
      tap((data) => console.log('===>', data)),
      catchError((err) => {
        const { status, statusText } =err;
          console.log('alerta error, algo ah sucedido', [status, statusText])
        return of([])
      })
    );
  }
}
