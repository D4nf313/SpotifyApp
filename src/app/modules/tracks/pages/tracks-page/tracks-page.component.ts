import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObserver$: Array<Subscription> = [];

  constructor(private TracksService: TracksService) {}

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()

  }

async loadDataAll():Promise<any>{
  this.tracksTrending  = await  this.TracksService.getAllTracks$().toPromise()
    

}

loadDataRandom():void{
   this.TracksService.getAllRandom().subscribe((response: TrackModel[]) => {
    this.tracksRandom = response;
    console.log(response);
  }, err => {
    console.log('Error de conexion')
  }
  );  

}






  ngOnDestroy(): void {}
}
