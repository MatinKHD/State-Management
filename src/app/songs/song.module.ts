import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";


import { SongsFavouritesComponent } from "./components/songs-favourites/songs-favourites.component";
import { SongsPlaylistComponent } from "./components/songs-playlist/songs-playlist.component";
import {SongsListenedComponent} from "./components/songs-listend/songs-listened.component";
import {SongsListComponent} from "./components/songs-list/songs-list.component";

import { SongsService } from "./services/songs.service";

@NgModule({
  imports:[
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SongsService
  ],
  declarations:[
    SongsListenedComponent,
    SongsFavouritesComponent,
    SongsPlaylistComponent,
    SongsListComponent
  ],
  exports: [
    SongsListenedComponent,
    SongsFavouritesComponent,
    SongsPlaylistComponent,
  ],
})
export class SongModule {}
