import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, tap } from "rxjs";

import { Store } from "../../store";
import { SongModel } from "../models/song.model";


@Injectable()
export class SongsService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) {
  }

  getPlaylist$: Observable<SongModel[]> = this.http
    .get<SongModel[]>('http://localhost:3000/playlist')
    .pipe(tap(value => this.store.set('playlist', value)));

  toggle(event: any) {
    this.http
      .put<SongModel>(`http://localhost:3000/playlist/${event.track.id}`, event.track)
      .subscribe((track:SongModel) => {
        const value = this.store.value.playlist;

        const playlist = value?.map((song: SongModel) => {
          if (event.track.id === song.id) {
            return  {...song ,...event.track}
          } else {
            return  song
          }
        });
        this.store.set('playlist', playlist)
      });
  }
}

