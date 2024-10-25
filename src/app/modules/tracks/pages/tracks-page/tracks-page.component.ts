import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: TrackModel[] = []
  tracksRandom: TrackModel[] = []
  listObserver$: Subscription[] = []
  constructor(private trackService: TrackService){}

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  ngOnDestroy(): void {
    this.listObserver$.forEach(u => u.unsubscribe())
  }

  loadDataRandom():void{
    this.trackService.getAllRandom$().subscribe((response: TrackModel[])=> {
      this.tracksRandom = response
    },err => {
      console.log('Error de conexion', err);
    })
  }

  loadDataAll(): void{
    this.trackService.getAllTracks$().subscribe((response: TrackModel[]) => {
      this.tracksTrending = response
    })
  }
}
