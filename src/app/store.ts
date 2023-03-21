import {BehaviorSubject, distinctUntilChanged, pluck, Observable} from 'rxjs'

import { State } from './state'
import {SongModel} from "./songs/models/song.model";


const state: State = {
  playlist: undefined
};

export class Store {

  private subject = new  BehaviorSubject<State>(state);
  private store =  this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select(name: string): Observable<any> {
    return this.store.pipe(pluck(name))
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value, [name]: state
    })
  }
}
