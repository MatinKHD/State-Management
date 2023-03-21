import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

import { SongModel } from "../../models/song.model";

@Component({
  selector: 'songs-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['songs-list.component.scss'],
  template: `
    <div class="song-list">
      <h3>
        <ng-content></ng-content>
      </h3>
      <ul>
        <li
          *ngFor="let item of list; let i = index;">
          <div>
            <p>{{item.track}}</p>
            <span>{{item.artist}}</span>
          </div>
          <div class="song-list__status">
            <div
              (click)="onToggled('listened', i)">
              <img *ngIf="item.listened" width="18px" src="../../../../assets/images/listened.png">
              <img *ngIf="!item.listened" width="18px" src="../../../../assets/images/listened-outline.png">
            </div>
            <div
              (click)="onToggled('favourite', i)">
              <img *ngIf="item.favourite" width="20px" src="../../../../assets/images/heart.png">
              <img *ngIf="!item.favourite" width="18px" src="../../../../assets/images/outline-heart.png">
            </div>
          </div>
        </li>
      </ul>
    </div>
  `
})
export class SongsListComponent {
  @Input()
  list!: SongModel[] | null;

  @Output()
  toggle = new EventEmitter

  constructor() {
  }

  onToggled(prop: string, index: number) {
    const track = this.list ? this.list[index] : null;
    if (track && (prop === "favourite" || prop === "listened")) this.toggle.emit({
      track: {...track, [prop]: !track[prop]}
    })
  }
}
