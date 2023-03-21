import {Component, OnInit, OnDestroy} from "@angular/core";
import {Observable, Subscription} from "rxjs"

import {SongsService} from "../../services/songs.service"

import {Store} from "../../../store";
import {SongModel} from "../../models/song.model";

@Component({
  selector: 'songs-playlist',
  template: `
    <songs-list
      [list]="playlist$ | async"
      (toggle)="onToggle($event)">
      Playlist
    </songs-list>
  `
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {

  playlist$!: Observable<SongModel[]>
  subscription!: Subscription

  constructor(
    private store: Store,
    private songsService: SongsService
  ) {
  }

  ngOnInit() {
    this.playlist$ = this.store.select('playlist')
    this.subscription = this.songsService.getPlaylist$.subscribe()

  }

  onToggle(track: SongModel ) {
    this.songsService.toggle(track);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
