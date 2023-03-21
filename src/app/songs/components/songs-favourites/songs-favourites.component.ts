import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "../../../store";
import {filter, map, Observable, Subscription} from "rxjs";
import {SongsService} from "../../services/songs.service";
import {SongModel} from "../../models/song.model";

@Component({
  selector:'songs-favourites',
  template:`
    <songs-list
      [list]="favourites$ | async"
      (toggle)="onToggle($event)">
      Favourites
    </songs-list>
  `
})
export class SongsFavouritesComponent implements OnInit, OnDestroy {

  favourites$!: Observable<SongModel[]>
  subscription!: Subscription
  constructor(
    private store: Store,
    private songsService: SongsService
  ) {}

  ngOnInit() {
    this.favourites$ = this.store.select('playlist')
      .pipe(
        filter(Boolean),
        map(songs => songs.filter((track: any) => track.favourite))
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
