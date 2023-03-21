import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, map, Observable, Subscription } from "rxjs";

import { Store } from "../../../store";

import { SongsService } from "../../services/songs.service";

import { SongModel } from "../../models/song.model";

@Component({
  selector: 'songs-listened',
  template: `
    <songs-list
      [list]="listened$ | async"
      (toggle)="onToggle($event)">
      Played
    </songs-list>
  `
})
export class SongsListenedComponent implements OnInit, OnDestroy {

  listened$!: Observable<SongModel[]>
  subscription!: Subscription

  constructor(
    private store: Store,
    private songsService: SongsService
  ) {
  }

  ngOnInit() {
    this.listened$ = this.store.select('playlist')
      .pipe(
        filter(Boolean),
        map((songs:SongModel[]) => songs.filter((track) => track.listened))
      )
    this.subscription = this.songsService.getPlaylist$.subscribe()

  }

  onToggle(track: SongModel ) {
    this.songsService.toggle(track);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
